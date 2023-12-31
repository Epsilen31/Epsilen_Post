import { mongoose } from "mongoose";

const connection = {
  isConnected: false,
};

export const connectDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using an existing database connection");
      return;
    }

    const db = await mongoose.connect(process.env.MongoDB);

    connection.isConnected = db.connections[0].readyState === 1;
    console.log("database connection established");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
