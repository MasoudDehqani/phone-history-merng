import { Schema } from 'mongoose';
import { ReviewDocumentSchema } from './review';
import mongoose from 'mongoose';

const PhoneDocumentSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  priceRange: { type: Number, required: true },
  avgRate: { type: Number },
  reviewsCount: { type: Number },
  reviews: [ReviewDocumentSchema]
})

export const PhoneDocument = mongoose.model('phones', PhoneDocumentSchema);