import ActionBar from "@/components/ActionBar";
import Admin from "@/pages/Admin/Admin";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminNavigator: React.FC = () => {
    return (
        <Routes>
            {/* 어드민 홈  */}
            <Route index element={<Admin />} />

            {/* 사진 리뷰 */}
            <Route path="review" />

            {/* 채팅 신고 */}
            <Route path="chatreport" />

            {/* 프로필 신고 */}
            <Route path="profilereport" />

            {/* 할 말  있어요 */}
            <Route path="ask" />

            {/* 처리 내역 */}
            <Route path="result" />
        </Routes>
    );
};

export default AdminNavigator;