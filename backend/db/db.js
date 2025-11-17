// Used for ODM (object document mapping) strategy that involves 
// validation, querying, indexing, middleware with Models
import mongoose from 'mongoose';

// Used to fetch raw data from collections without ODM(object document mapping)
// strategy that involves middleware, validation with Mongoose Models
// import { MongoClient } from 'mongodb';
// const conn = await MongoClient.connect(uri);
// const usersCollections = await conn.db('MyMongoDB').collection('users').find().toArray();

export const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error connecting to DB:', err);
    process.exit(1);
  }
};
