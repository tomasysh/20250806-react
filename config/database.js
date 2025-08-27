import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose;

  // If the database is already connected, don't reconnect
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  // Connect to MongoDB using the URI from environment variables
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
