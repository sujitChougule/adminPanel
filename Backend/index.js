const express = require("express");
const app = require("./app");
const PORT = process.env.PORT || 5000;
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

require("dotenv").config({ path: "backend/config/config.env" });
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
