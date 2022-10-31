import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Enabled Icons
import ImgNavAboutEnabled from "@/assets/icon/nav/nav_about_enabled.svg";
import ImgNavChatEnabled from "@/assets/icon/nav/nav_chat_enabled.svg";
import ImgNavExploreEnabled from "@/assets/icon/nav/nav_explore_enabled.svg";
import ImgNavHomeEnabled from "@/assets/icon/nav/nav_home_enabled.svg";

// Disabled Icons
import ImgNavAboutDisabled from "../../../assets/icon/nav/nav_about_disabled.svg";
import ImgNavChatDisabled from "../../../assets/icon/nav/nav_chat_disabled.svg";
import ImgNavExploreDisabled from "../../../assets/icon/nav/nav_explore_disabled.svg";
import ImgNavHomeDisabled from "../../../assets/icon/nav/nav_home_disabled.svg";

type TabType = "home" | "explore" | "chat" | "about";

const BottomNavigationBar: React.FC = () => {

    const navigate = useNavigate();
    const [tab, setTab] = useState<TabType>("home");

    useEffect(() => {
        const target = tab === "home" ? "" : tab;
        navigate(target);
    }, [tab]);

    return (
        <TabLayout>
            <TabWrapper onClick={() => setTab("home")}>
                <TabItem>
                    <Icon src={tab === "home" ? ImgNavHomeEnabled : ImgNavHomeDisabled} />
                    <Text selected={tab === "home"}>홈</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("explore")}>
                <TabItem>
                    <Icon src={tab === "explore" ? ImgNavExploreEnabled : ImgNavExploreDisabled} />
                    <Text selected={tab === "explore"}>탐험</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("chat")}>
                <TabItem>
                    <Icon src={tab === "chat" ? ImgNavChatEnabled : ImgNavChatDisabled} />
                    <Text selected={tab === "chat"}>메시지</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("about")}>
                <TabItem>
                    <Icon src={tab === "about" ? ImgNavAboutEnabled : ImgNavAboutDisabled} />
                    <Text selected={tab === "about"} style={{ color: (tab === "about") ? 'red' : "#858585" }}>커틀러리</Text>
                </TabItem>
            </TabWrapper>
        </TabLayout>
    );
};

export const TabLayout = styled.div`
    border-top: 1px solid #EFEFF0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    background: white;

    padding-top: 12px;
    padding-bottom: 7px;

    &:hover {
        cursor: pointer;
    }
`;

export const TabWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TabItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;

export const Text = styled.p<{ selected: boolean }>`
    margin-top: 6px;
    margin-bottom: 0;
    text-align: center;

    font-size: 12px;
    line-height: 16px;
    color: ${({ selected }) => selected ? "#404040" : "#858585"}
`;

export default BottomNavigationBar;