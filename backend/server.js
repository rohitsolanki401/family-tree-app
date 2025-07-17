import express from "express";
import mongoose, { connect } from 'mongoose'
import cors from 'cors';
import personRoutes from './routes/personRoutes.js'
import relationshipRoutes from './routes/relationshipRoutes.js'
import dotenv from 'dotenv';

const app = express()
dotenv.config()
app.use(cors())

// Routes
app.use('/api/persons',personRoutes);
app.use('/api/relationships',relationshipRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=> {console.log('MongoDB connected');
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on PORT ${process.env.PORT || 5000}`);
})
})
.catch(err => console.error(err));
