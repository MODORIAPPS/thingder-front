import { TabItem, TabLayout, TabWrapper, Text } from "@/pages/Home/components/BottomNavigationBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TabType = "photo" | "chat" | "profile" | "ask";

const BottomNavigationBar: React.FC = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<TabType>("photo");

    useEffect(() => {
        const target = tab === "photo" ? "" : tab;
        navigate(target);
    }, [tab]);

    return (
        <TabLayout>
            <TabWrapper onClick={() => setTab("photo")}>
                <TabItem>
                    <Text selected={tab === "photo"}>사진리뷰</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("chat")}>
                <TabItem>
                    <Text selected={tab === "chat"}>채팅신고</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("profile")}>
                <TabItem>
                    <Text selected={tab === "profile"}>프로필<br />신고</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("ask")}>
                <TabItem>
                    <Text selected={tab === "ask"}>할 말<br />있어요</Text>
                </TabItem>
            </TabWrapper>
        </TabLayout>
    );
};

export default BottomNavigationBar;