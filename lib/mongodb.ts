import mongoose from "mongoose";

/**
 * Cache shape for reusing the MongoDB connection
 * during development hot reloads.
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

/**
 * Extend globalThis with a custom cache property.
 * Avoid naming it `mongoose` to prevent conflicts.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

/**
 * MongoDB connection string from environment variables.
 */
const uri = process.env.uri;

if (!uri) {
  throw new Error(
    "Please define the uri environment variable inside .env.local"
  );
}

const MONGODB_URI : string = uri;

/**
 * Reuse cache if it already exists.
 */
const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

/**
 * Connect to MongoDB using Mongoose.
 * Returns an existing connection if already connected.
 */
async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;