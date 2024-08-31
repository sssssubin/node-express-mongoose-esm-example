// 컨트롤러 (Controller): 사용자 데이터 생성, 조회, 업데이트, 삭제 로직 처리

import User from "../model/userModel.js";

// 사용자 생성
export const create = async (req, res) => {
  try {
    const userData = new User(req.body); // 요청 본문에서 사용자 데이터 생성
    const { email } = userData;
    const userExist = await User.findOne({ email }); // 이메일로 사용자 존재 여부 확인
    if (userExist) {
      return res.status(400).json({ message: "already exists" }); // 사용자 존재 시 에러 반환
    }
    const saveUser = await userData.save(); // 사용자 저장
    res.status(200).json(saveUser); // 저장된 사용자 반환
  } catch (error) {
    res.status(500).json({ error: "연결 안됨" });
  }
};

// 모든 사용자 조회
export const read = async (req, res) => {
  try {
    const users = await User.find(); // 모든 사용자 조회
    if (users.length === 0) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(users); // 조회된 사용자 반환
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// 사용자 업데이트
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id }); // ID로 사용자 존재 여부 확인
    if (!userExist) {
      return res.status(404).json({ message: "Not Found" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "Not Found" });
    }
    await User.findByIdAndDelete(id); // 사용자 삭제
    res.status(200).json({ message: "Delete!" });
  } catch {
    return res.status(500).json({ error: "Server Error" });
  }
};
