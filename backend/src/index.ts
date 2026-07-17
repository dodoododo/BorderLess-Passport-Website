import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Import hàm kết nối
import passportRoutes from './routes/passport.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kết nối DB trước khi lắng nghe request
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port ${PORT}`);
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BorderLess Backend is running smoothly!' });
});

app.use('/api/passports', passportRoutes);