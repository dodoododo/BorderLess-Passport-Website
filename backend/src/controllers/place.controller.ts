import { Request, Response } from 'express';
import fsqDevelopersPlaces from '@api/fsq-developers-places';

const authenticateSDK = () => {
  const apiKey = (process.env.FOURSQUARE_API_KEY as string).trim();
  fsqDevelopersPlaces.auth(apiKey);
};

// 1. Search Places (Chuẩn xác như bác đang dùng)
export const searchPlaces = async (req: Request, res: Response) => {
  try {
    const apiKey = (process.env.FOURSQUARE_API_KEY as string).trim();
    fsqDevelopersPlaces.auth(apiKey);
    
    const { data } = await fsqDevelopersPlaces.placeSearch({
      near: req.query.near as string,
      query: req.query.query as string,
      limit: 10,
      'X-Places-Api-Version': '2025-06-17'
    });

    res.json(data);
  } catch (error: any) {
    console.error("Lỗi Search:", error.data || error);
    res.status(500).json({ error: "Lỗi Foursquare Search", details: error.data || error.message });
  }
};

// 2. Match Place
export const matchPlace = async (req: Request, res: Response) => {
  try {
    authenticateSDK();
    const { data } = await fsqDevelopersPlaces.placeMatch({
      name: (req.query.name as string) || '',
      city: (req.query.city as string) || '',
      country: (req.query.country as string) || '',
      address: '', 
      cc: 'VN',    
      'X-Places-Api-Version': '2025-06-17'
    } as any);

    res.json(data);
  } catch (error: any) {
    console.error("Lỗi Match:", error.data || error);
    res.status(500).json({ error: "Lỗi Match", details: error.data || error.message });
  }
};

// 3. Ask Places (NLP)
export const askPlaces = async (req: Request, res: Response) => {
  try {
    authenticateSDK();
    const { data } = await fsqDevelopersPlaces.ask({
      query: (req.query.query as string) || '',
      location: (req.query.location as string) || '',
      'X-Places-Api-Version': '2025-06-17'
    });

    res.json(data);
  } catch (error: any) {
    console.error("Lỗi Ask:", error.data || error);
    res.status(500).json({ error: "Lỗi Ask", details: error.data || error.message });
  }
};

// 4. Place Details
export const getPlaceDetails = async (req: Request, res: Response) => {
  try {
    authenticateSDK();
    const fsq_place_id = req.params.fsq_id as string;
    
    if (!fsq_place_id || fsq_place_id === 'undefined') {
      return res.status(400).json({ error: "Thiếu fsq_id hợp lệ" });
    }
    
    const response = await fsqDevelopersPlaces.placeDetails({
      fsq_place_id,
      'X-Places-Api-Version': '2025-06-17'
    } as any);

    res.json(response.data);
  } catch (error: any) {
    console.error("❌ Lỗi Details chi tiết:", error.data || error.message || error);
    res.status(500).json({ error: "Lỗi Details", details: error.data || error.message });
  }
};

// 5. Place Photos (Đã bổ sung chuẩn Authorization API Key)
export const getPlacePhotos = async (req: Request, res: Response) => {
  try {
    const apiKey = (process.env.FOURSQUARE_API_KEY as string).trim();
    const fsq_place_id = req.params.fsq_id as string;

    const url = `https://places-api.foursquare.com/places/${fsq_place_id}/photos?limit=12`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'Authorization': apiKey, // Bắt buộc phải có cái này để xác thực
        'X-Places-Api-Version': '2025-06-17' 
      }
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("❌ Lỗi Foursquare trả về Photos:", data);
      return res.status(response.status).json({ error: "Lỗi lấy ảnh", details: data });
    }

    res.json(data);
  } catch (err: any) { 
    console.error("❌ Lỗi Server Photos:", err.message);
    res.status(500).json({ error: err.message }); 
  }
};

// 6. Place Tips (Đã bổ sung chuẩn Authorization API Key)
export const getPlaceTips = async (req: Request, res: Response) => {
  try {
    const apiKey = (process.env.FOURSQUARE_API_KEY as string).trim();
    const fsq_place_id = req.params.fsq_id as string;

    const url = `https://places-api.foursquare.com/places/${fsq_place_id}/tips?limit=10`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'Authorization': apiKey, // Bắt buộc phải có cái này để xác thực
        'X-Places-Api-Version': '2025-06-17' 
      }
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("❌ Lỗi Foursquare trả về Tips:", data);
      return res.status(response.status).json({ error: "Lỗi lấy tips", details: data });
    }

    res.json(data);
  } catch (err: any) { 
    console.error("❌ Lỗi Server Tips:", err.message);
    res.status(500).json({ error: err.message }); 
  }
};