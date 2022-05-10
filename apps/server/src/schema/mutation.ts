import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import addPhoneResolver from "../resolvers/addPhone";
import addReviewResolver from "../resolvers/addReview";
import deletePhoneResolver from "../resolvers/deletePhone";
import { PhoneType } from "./apiObjectTypes";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPhone: {
      type: PhoneType,
      args: {
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        priceRange: { type: GraphQLInt }
      },
      resolve: addPhoneResolver
    },
    addReview: {
      type: PhoneType,
      args: {
        phoneId: { type: GraphQLID },
        rate: { type: GraphQLFloat },
        text: { type: GraphQLString },
      },
      resolve: addReviewResolver
    },
    deletePhone: {
      type: GraphQLInt,
      args: {
        phoneId: { type: GraphQLID }
      },
      resolve: deletePhoneResolver
    }
  }
})