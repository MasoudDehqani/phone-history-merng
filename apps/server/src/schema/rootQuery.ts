import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { DatabaseCollections, getCollection } from "../app/app";
import { PhoneDocument } from "../model/phone";
import { PhoneType, ReviewsType } from "./apiObjectTypes";

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    phone: {
      type: PhoneType,
      args: {
        phoneId: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        const phone = await getCollection(DatabaseCollections.PHONES)
        return phone.find(new ObjectId(args.phoneId))
      }
    },
    phones: {
      type: new GraphQLList(PhoneType),
      args: {
        phoneId: { type: GraphQLString },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        priceRange: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        // if (Object.keys(args).length === 0) return PhoneDocument.find({});
        const phone = await getCollection(DatabaseCollections.PHONES)
        // console.log('phones: ', await phone.find())
        const allPhones = await phone.find().toArray()
        console.log('allPhones: ', allPhones)
        if (Object.keys(args).length === 0) return allPhones;
        const { phoneId, brand, model, priceRange } = args;
        const findValue = phoneId || brand || model || priceRange;
        const keyValuePair = Object.entries(args)[0]
        if (findValue) {
          const phone = await PhoneDocument.find({ [keyValuePair[0]]: keyValuePair[1] })
          return phone
        }
      }
    },
    reviews: { 
      type: ReviewsType,
      args: {
        phoneId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const reviews = await PhoneDocument.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(args.phoneId) } },
          // { $group: { _id: "$_id", brand: { $first: "$brand" }, model: { $first: "$model" }, reviews: { $push: {$first: "$reviews"} } } },
          { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
          { $group: { _id: "$_id", avgRate: { $avg: '$reviews.rate' }, reviews: { $push: '$reviews' }, brand: { $first: '$brand' }, model: { $first: '$model' } } },
          { $project: { _id: 0, id: "$_id", reviews: 1, avgRate: 1, brand: 1, model: 1 } }
        ])
        return reviews[0];
        // const phone = await PhoneDocument.findById(args.phoneId)
        // const avgRate = phone.reviews.reduce((acc, cur) => acc + cur.rate, 0) / phone.reviews.length;
        // return {
        //   reviews: phone.reviews,
        //   avgRate
        // }
      }
    },
  },
})