import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import thumbnailRoutes from './routes/thumbnailRoutes.js';
import errorHandler from "./middleware/errorHandler.js";
import {generateThumbnail} from './services/thumbnailService.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //cors is to allow requests from the frontend to the backend
app.use(express.json()); // this is to parse the incoming requests with the json payloads

//use the thumbnail route
app.use('/api', thumbnailRoutes);

//error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
