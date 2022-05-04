import { GraphQLSchema } from "graphql"
import { Mutation } from "./mutation"
import { RootQuery } from "./rootQuery"

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
