import ActionBar from "@/components/ActionBar";
import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { useState } from "react";
import Modal from 'react-modal';

interface Props {
    open: boolean;
    onClickBackButton: () => void;
}

const AskToTalkModal: React.FC<Props> = ({ open, onClickBackButton }) => {

    const [value, setValue] = useState("");

    const handleClickSend = async () => {
        alert("곧 완성됩니다.");
    };

    return (
        <Modal
            isOpen={open}
            style={styles}>
            <ActionBar onClickBackButton={onClickBackButton} />
            <Spacing.Vertical height={12} />
            <Container>
                <Description>레드커틀러리들에게 하고 싶은 말을 적어 보아요</Description>
                <Body value={value} onChange={e => setValue(e.target.value)}/>
                <Spacing.Vertical height={36} />
                <Button onClick={handleClickSend}>
                    보내기
                </Button>
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
    padding: 0 30px;
    box-sizing: border-box;
`;

const Body = styled.textarea`
    border: none;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    background: rgba(233, 233, 233, 0.5);
    border-radius: 20px;
    min-height: 400px;

    padding: 14px 20px;

    font-weight: 400;
    white-space: pre-wrap;

    max-height: 500px;

    overflow-y: scroll;

    color: grey;

    &:active {
        border: none;
        outline: none;
    }
`;

const Description = styled.p`
    text-align: center;
    color: #424242;
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 700;
`;

const Button = styled.div`
    background-color: #DDF45B;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 53px;

    font-weight: 700;
    color: #404040;
    text-align: center;
`;

export default AskToTalkModal;