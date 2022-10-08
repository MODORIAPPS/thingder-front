import React, { useEffect, useState } from "react";
import Typography from "../../../../components/Typography";
import TinderCard from 'react-tinder-card'
import ItemCardBig, { image } from "./components/ItemCardBig";
import HomeFragTopBar from "./components/HomeFragTopBar";
import Spacing from "../../../../components/Spacing";
import styled from "@emotion/styled";
import ChooseButton from "./components/ChooseButton";
import { useRef } from "react";
import { API } from "./types";
import { ItemCardType } from "../Explore/components/ItemCard";
import ItemDetail from "@/pageModal/ItemDetail/ItemDetailModal";
import ItemDetailModal from "@/pageModal/ItemDetail/ItemDetailModal";

// https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js

const HomeFragment: React.FC = () => {

    const [itemList, setItemList] = useState<ItemCardType[]>([]);
    const cardRef = useRef<API>(null);

    const fetchItemList = useState()

    const onSwipe = (direction: any) => {
        console.log('You swiped: ' + direction)
    }

    const handleClickNegativeButton = () => { cardRef?.current?.swipe("left") };
    const handleClickPositiveButton = () => { cardRef?.current?.swipe("right") };

    return (
        <Screen>
            <HomeFragTopBar />
            <Spacing.Vertical height={24} />

            <Container>
                <CardContainer>
                    <TinderCard
                        className="slide"
                        ref={cardRef}
                        onSwipe={onSwipe}>
                        <ItemCardBig
                            uid={"asdfasdf"}
                            nickname={"몰랑이"}
                            name={"마약베게"}
                            madeIn={"중국"}
                            brand={"샤넬"}
                            madeAt={new Date().toString()}
                            thumbnail_src={image}
                            thubmnail_srcSet={image} />
                    </TinderCard>
                    <TinderCard
                        className="slide"
                        ref={cardRef}
                        onSwipe={onSwipe}>
                        <ItemCardBig
                            uid={"asdfasdf"}
                            nickname={"몰랑이"}
                            name={"마약베게"}
                            madeIn={"중국"}
                            brand={"샤넬"}
                            madeAt={new Date().toString()}
                            thumbnail_src={image}
                            thubmnail_srcSet={image} />
                    </TinderCard>
                </CardContainer>
                <Spacing.Vertical height={24} />
                <ChooseButtonWrapper>
                    <ChooseButton.Negative onClick={handleClickNegativeButton} />
                    <Spacing.Horizontal width={65} />
                    <ChooseButton.Positive onClick={handleClickPositiveButton} />
                </ChooseButtonWrapper>
            </Container>

            <ItemDetailModal />
        </Screen>
    );
};

interface Props {

}

const Screen = styled.div`
    overflow: hidden;
    height: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const CardContainer = styled.div`
    /* position: absolute; */
    /* height: 700px; */
    padding: 0 12px;
    box-sizing: border-box;
    height: 520px;
    position: relative;
`;

const ChooseButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 80px;
`;

export default HomeFragment;