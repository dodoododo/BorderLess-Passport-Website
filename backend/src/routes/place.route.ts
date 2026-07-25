import express from 'express';
import { searchPlaces } from '../controllers/place.controller.js';

const router = express.Router();

// Route nhận request từ Frontend
// GET /api/places/search
router.get('/search', searchPlaces);

export default router;