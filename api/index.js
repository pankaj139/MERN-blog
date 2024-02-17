import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';

import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log("Mongodb is connected");
})
.catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use((err, req, res,next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success :false,
        statusCode,
        message
    });
});