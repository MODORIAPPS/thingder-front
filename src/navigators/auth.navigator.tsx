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

            {/* 비밀번호 찾기 */}
            <Route path="reset" element={<PasswordReset />} />

        </Routes>
    );
};

export default AuthNavigator;