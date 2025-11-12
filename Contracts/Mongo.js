import mongoose from 'mongoose';
import { DB_USER,DB_PASSWORD } from '../config.js';

const uri =`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.oyy1w7r.mongodb.net/?appName=Cluster0`;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

export default mongoose;
