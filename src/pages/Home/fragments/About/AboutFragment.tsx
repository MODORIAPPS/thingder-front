import Button from "@/components/Button";
import Spacing from "@/components/Spacing";
import { useAppDispatch } from "@/hooks/redux";
import { signOutUser } from "@/store/user/user.reducer";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AskToTalk from "./components/AskToTalkButton";
import Introduction from "./components/Introduction";
import MemberList from "./components/MemberList";
import TopBar from "./components/TopBar";
import AskToTalkModal from "./modal/AskToTalkModal";

const AboutFragment: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    const handleClickShare = () => {
        alert("어떤 메시지 담을 건지 클라이언트분께 여쭈어봅시다.")
    }

    const handleClickAskToTalk = () => {
        setModal(true)
    };

    const handleClickSignOut = () => {
        const confirm = window.confirm("로그아웃하시겠어요?");
        if (confirm) {
            dispatch(signOutUser());
            navigate("/");
        }
    };

    return (
        <Screen id="about-fragment">
            <TopBar onClickShare={handleClickShare} />
            <Spacing.Vertical height={24} />

            <Container>
                {/* 멤버 리스트 */}
                <MemberList />
                <Spacing.Vertical height={32} />

                {/* 할 말 있어요 버튼 */}
                <AskToTalk onClick={handleClickAskToTalk} />

                {/* 레드 커틀러리 설명 */}
                <Spacing.Vertical height={40} />
                <Introduction />

                <Spacing.Vertical height={40} />

                <Button text="로그아웃" onClick={handleClickSignOut} />

                <Spacing.Vertical height={24} />
            </Container>

            <AskToTalkModal open={modal} onClickBackButton={() => setModal(false)} />
        </Screen>
    );
};

const Screen = styled.div`
    box-sizing: border-box;
    height: 100%;
`;

const Container = styled.div`
    padding: 0 32px;
    overflow-y: scroll;
`;

export default AboutFragment;