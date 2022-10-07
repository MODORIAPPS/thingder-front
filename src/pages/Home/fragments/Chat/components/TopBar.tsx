import styled from "@emotion/styled";
import React from "react";
import ImgThingderLogo from "@/assets/logo/thingder_logo_actionbar.png";

const TopBar: React.FC = () => {
    return (
        <Container>
            <ThingderLogo src={ImgThingderLogo} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 56px;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ThingderLogo = styled.img`
    width: 78px;
    height: 25px;
    object-fit: contain;
`;

export default TopBar;