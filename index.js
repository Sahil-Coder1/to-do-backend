const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://to-do-frontend-ecru.vercel.app"],
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));

app.listen(5000, () => console.log("Server running on port 5000"));
