import mongoose from 'mongoose';
import { syncRankingsData } from '../services/ranking.service.js';

const MONGO_URI = 'mongodb+srv://1stjarbrofistcom_db_user:YzcUU2CzTDlPdDLF@cluster0.yxwqujt.mongodb.net/?appName=Cluster0'; // Thay bằng URI của bác

// 🛑 CẤU HÌNH CHO LẦN CHẠY NÀY (Đồng bộ với cấu hình file Import)
const PERIOD = "2025-01"; 
const IS_LATEST = false;  

async function runSync() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`🚀 Đã kết nối DB. Đang tính toán Ranking cho kỳ [${PERIOD}]...`);

    // Gọi trực tiếp service tính toán Ranking
    const count = await syncRankingsData(PERIOD, IS_LATEST);

    console.log(`🎉 Thành công! Đã tính điểm và xếp hạng xong cho ${count} quốc gia.`);
    
    // Đóng connection
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Có lỗi xảy ra:", error);
    process.exit(1);
  }
}

runSync();