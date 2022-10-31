import ActionBar from "@/components/ActionBar";
import Admin from "@/pages/Admin/Admin";
import AskFragment from "@/pages/Review/fragments/AskFragment";
import ChatFragment from "@/pages/Review/fragments/ChatFragment";
import PhotoFragment from "@/pages/Review/fragments/PhotoFragment";
import ProfileFragment from "@/pages/Review/fragments/ProfileFragment";
import Review from "@/pages/Review/Review";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminNavigator: React.FC = () => {
    return (
        <Routes>
            {/* 어드민 홈  */}
            <Route index element={<Admin />} />

            <Route path="review" element={<Review />}>
                {/* 사진 리뷰 */}
                <Route index element={<PhotoFragment />} />

                {/* 채팅 신고 */}
                <Route path="chat" element={<ChatFragment />} />

                {/* 프로필 신고 */}
                <Route path="profile" element={<ProfileFragment />} />

                {/* 할 말  있어요 */}
                <Route path="ask" element={<AskFragment />} />
            </Route>
        </Routes>
    );
};

export default AdminNavigator;