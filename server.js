import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 현재 파일의 URL을 파일 경로로 변환하여 __dirname 에뮬레이트
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGODB_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("연결 잘 됐어!");
    app.listen(PORT, () => {
      console.log(`연결 잘 됐어요. http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  // res.send("서버가 정상적으로 작동하고 있습니다!");
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.use("/user", route);

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const userModel = mongoose.model("users", userSchema);

// app.get("/users", async (req, res) => {
//   const userData = await userModel.find();
//   res.json(userData);
// });

export default app;