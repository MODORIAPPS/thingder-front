import React, { useEffect } from "react";
import Typography from "../../../../components/Typography";
import TinderCard from 'react-tinder-card'
import ItemCardBig from "./components/ItemCardBig";
import HomeFragTopBar from "./components/HomeFragTopBar";
import Spacing from "../../../../components/Spacing";
import styled from "@emotion/styled";
import ChooseButton from "./components/ChooseButton";

const HomeFragment: React.FC = () => {

    useEffect(() => {

    }, []);

    const onSwipe = (direction: any) => {
        console.log('You swiped: ' + direction)
    }

    const handleClickNegativeButton = () => { };
    const handleClickPositiveButton = () => { };

    return (
        <>
            <HomeFragTopBar />
            <Spacing.Vertical height={32} />

            <Container>
                <CardContainer>
                    <TinderCard
                        onSwipe={onSwipe}>
                        <ItemCardBig uid={""} nickname={"몰랑이"} name={""} madeIn={""} brand={""} madeAt={""} />
                    </TinderCard>
                </CardContainer>

                <ChooseButtonWrapper>
                    <ChooseButton.Negative onClick={handleClickNegativeButton} />
                    <Spacing.Horizontal width={65} />
                    <ChooseButton.Positive onClick={handleClickPositiveButton} />
                </ChooseButtonWrapper>
            </Container>
        </>
    )
};

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const CardContainer = styled.div`
    position: absolute;
    height: 700px;
`;

const ChooseButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export default HomeFragment;