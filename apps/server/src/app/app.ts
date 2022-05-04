import { MongoClient } from 'mongodb';
import { Mutation } from '../schema/mutation';
import { RootQuery } from '../schema/rootQuery';
import { test } from '../server';


export async function getDatabaseClient() {
  try {
    const uri = "mongodb://localhost:27017/";
    const MongoDBClient = new MongoClient(uri);
    await MongoDBClient.connect();
    return MongoDBClient
    // const phoneHistoryDatabase = MongoDBClient.db('phoneHistoryDB');
  } catch(error) {
    console.log(error)
    process.exit()
  }
}

export async function getPhonesHistoryDB() {
  const databaseClient = await getDatabaseClient()
  return databaseClient.db('phoneHistoryDB')
}

export enum DatabaseCollections {
  PHONES = 'phones',
  REVIEWS = 'reviews'
}

export async function getCollection(collection: DatabaseCollections) {
  const phoneHistoryDB = await getPhonesHistoryDB()
  return phoneHistoryDB.collection(collection)
}

// const schema = buildSchema(`
//   type Query {
//     hello: String,
//     goodbye(name: String): String
//   }
// `);

  // const root = {
  //   hello: () => {
  //     return 'Hello world!';
  //   },
  //   goodbye({ name }) {
  //     return `Hello ${name}`
  //   }
  // };