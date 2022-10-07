import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import Typography from "../../../../components/Typography";
import AskToTalk from "./components/AskToTalkButton";
import Introduction from "./components/Introduction";
import MemberList from "./components/MemberList";
import TopBar from "./components/TopBar";
import AskToTalkModal from "./modal/AskToTalkModal";

const AboutFragment: React.FC = () => {

    const [modal, setModal] = useState(false);

    const handleClickShare = () => {
        alert("어떤 메시지 담을 건지 클라이언트분께 여쭈어봅시다.")
    }

    const handleClickAskToTalk = () => {
        setModal(true)
    };

    return (
        <div id="about-fragment">
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
            </Container>

            <AskToTalkModal open={modal} onClickBackButton={() => setModal(false)} />
        </div>
    );
};

const Container = styled.div`
    padding: 0 32px;
`;

export default AboutFragment;