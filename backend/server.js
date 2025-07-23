// backend/server.js
// 1️⃣  Pull in the libraries our server depends on.
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from "./routes/courseRoutes.js";

import protectedRoutes from './routes/protectedRoutes.js';


// 2️⃣  Bring in our database helper from step 1-a.
import connectDB from './config/db.js';

// 3️⃣  Read environment variables from .env into process.env.
dotenv.config();

// 4️⃣  Connect to MongoDB before we start accepting HTTP requests.
connectDB();

// 5️⃣  Create an Express application instance.
const app = express();

// 6️⃣  Global middleware – let React (http://localhost:3000) call us
//     without CORS errors *and* automatically parse JSON bodies.
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use("/api/courses", courseRoutes);



app.use('/api/protected', protectedRoutes);



// 7️⃣  Basic test route so you can confirm the server responds.
//     Later you’ll mount /api/admin, /api/teacher, /api/student, etc.
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// 8️⃣  Pick port from environment (for Heroku) or default to 5000.
const PORT = process.env.PORT || 5000;

// 9️⃣  Start listening; log a message so you know it worked.
app.listen(PORT, () =>
  console.log(`Server listening on ${PORT}`)
);
