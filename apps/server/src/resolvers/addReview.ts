import mongoose from "mongoose";
import { PhoneDocument } from "../model/phone";
import { ReviewDocument } from "../model/review";

export default async function addReviewResolver(parent, args) {
  const newReview = new ReviewDocument({
    phoneId: args.phoneId,
    rate: args.rate,
    text: args.text
  });
  // const phone = await PhoneDocument.findById(args.phoneId)
  // const phone = await PhoneDocument.aggregate([
  //   { $match: { _id: new mongoose.Types.ObjectId(args.phoneId) } },
  //   { $project: { reviews: { $push: newReview }, reviewsCount: { $inc: { reviewsCount: 1 } } } },
  // ])
  const phone = await PhoneDocument.updateOne(
    { _id: new mongoose.Types.ObjectId(args.phoneId) },
    [
      { $set: { reviews: { $concatArrays: ["$reviews", [newReview]] }, reviewsCount: { $add: ["$reviewsCount", 1] } } },
      { $set: { avgRate: { $avg: "$reviews.rate" } } }
    ]
  )
  // phone.reviews.push(newReview);
  // phone.reviewsCount++;
  // if (!phone.avgRate) {
  //   phone.avgRate = args.rate;
  //   return phone.save();
  // }
  // phone.avgRate = (phone.avgRate * phone.reviews.length + args.rate) / (phone.reviews.length + 1);
  // phone.save();
  return phone;
  // return newReview.save();
}