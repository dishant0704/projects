
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

let isConnected = false;

export async function connect() {

  if(isConnected) return
 
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "pwa-news-app-db",
    });
  }

  cached.conn = await cached.promise;
  console.log("Mongo DB Connected");
  isConnected = true

  return cached.conn;
}