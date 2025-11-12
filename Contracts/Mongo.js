import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri =`mongodb+srv://${process.env.MONGO_User}:${process.env.MONGO_PASSWORD}@cluster0.oyy1w7r.mongodb.net/?appName=Cluster0`;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

export default mongoose;
