import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRoute from './routes/user.route.js'
import blogRoute from './routes/blog.route.js'

const app = express()
dotenv.config()

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;


// Middleware
  app.use(express.json());
  app.use(cookieParser());

// Enable CORS
  app.use(cors({
  origin: '*',
  credentials: true
}));

  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/"
  }))


// DB Code
const connectDB = async () => {
try{
    await mongoose.connect(MONGO_URL)
    console.log("Connected to MongoDB")
} catch(error){
    console.log("MongoDb connection error:",error);
    process.exit(1);
}
};
connectDB();


// defining routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY 
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
