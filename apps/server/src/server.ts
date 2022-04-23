
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import { schema } from './app/app';

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


