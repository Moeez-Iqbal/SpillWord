import dotenv from 'dotenv';
dotenv.config();

const connectDB = {
    uri: process.env.MONGODB_URI,
};

export default connectDB;
