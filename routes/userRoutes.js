// 라우트 (Route): URL 경로와 해당 경로에서 실행될 컨트롤러 함수 매핑

import express from "express";
import {
  create,
  read,
  update,
  deleteUser,
} from "../controller/userController.js";

const route = express.Router();

// 사용자 생성
route.post("/create", create);

// 모든 사용자 조회
route.get("/getUsers", read);

// ID로 사용자 업데이트
route.put("/update/:id", update);

// ID로 사용자 삭제
route.delete("/delete/:id", deleteUser);

export default route;
