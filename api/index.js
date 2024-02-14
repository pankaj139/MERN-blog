import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Mongodb is connected");
}).catch((err) => {
    console.log(err);
})
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
