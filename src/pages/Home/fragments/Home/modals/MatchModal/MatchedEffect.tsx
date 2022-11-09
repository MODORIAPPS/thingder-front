import React from "react";

/** Images */
import ItsImg from "@/assets/matched/its.png";
import MatchedImg from "@/assets/matched/matched.png";
import styled from "@emotion/styled";

const MatchedEffect: React.FC = () => {
    return (
        <Container>
            <Its src={ItsImg} />
            <Matched src={MatchedImg} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Its = styled.img`
    height: 55px;
`;

const Matched = styled.img`
    height: 87px;
`;

export default MatchedEffect;