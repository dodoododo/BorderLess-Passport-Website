// src/models/Passport.ts
import mongoose, { Schema } from 'mongoose';

const PassportSchema = new Schema({
  passportIso: { type: String, required: true, unique: true, index: true },
  // destinations: { "VN": "visa-free", "US": "visa-required" }
  destinations: { type: Map, of: String } 
});

export const PassportModel = mongoose.model('Passport', PassportSchema);