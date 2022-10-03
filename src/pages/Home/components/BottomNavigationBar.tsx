import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spacing from "../../../components/Spacing";

// Disabled Icons
import ImgNavHomeDisabled from "../../../assets/icon/nav/nav_home_disabled.svg"
import ImgNavExploreDisabled from "../../../assets/icon/nav/nav_explore_disabled.svg";
import ImgNavChatDisabled from "../../../assets/icon/nav/nav_chat_disabled.svg";
import ImgNavAboutDisabled from "../../../assets/icon/nav/nav_about_disabled.svg";

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
                    <Icon src={ImgNavHomeDisabled} />
                    <Text>홈</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("explore")}>
                <TabItem>
                    <Icon src={ImgNavExploreDisabled} />
                    <Text>탐험</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("chat")}>
                <TabItem>
                    <Icon src={ImgNavChatDisabled} />
                    <Text>메시지</Text>
                </TabItem>
            </TabWrapper>
            <TabWrapper onClick={() => setTab("about")}>
                <TabItem>
                    <Icon src={ImgNavAboutDisabled} />
                    <Text>커틀러리</Text>
                </TabItem>
            </TabWrapper>
        </TabLayout>
    );
};

const TabLayout = styled.div`
    border-top: 1px solid #EFEFF0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 56px;

    background: white;
`;

const TabWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;

const Text = styled.p`
    margin-top: 6px;
    margin-bottom: 0;

    font-size: 12px;
    line-height: 16px;
    color: #858585;
`;

export default BottomNavigationBar;