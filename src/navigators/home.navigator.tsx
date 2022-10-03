import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutFragment from "../pages/Home/fragments/About/AboutFragment";
import ChatFragment from "../pages/Home/fragments/Chat/ChatFragment";
import ExploreFragment from "../pages/Home/fragments/Explore/ExploreFragment";
import HomeFragment from "../pages/Home/fragments/Home/HomeFragment";
import Home from "../pages/Home/Home";

const HomeNavigator: React.FC = () => {
    return (
        <Routes>
            <Route element={<Home />} >
                {/* 홈 프래그먼트 */}
                <Route index element={<HomeFragment />} />

                {/* 탐험 프래그먼트 */}
                <Route path="explore" element={<ExploreFragment />} />

                {/* 메시지 프래그먼트 */}
                <Route path="chat" element={<ChatFragment />} />

                {/* 커틀러리(About) 프래그먼트 */}
                <Route path="about" element={<AboutFragment />} />

            </Route>
        </Routes>
    );
};

export default HomeNavigator;