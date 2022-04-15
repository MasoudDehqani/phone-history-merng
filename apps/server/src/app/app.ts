import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLSchema, GraphQLInt, GraphQLID } from 'graphql';
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
      reviews: { type: new GraphQLList(ReviewType) },
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