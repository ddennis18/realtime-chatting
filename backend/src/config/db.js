import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successsfully")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
