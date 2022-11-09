import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { useState } from "react";
import MatchedEffect from "./MatchedEffect";
import MatchedItemCard from "./MatchedItemCard";
import SendMessageInput from "./SendMessageInput";
import TopBar from "./TopBar";

const MatchModal: React.FC = () => {

    const [text, setText] = useState("");

    const handleClickClose = () => { };

    const handleClickSend = () => {

    };

    return (
        <Container>
            <TopBar onClickClose={handleClickClose} />
            <Spacing.Vertical height={24} />
            <MatchedEffect />
            <Spacing.Vertical height={24} />
            <MatchedItemCard
                nickname={"미야오옹"}
                name={"고양이 주전자"}
                madeIn={"중국"}
                brand={"구찌"}
                genYear={2013}
                genMonth={6}
                thumbnail_src={"https://newsimg.sedaily.com/2020/12/01/1ZBIJQNGIG_1.jpg"}
                thubmnail_srcSet={"https://newsimg.sedaily.com/2020/12/01/1ZBIJQNGIG_1.jpg"}
            />
            <Spacing.Vertical height={16} />
            <SendMessageInput
                onChangeText={(text) => setText(text)}
                text={text}
                onClickSend={handleClickSend}
            />
        </Container>
    );
};

const Container = styled.div`
    background-color: #FF5100;
    height: 100%;
    box-sizing: border-box;
    padding: 0 18px;
`;

export default MatchModal;