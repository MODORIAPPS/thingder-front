import { useAppSelector } from "@/hooks/redux";
import Chat from "@/pages/Chat";
import Report from "@/pages/Chat/Report";
import ChatReport from "@/pages/Home/fragments/Chat/pages/ChatReport";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AboutFragment from "../pages/Home/fragments/About/AboutFragment";
import ChatFragment from "../pages/Home/fragments/Chat/ChatFragment";
import ExploreFragment from "../pages/Home/fragments/Explore/ExploreFragment";
import HomeFragment from "../pages/Home/fragments/Home/HomeFragment";
import Home from "../pages/Home/Home";

const HomeNavigator: React.FC = () => {

    const { loading, data } = useAppSelector(state => state.user);

    // if (loading || !data?.isLogin) return <></>

    return (
        <Routes>
            <Route element={<Home />} >
                {/* 홈 프래그먼트 */}
                <Route index element={<HomeFragment />} />

                {/* 탐험 프래그먼트 */}
                <Route path="explore" element={<ExploreFragment />} />

                {/* 메시지 프래그먼트 */}
                <Route path="chat" element={<ChatFragment />} />
                <Route path="chat/:id" element={<Chat />} />
                <Route path="chat/:id/report" element={<ChatReport />} />
                
                {/* 커틀러리(About) 프래그먼트 */}
                <Route path="about" element={<AboutFragment />} />
            </Route>
        </Routes>
    );
};

export default HomeNavigator;