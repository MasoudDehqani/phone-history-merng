
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import { schema } from '../src/schema/apiSchema';
import { MongoClient } from 'mongodb';

export function test() {
  console.log("")
};

// const uri = "mongodb://localhost:27017/";
// export const MongoDBClient = new MongoClient(uri);
// export async function runServer() {
//   try {
//     await MongoDBClient.connect();
//     // const phoneHistoryDatabase = MongoDBClient.db('phoneHistoryDB');
//   } finally {
//     // Ensures that the MongoDBClient will close when you finish/error
//     await MongoDBClient.close();
//   }
// }

// runServer().catch(console.dir);

const app = express();

mongoose.connect('mongodb://localhost:27017/phoneHistoryDB');
mongoose.connection.once('open', () => {
  console.log('Connected to mongodb');
});
mongoose.connection.on('error', console.error);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/graphql`);
});
server.on('error', console.error);


