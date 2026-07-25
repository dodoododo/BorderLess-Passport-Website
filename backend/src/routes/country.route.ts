import { Router } from 'express';
import { CountryController } from '../controllers/country.controller.js';

const router = Router();

router.get('/:iso', CountryController.getCountryProfile);

export default router;