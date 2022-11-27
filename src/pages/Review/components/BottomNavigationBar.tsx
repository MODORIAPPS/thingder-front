import { TabItem, TabLayout, TabWrapper, Text } from "@/pages/Home/components/BottomNavigationBar";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";

type TabType = "admin/review" | "/admin/review/chat" | "/admin/review/profile" | "/admin/review/ask";

const BottomNavigationBar: React.FC = () => {

    const { tab: url } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState<TabType>(window.location.pathname as TabType);

    useEffect(() => {
        const target = tab === "admin/review" ? "" : tab;
        navigate(target);
    }, [tab]);

    return (
        <TabLayout>
            <TabWrapper onClick={() => setTab("admin/review")}>
                <TabItem>
                    <Text selected={tab === "admin/review"}>사진리뷰</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("/admin/review/chat")}>
                <TabItem>
                    <Text selected={tab === "/admin/review/chat"}>채팅신고</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("/admin/review/profile")}>
                <TabItem>
                    <Text selected={tab === "/admin/review/profile"}>프로필<br />신고</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("/admin/review/ask")}>
                <TabItem>
                    <Text selected={tab === "/admin/review/ask"}>할 말<br />있어요</Text>
                </TabItem>
            </TabWrapper>
        </TabLayout>
    );
};

export default BottomNavigationBar;