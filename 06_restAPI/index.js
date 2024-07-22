const express = require("express");

const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/index");

const app = express();
const PORT = 8000;

//connect to mongodb
connectMongoDb("mongodb://127.0.0.1:27017/sabinDB").then(() => {
  console.log("Connected to mongodb");
});

//middleware = assume it as a plugin
app.use(express.urlencoded({ extended: false }));

//middlewares
app.use(logReqRes("log.txt  "));



//registering routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
