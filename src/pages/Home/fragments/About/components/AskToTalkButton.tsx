import styled from "@emotion/styled";
import React from "react";

interface Props {
    onClick: () => void;
}

const AskToTalk: React.FC<Props> = ({ onClick }) => {
    return (
        <Container onClick={onClick}>
            <Wrapper>
                할 말 있어요  💬
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