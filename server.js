import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// config dotenv
dotenv.config();
// dotenv.config({path:'./path/of/.env/file'})

// connect to db
connectDB();

// rest object
const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build'))); //middleware for build

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

// rest api
app.use('*',function(req, res){
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// PORT
const PORT = process.env.PORT || 8080; // or 8080 if not shown

app.listen(PORT, () => {
  console.log(`app is running on ${process.env.DEV_MODE} and on port ${PORT}`.bgCyan.white);
});
