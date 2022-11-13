import Typography from "@/components/Typography";
import styled from "@emotion/styled";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    onClick: () => void;
}

const SendCodeButton: React.FC<Props> = ({ onClick }) => {

    const { t } = useTranslation();

    return (
        <Container onClick={onClick}>
            <Typography.Caution2 style={{ fontWeight: 'normal' }}>{t("send_code")}</Typography.Caution2>
        </Container>
    );
};

const Container = styled.div`
    width: 100px;
    height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #FF5100;
    border-radius: 32px;

    color: white;

    transition: .2s;

    &:hover {
        background-color: #dd4600;
    }

    &:active {
        background-color: #dd4600;
    }
`;

export default SendCodeButton;