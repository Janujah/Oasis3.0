import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  try {
    await connect();
    console.log("You are connected");

    // Handle your API route logic here
    res.status(200).json({ message: "API response" });
  } catch (error) {
    console.log("You are not connected", error);
    res.status(500).json({ error: "Database connection failed" });
  }
}
