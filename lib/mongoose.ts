import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status
const str = "mongodb+srv://phuazaiqin:TfwHGEwrfPTCu1qv@cluster0.dfepwv5.mongodb.net/CivicOtters?retryWrites=true&w=majority&appName=Cluster0"

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  // mongoose.set("strictQuery", true);

  //if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(str);

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
