import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"

export const ReviewType = new GraphQLObjectType({
  name: "review",
  fields: () => ({
    id: { type: GraphQLID },
    rate: { type: GraphQLFloat },
    text: { type: GraphQLString }
  })
})

export const PhoneType = new GraphQLObjectType({
  name: "phone",
  fields: () => ({
    _id: { type: GraphQLID },
    brand: { type: GraphQLString },
    model: { type: GraphQLString },
    priceRange: { type: GraphQLInt },
    reviews: { type: new GraphQLList(ReviewType) },
    avgRate: { type: GraphQLFloat },
    reviewsCount: { type: GraphQLInt }
  }),
})

export const ReviewsType = new GraphQLObjectType({
  name: "reviews",
  fields: () => ({
    id: { type: GraphQLID },
    reviews: { type: new GraphQLList(ReviewType) },
    avgRate: { type: GraphQLFloat },
    model: { type: GraphQLString },
    brand: { type: GraphQLString }
  })
})