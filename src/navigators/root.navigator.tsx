import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Welcome from "../pages/Welcome";
import AuthNavigator from "./auth.navigator";
import HomeNavigator from "./home.navigator";

const RootNavigator = () => {

    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (
        <div
            className={`${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn");
                    setDisplayLocation(location);
                }
            }}>
            <Routes location={displayLocation}>

                {/* 앱 시작점 */}
                <Route index element={<Welcome />} />

                {/* 로그인, 회원가입, 비밀번호 찾기 */}
                <Route path="auth/*" element={<AuthNavigator />} />

                <Route path="home/*" element={<HomeNavigator />} />
            </Routes>
        </div>

    );
};

export default RootNavigator;