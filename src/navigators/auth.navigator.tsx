import RegisterItem from "@/pages/RegisterItem/RegisterItem";
import RegisterPolicy from "@/pages/RegisterPolicy/RegisterPolicy";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import PasswordReset from "../pages/PasswordReset/PasswordReset";
import Register from "../pages/Register/Register";

/**
 * /auth/
 */
const AuthNavigator: React.FC = () => {
    return (
        <Routes>
            {/* 로그인 페이지 */}
            <Route index element={<Login />} />

            {/* 회원가입 */}
            <Route path="register" element={<Register />} />

            {/* 회원가입 */}
            <Route path="policy" element={<RegisterPolicy />} />

            {/* 아이템 등록 */}
            <Route path="register/item" element={<RegisterItem />} />

            {/* 비밀번호 찾기 */}
            <Route path="reset" element={<PasswordReset />} />

        </Routes>
    );
};

export default AuthNavigator;