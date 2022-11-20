import styled from "@emotion/styled";
import React, { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";

// Enabled Icons
import ImgNavAboutEnabled from "@/assets/icon/nav/nav_about_enabled.svg";
import ImgNavChatEnabled from "@/assets/icon/nav/nav_chat_enabled.svg";
import ImgNavExploreEnabled from "@/assets/icon/nav/nav_explore_enabled.svg";
import ImgNavHomeEnabled from "@/assets/icon/nav/nav_home_enabled.svg";

// Disabled Icons
import ImgNavAboutDisabled from "@/assets/icon/nav/nav_about_disabled.svg";
import ImgNavChatDisabled from "@/assets/icon/nav/nav_chat_disabled.svg";
import ImgNavExploreDisabled from "@/assets/icon/nav/nav_explore_disabled.svg";
import ImgNavHomeDisabled from "@/assets/icon/nav/nav_home_disabled.svg";

import { useTranslation } from "react-i18next";

type TabType = "home" | "/home/explore" | "/home/chat" | "/home/about";

const BottomNavigationBar: React.FC = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [tab, setTab] = useState<TabType>(window.location.pathname as TabType);

    useEffect(() => {
        const target = tab === "home" ? "" : tab;
        navigate(target);
    }, [tab]);

    return (
        <TabLayout>
            <TabWrapper onClick={() => setTab("home")}>
                <TabItem>
                    <Icon src={tab === "home" ? ImgNavHomeEnabled : ImgNavHomeDisabled} />
                    <Text selected={tab === "home"}>{t("nav.home")}</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("/home/explore")}>
                <TabItem>
                    <Icon src={tab === "/home/explore" ? ImgNavExploreEnabled : ImgNavExploreDisabled} />
                    <Text selected={tab === "/home/explore"}>{t("nav.explore")}</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("/home/chat")}>
                <TabItem>
                    <Icon src={tab === "/home/chat" ? ImgNavChatEnabled : ImgNavChatDisabled} />
                    <Text selected={tab === "/home/chat"}>{t("nav.chat")}</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("/home/about")}>
                <TabItem>
                    <Icon src={tab === "/home/about" ? ImgNavAboutEnabled : ImgNavAboutDisabled} />
                    <Text selected={tab === "/home/about"} style={{ color: (tab === "/home/about") ? 'red' : "#858585" }}>{t("nav.cut")}</Text>
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