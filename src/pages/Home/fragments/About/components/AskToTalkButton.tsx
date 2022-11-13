import styled from "@emotion/styled";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    onClick: () => void;
}

const AskToTalk: React.FC<Props> = ({ onClick }) => {

    const { t } = useTranslation();

    return (
        <Container onClick={onClick}>
            <Wrapper>
                {t("about.asktotalk")}
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 32px;
    background-color: #DDF45B;

    padding: 9px;
`;

const Wrapper = styled.div`
    font-weight: bold;
    font-size: 18px;
`;


export default AskToTalk;