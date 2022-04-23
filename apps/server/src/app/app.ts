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
      reviews: { type: new GraphQLList(ReviewType) },
      avgRate: { type: GraphQLFloat },
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
        resolve: (args) => {
          if (!args) return PhoneDocument.find({});
          const { phoneId, brand, model, priceRange } = args;
          const findValue = phoneId || brand || model || priceRange;
          if (findValue) {
            return PhoneDocument.find({
              $or: [
                { id: findValue },
                { brand: findValue },
                { model: findValue },
                { priceRange: findValue }
              ]
            });
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
            { $unwind: '$reviews' },
            { $group: { _id: '$_id', avgRate: { $avg: '$reviews.rate' }, reviews: { $push: '$reviews' } } }
          ])
          return reviews[0];
          // console.log(reviews);
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
      // deletePhone: {
      //   type: GraphQLInt,
      //   args: {
      //     phoneId: { type: GraphQLID }
      //   },
      //   resolve: async (parent, args) => {
      //     return await PhoneDocument.deleteOne({ phoneId: args.phoneId })
      //   }
      // }
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