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


// 2️⃣  Bring in our database helper from step 1-a.
import connectDB from './config/db.js';



// 3️⃣  Read environment variables from .env into process.env.
dotenv.config();

// 4️⃣  Connect to MongoDB before we start accepting HTTP requests.
connectDB();
 connectCloudinary(); 

// 5️⃣  Create an Express application instance.
const app = express();

// 6️⃣  Global middleware – let React (http://localhost:3000) call us
//     without CORS errors *and* automatically parse JSON bodies.
app.use(cors({
  origin: process.env.REACT_URL_CLIENT || "http://localhost:3001",
  credentials: true
}));
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", userProgressRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.REACT_URL_CLIENT || "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// 8️⃣  Pick port from environment (for Heroku) or default to 5000.
const PORT = process.env.PORT || 5000;

// 9️⃣  Start listening; log a message so you know it worked.
app.listen(PORT, () =>
  console.log(`Server listening on ${PORT}`)
);
