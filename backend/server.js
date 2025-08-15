// backend/server.js
// 1️⃣  Pull in the libraries our server depends on.
import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";
import connectCloudinary from './config/cloudinary.js';
import userProgressRoutes from './routes/progressRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js';
import connectDB from './config/db.js';
import purchaseRoutes from './routes/purchaseroutes.js';


// 3️⃣  Read environment variables from .env into process.env.
dotenv.config();

// 4️⃣  Connect to MongoDB before we start accepting HTTP requests.
connectDB();
 connectCloudinary(); 

// 5️⃣  Create an Express application instance.
const app = express();

app.use(cors(
//   {
//   origin: process.env.REACT_URL_CLIENT || "http://localhost:3001",
//   credentials: true
// }
));
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", userProgressRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/purchase', purchaseRoutes);

app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// 7 If we had a socket.io server, we would set it up here.

// 8️ Pick port from environment (for Heroku) or default to 5000.
const PORT = process.env.PORT || 5000;

// 9️ Start listening; log a message so you know it worked.
app.listen(PORT, () =>
  console.log(`Server listening on ${PORT}`)
);
