import express from 'express';
import router from './routes/index.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();


app.use(express.json());
const { PORT, URI_DB } = process.env;
mongoose.connect(URI_DB);


app.use("/api", router)
app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
})
