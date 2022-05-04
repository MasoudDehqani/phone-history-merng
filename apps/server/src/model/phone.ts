import { Schema } from 'mongoose';
import { ReviewDocumentSchema } from './review';
import mongoose from 'mongoose';
import { test } from '../server';
import { DatabaseCollections, getCollection } from '../app/app';

const PhoneDocumentSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  priceRange: { type: Number, required: true },
  avgRate: { type: Number },
  reviewsCount: { type: Number },
  reviews: [ReviewDocumentSchema]
})

export const PhoneDocument = mongoose.model('phones', PhoneDocumentSchema);
// runServer().catch(console.log)

// runServer().catch(console.table)
// console.log("MongoDBClient: ", MongoDBClient)

// const phoneHistoryDatabase = MongoDBClient.db('phoneHistoryDB');
// export const phones = phoneHistoryDatabase.collection('phones');

// (async function() {
//   const query = { model: 'N73' };
//   const phones = await getCollection(DatabaseCollections.PHONES)
//   const phone = await phones.findOne(query);
//   console.log(phone)
// })().catch(console.table)
