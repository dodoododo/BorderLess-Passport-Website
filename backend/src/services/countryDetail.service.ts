import CountryDetail from '../models/countryDetail.model.js';
import Country from '../models/country.model.js'; // Đảm bảo import đúng model Country core
import { generateCountryInsights } from './gemini.service.js'; // Đổi tên file cho khớp với project của bác
import { transformCiaToCountryDetail } from '../utils/ciaMapper.js';

// Import JSON chuẩn ES Module của Node 22 (thay cho require)
import factbookData from '../data/factbook.json' with { type: 'json' };

export const getCountryDetailData = async (iso2: string) => {
  const iso2Upper = iso2.toUpperCase();

  // =========================================================
  // BƯỚC 1: TÌM TRONG CACHE MONGODB
  // =========================================================
  let detail = await CountryDetail.findOne({ iso2: iso2Upper });

  // Nếu đã có sẵn trong DB VÀ AI đã sinh data thành công -> Trả về luôn (Tốc độ bàn thờ)
  if (detail && detail.isAiGenerated) {
    console.log(`[CACHE HIT] Lấy dữ liệu chi tiết từ MongoDB cho ${iso2Upper}`);
    return detail;
  }

  // =========================================================
  // BƯỚC 2: CACHE MISS HOẶC AI CHƯA GEN XONG -> BẮT ĐẦU QUÁ TRÌNH TẠO DATA
  // =========================================================
  console.log(`[CACHE MISS] Đang tạo/cập nhật dữ liệu cho ${iso2Upper}...`);

  // 2.1: Lấy tên chuẩn của quốc gia từ bảng Core (để match với file JSON và ném cho AI)
  const coreCountry = await Country.findOne({ iso2: iso2Upper });
  if (!coreCountry) {
    throw new Error("Không tìm thấy quốc gia trong hệ thống lõi");
  }
  const countryName = coreCountry.nameCommon;

  // 2.2: Xử lý Data từ CIA Factbook
  const typedFactbookData = factbookData as Record<string, any>;
  
  // Bóc lớp vỏ thứ 1: Truy cập thẳng vào object "countries"
  const countriesDict = typedFactbookData.countries || {};
  
  // Xử lý tìm kiếm thông minh: Đổi key của CIA (dạng "vietnam", "united_states") 
  // thành chuỗi bình thường để so sánh với countryName của hệ thống lõi
  const ciaKey = Object.keys(countriesDict).find(k => {
    // Biến "united_states" thành "united states"
    const formattedCiaKey = k.replace(/_/g, ' ').toLowerCase(); 
    return formattedCiaKey === countryName.toLowerCase();
  });
  
  // Lấy ra cục object chứa cả { data: {...}, metadata: {...} }
  const rawCiaData = ciaKey ? countriesDict[ciaKey] : null;

  if (!rawCiaData) {
    console.log(`[CẢNH BÁO] Không tìm thấy data CIA trong factbook.json cho nước: ${countryName}`);
  }

  let mappedCiaData: any = { iso2: iso2Upper };
  if (rawCiaData) {
    // Ném cục data thô sang cho Mapper xử lý
    mappedCiaData = transformCiaToCountryDetail(iso2Upper, rawCiaData);
  }
  // 2.3: Gọi Gemini API sinh dữ liệu độc quyền
  // Nếu API lỗi, hàm này sẽ trả về 1 object chứa các mảng/chuỗi rỗng (không gây crash)
  const aiGeneratedData = await generateCountryInsights(countryName);

  // 2.4: KIỂM TRA BẢO VỆ (Logic xịn của bác)
  // Nếu mảng historyTimeline có dữ liệu thật sự, nghĩa là Gemini đã gọi thành công
  const isGeminiSuccess = Array.isArray(aiGeneratedData?.historyTimeline) && aiGeneratedData.historyTimeline.length > 0;

  if (!isGeminiSuccess) {
    console.log(`[CẢNH BÁO] Gọi Gemini API thất bại cho ${countryName}. Đặt isAiGenerated = false để thử lại sau.`);
  }

  // 2.5: Trộn (Merge) CIA Data và Gemini Data lại với nhau
  const finalMergedData = {
    ...mappedCiaData,
    ...aiGeneratedData, 
    isAiGenerated: isGeminiSuccess, // Rất quan trọng: Thành công mới cho true, xịt thì false để user sau gọi lại
    lastUpdated: new Date()
  };

  // =========================================================
  // BƯỚC 3: LƯU VÀO MONGODB (UPSERT)
  // =========================================================
  const updatedDetail = await CountryDetail.findOneAndUpdate(
    { iso2: iso2Upper },
    { $set: finalMergedData },
    { 
      returnDocument: 'after', // Đã fix warning 'new' is deprecated của Mongoose
      upsert: true, 
      setDefaultsOnInsert: true 
    }
  );

  return updatedDetail;
};