const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
app.use(express.json());
// cookie parser
app.use(cookieParser());
require("dotenv").config({ path: "backend/config/config.env" });
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

//config env
dotenv.config({ path: "./config/config.env" });
// import Routes
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/v1", userRoutes);
app.use("/api/v1", employeeRoutes);
// importing error handler
app.use(errorMiddleware);
module.exports = app;
