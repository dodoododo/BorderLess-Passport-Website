import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { PassportModel } from '../models/passport.model.js';

// Thay bằng chuỗi kết nối của bác
const MONGO_URI = '';

async function importCSV() {
  await mongoose.connect(MONGO_URI);
  console.log("🚀 Đang kết nối Database...");

  const csvFilePath = path.join(process.cwd(), 'src/data/passport-index-matrix-iso2.csv');
  const results: any[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log(`✅ Đã đọc xong ${results.length} dòng. Đang đẩy vào Mongo...`);

      for (const row of results) {
        // row[0] là cột đầu tiên: passportIso
        // Các cột còn lại là các nước đến: { "VN": "visa-free", "US": "visa-required" }
        const passportIso = Object.values(row)[0] as string;
        const destinations = new Map(Object.entries(row).slice(1));

        await PassportModel.updateOne(
          { passportIso },
          { $set: { destinations } },
          { upsert: true }
        );
      }

      console.log("🎉 Xong xuôi! Đã cập nhật toàn bộ Passport Index.");
      process.exit();
    });
}

importCSV();