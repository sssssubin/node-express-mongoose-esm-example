// 모델 (Model): 사용자 데이터 구조 정의 및 데이터베이스 상호작용

import mongoose from "mongoose";

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
});

// 'users' 컬렉션에 해당 스키마를 적용한 모델 생성 및 내보내기
export default mongoose.model("User", userSchema);
