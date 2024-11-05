import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./src/config/db.js";
import todoRoutes from "./src/routes/todoRoutes.js"


dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api/user', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})