import api from "@/api";
import { useAppDispatch } from "@/hooks/redux";
import ItemDetailModal from "@/pageModal/ItemDetail/ItemDetailModal";
import { showMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from 'react-tinder-card';
import Spacing from "../../../../components/Spacing";
import { ItemCardType } from "../Explore/components/ItemCard";
import ChooseButton from "./components/ChooseButton";
import HomeFragTopBar from "./components/HomeFragTopBar";
import ItemCardBig from "./components/ItemCardBig";
import { API, Direction } from "./types";

interface ItemListResponse {
    members: ItemCardType[];
}

const HomeFragment: React.FC = () => {

    const dispatch = useAppDispatch();
    const [itemList, setItemList] = useState<ItemCardType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(itemList.length - 1)
    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(itemList.length)
                .map((i) => React.createRef<API>()),
        [itemList]
    )

    const swiped = (direction: Direction, index: number) => {
        updateCurrentIndex(index - 1)
    }

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const fetchItemList = async () => {
        const { data } = await api.main.get<ItemListResponse>("/matching/");
        setItemList(data.members);
    };

    const handleClickNegativeButton = () => { swipe("left") };
    const handleClickPositiveButton = () => { swipe("right") };

    const handleClickInfo = (uid: string) => {
        console.log('fawfe');
        dispatch(showMemberDetailAction(uid));
    }

    useEffect(() => {
        fetchItemList();
    }, []);

    const canSwipe = currentIndex >= 0;

    console.log(canSwipe);

    const swipe = async (dir: Direction) => {
        if (canSwipe && currentIndex < itemList.length) {
            await childRefs[currentIndex]?.current?.swipe(dir)
        }
    }

    return (
        <Screen>
            <HomeFragTopBar />
            <Spacing.Vertical height={24} />

            <Container>
                <CardContainer>
                    {
                        itemList.map((item, index) =>
                            <TinderCard
                                key={item.uid}
                                className="slide"
                                ref={childRefs[index]}
                                onSwipe={(dir) => swiped(dir, index)}>
                                <ItemCardBig
                                    onClickInfo={handleClickInfo}
                                    uid={item.uid}
                                    nickname={item.nickname}
                                    name={item.nickname}
                                    madeIn={item.genCountry}
                                    brand={item.brand}
                                    genYear={item.genYear}
                                    genMonth={item.genMonth}
                                    thumbnail_src={item.image.src}
                                    thubmnail_srcSet={item.image.srcSet} />
                            </TinderCard>
                        )
                    }
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

const Screen = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
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

    @media (max-height: 600px) {
        height: 400px;
    }
`;

export const ChooseButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 80px;
`;

export default HomeFragment;