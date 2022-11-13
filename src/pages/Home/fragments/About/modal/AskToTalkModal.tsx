import ActionBar from "@/components/ActionBar";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';

interface Props {
    open: boolean;
    onClickBackButton: () => void;
}

const AskToTalkModal: React.FC<Props> = ({ open, onClickBackButton }) => {

    const { t } = useTranslation();
    const [value, setValue] = useState("");

    const handleClickSend = async () => {
        
    };

    return (
        <Modal
            isOpen={open}
            style={modalStyles}>
            <Container>
                <ActionBar onClickBackButton={onClickBackButton} />
                <Spacing.Vertical height={12} />
                <Body>
                    <Description>{t("about.placeholder")}</Description>
                    <TextArea value={value} onChange={e => setValue(e.target.value)} />
                    <Spacing.Vertical height={36} />
                    <Button onClick={handleClickSend}>
                        {t("about.send")}
                    </Button>
                </Body>
            </Container>
        </Modal>
    );
};

export const modalStyles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        inset: 0,
        width: '100%',
        height: 'calc(100%-70px)',
    }
};

const Body = styled.div`
    padding: 0 30px;
    box-sizing: border-box;
`;

export const TextArea = styled.textarea`
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