import Button from "@/components/Button";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import styled from "@emotion/styled";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    onClickRefetch: () => void;
}

const AlreadyRead: React.FC<Props> = ({ onClickRefetch }) => {

    const { t } = useTranslation();

    return (
        <Container>
            <Typography.Subtitle2 style={{ alignItems: "center", textAlign: "center", margin: "0 auto", display: "block" }}>
                {t("already.text1")}<br />
                {t("already.text2")}
            </Typography.Subtitle2>
            <Spacing.Vertical height={32} />
            <Button onClick={onClickRefetch} text={t("already.btn")} />
        </Container>
    );
};

const Container = styled.div`
    margin: 0 auto;
    background: white;
`;

export default AlreadyRead;