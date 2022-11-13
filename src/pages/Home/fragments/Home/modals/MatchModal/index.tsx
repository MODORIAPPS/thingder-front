import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { useState } from "react";
import MatchedEffect from "./MatchedEffect";
import MatchedItemCard from "./MatchedItemCard";
import SendMessageInput from "./SendMessageInput";
import TopBar from "./TopBar";
import Modal from 'react-modal';

interface Props {
    open: boolean;
    uid: string;

    nickname: string;
    name: string;
    madeIn: string;
    brand: string;

    genYear: number;
    genMonth: number;

    thumbnail_src: string;
    thubmnail_srcSet: string;

    handleClickClose: () => void;
 }

const MatchModal: React.FC<Props> = ({
    open,
    uid,
    nickname,
    name,
    madeIn,
    brand,
    genYear,
    genMonth,
    thumbnail_src,
    thubmnail_srcSet,
    handleClickClose
}) => {

    const [text, setText] = useState("");
    
    const handleClickSend = () => {

    };

    return (
        <Modal isOpen={open} style={styles}>
            <Container>
                <TopBar onClickClose={handleClickClose} />
                <Spacing.Vertical height={24} />
                <MatchedEffect />
                <Spacing.Vertical height={24} />
                <MatchedItemCard
                    nickname={nickname}
                    name={name}
                    madeIn={madeIn}
                    brand={brand}
                    genYear={genYear}
                    genMonth={genMonth}
                    thumbnail_src={thumbnail_src}
                    thubmnail_srcSet={thubmnail_srcSet}
                />
                <Spacing.Vertical height={16} />
                <SendMessageInput
                    onChangeText={(text) => setText(text)}
                    text={text}
                    onClickSend={handleClickSend}
                />
            </Container>
        </Modal>
    );
};

const styles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        inset: 0,
        width: '100%',
        height: 'calc(100%-70px)',
    }
}

const Container = styled.div`
    background-color: #FF5100;
    height: 100vh;
    box-sizing: border-box;
    padding: 0 18px;
`;

export default MatchModal;