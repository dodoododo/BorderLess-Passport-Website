import { Request, Response } from 'express';
import fsqDevelopersPlaces from '@api/fsq-developers-places';

export const searchPlaces = async (req: Request, res: Response) => {
  try {
    // Ép đúng cái Key fsq3... của bác vào đây (Nhớ lấy từ .env ra cho bảo mật)
    const apiKey = (process.env.FOURSQUARE_API_KEY as string).trim();
    
    // GỌI Y CHANG DOCS CỦA NÓ:
    fsqDevelopersPlaces.auth(apiKey);
    const { data } = await fsqDevelopersPlaces.placeSearch({
      near: req.query.near as string,
      query: req.query.query as string,
      'X-Places-Api-Version': '2025-06-17'
    });

    res.json(data);

  } catch (error: any) {
    console.error("Lỗi 401 ở đây là do Foursquare cấm API Key của bác:", error.data || error);
    res.status(500).json({ error: "Lỗi Foursquare", details: error.data || error.message });
  }
};