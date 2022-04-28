import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLSchema, GraphQLInt, GraphQLID } from 'graphql';
import mongoose from 'mongoose';
import { PhoneDocument } from '../model/phone';
import { ReviewDocument } from '../model/review';

// const schema = buildSchema(`
//   type Query {
//     hello: String,
//     goodbye(name: String): String
//   }
// `);

const ReviewType = new GraphQLObjectType({
    name: "review",
    fields: () => ({
      id: { type: GraphQLID },
      rate: { type: GraphQLFloat },
      text: { type: GraphQLString }
    })
  })
  
  const PhoneType = new GraphQLObjectType({
    name: "phone",
    fields: () => ({
      id: { type: GraphQLID },
      brand: { type: GraphQLString },
      model: { type: GraphQLString },
      priceRange: { type: GraphQLInt },
      reviews: { type: new GraphQLList(ReviewType) },
      avgRate: { type: GraphQLFloat },
      reviewsCount: { type: GraphQLInt }
    }),
  })

  const ReviewsType = new GraphQLObjectType({
    name: "reviews",
    fields: () => ({
      id: { type: GraphQLID },
      reviews: { type: new GraphQLList(ReviewType) },
      avgRate: { type: GraphQLFloat },
      model: { type: GraphQLString },
      brand: { type: GraphQLString }
    })
  })
  
  const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
      phone: {
        type: PhoneType,
        args: {
          phoneId: { type: GraphQLID }
        },
        resolve(parent, args) {
          return PhoneDocument.findById(args.phoneId);
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
          console.log("args: ", args)
          if (Object.keys(args).length === 0) return PhoneDocument.find({});
          const { phoneId, brand, model, priceRange } = args;
          const findValue = phoneId || brand || model || priceRange;
          console.log("findValue: ", findValue)
          const keyValuePair = Object.entries(args)[0]
          if (findValue) {
            console.log("cherto pert")
            const phone = await PhoneDocument.find({ [keyValuePair[0]]: keyValuePair[1] })
            console.log("phone: ", phone)
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
  
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addPhone: {
        type: PhoneType,
        args: {
          brand: { type: GraphQLString },
          model: { type: GraphQLString },
          priceRange: { type: GraphQLInt }
        },
        resolve(parent, args) {
          console.log("args: ", args)
          const newPhone = new PhoneDocument({
            brand: args.brand,
            model: args.model,
            priceRange: args.priceRange,
            reviewsCount: 0,
          });
          return newPhone.save();
        }
      },
      addReview: {
        type: PhoneType,
        args: {
          phoneId: { type: GraphQLID },
          rate: { type: GraphQLFloat },
          text: { type: GraphQLString },
        },
        resolve: async (parent, args) => {
          const newReview = new ReviewDocument({
            phoneId: args.phoneId,
            rate: args.rate,
            text: args.text
          });
          const phone = await PhoneDocument.findById(args.phoneId)
          phone.reviews.push(newReview);
          phone.reviewsCount++;
          if (!phone.avgRate) {
            phone.avgRate = args.rate;
            return phone.save();
          }
          phone.avgRate = (phone.avgRate * phone.reviews.length + args.rate) / (phone.reviews.length + 1);
          return phone.save();
          // return newReview.save();
        }
      },
      deletePhone: {
        type: GraphQLInt,
        args: {
          phoneId: { type: GraphQLID }
        },
        resolve: async (parent, args) => {
          const res = await PhoneDocument.deleteOne({ _id: args.phoneId })
          return res.deletedCount
        }
      }
    }
  })
  
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
  
  // const root = {
  //   hello: () => {
  //     return 'Hello world!';
  //   },
  //   goodbye({ name }) {
  //     return `Hello ${name}`
  //   }
  // };