import { Schema, Mongoose } from 'mongoose';

const mongoose = new Mongoose();

export const ReviewDocumentSchema = new Schema({
  phoneId: { type: String, required: true },
  rate: { type: Number, required: true },
  text: { type: String, required: true },
});

export function test2() {
  console.log("")
}

export const ReviewDocument = mongoose.model('reviews', ReviewDocumentSchema);