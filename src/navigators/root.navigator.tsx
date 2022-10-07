import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Welcome from "../pages/Welcome";
import AdminNavigator from "./admin.navigator";
import AuthNavigator from "./auth.navigator";
import HomeNavigator from "./home.navigator";

const RootNavigator = () => {

    return (
        <Routes>

            {/* 앱 시작점 */}
            <Route index element={<Welcome />} />

            {/* 로그인, 회원가입, 비밀번호 찾기 */}
            <Route path="auth/*" element={<AuthNavigator />} />

            {/* 홈 화면 */}
            <Route path="home/*" element={<HomeNavigator />} />

            {/* 어드민 화면 */}
            <Route path="admin/*" element={<AdminNavigator />} />
        </Routes>
    );
};

export default RootNavigator;