require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const os = require("os");
const fileRouter = require("./routes/fileRoutes");
const PORT = process.env.PORT || 6000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/files", fileRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    error: err.message,
  });
});
// const cpuInfo = os.cpus();

// console.log("Architecture", os.arch());
// console.log('Platform:', os.platform()); // e.g., 'linux' or 'win32'
// console.log('Total Memory:', os.totalmem()/ (1024 ** 3)); // Total memory in bytes
// console.log('Free Memory:', os.freemem()/ (1024 ** 3)); // Free memory in bytes
// console.log("CPU Info", JSON.stringify(cpuInfo, null, 2));

connectDB()
  .then(() => {
    console.log("Database connected to MongoDB....");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database is not connected!!");
  });
