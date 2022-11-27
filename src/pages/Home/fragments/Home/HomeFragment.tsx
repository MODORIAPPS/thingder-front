import api from "@/api";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useDebounce from "@/hooks/useDebounce";
import ItemDetailModal from "@/pageModal/ItemDetail/ItemDetailModal";
import { showMemberDetailAction } from "@/store/ui/ui.reducer";
import ChatRoomAction from "@/utils/db";
import styled from "@emotion/styled";
import { configureStore } from "@reduxjs/toolkit";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from 'react-tinder-card';
import Spacing from "../../../../components/Spacing";
import { ItemCardType } from "../Explore/components/ItemCard";
import AlreadyRead from "./components/AlreadyRead";
import ChooseButton from "./components/ChooseButton";
import HomeFragTopBar from "./components/HomeFragTopBar";
import ItemCardBig from "./components/ItemCardBig";
import usePick from "./hooks/usePick";
import MatchModal from "./modals/MatchModal";
import MyPage from "./modals/MyPageModal/MyPageModal";
import { API, Direction } from "./types";

interface ItemListResponse {
    members: ItemCardType[];
}

const HomeFragment: React.FC = () => {

    const [isOffline, setIsOffline] = useState(false);

    /** MyPage Modal */
    const [myPage, setMyPage] = useState(false);

    const dispatch = useAppDispatch();
    const [itemList, setItemList] = useState<ItemCardType[]>([]);
    const [matched, setMatched] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(itemList.length - 1);
    const [direction, setDirection] = useState<Direction>();
    const currentIndexRef = useRef(currentIndex);

    const debouncedDirection = useDebounce({ value: direction, delay: 0 });

    const canSwipe = currentIndex >= 0;

    const userUid = useAppSelector(state => state.user.data?.uid);

    const [chatRoomUid, setChatRoomUid] = useState("");


    useEffect(() => {
        fetchItemList();
    }, []);

    useEffect(() => {
        if (itemList.length > 0) {
            setCurrentIndex(itemList.length - 1)
        }
    }, [itemList]);

    const childRefs = useMemo(
        () =>
            Array(itemList.length)
                .fill(0)
                .map((i) => React.createRef<API>()),
        [itemList]
    );


    const swiped = (direction: Direction, index: number) => {
        console.log(direction, index)
        setDirection(undefined);
        const uid = itemList[index].uid;
        updateCurrentIndex(index - 1);
        usePick(uid, direction).then(({ data }) => {
            if (data.match) {
                console.log('userUid', userUid)
                const item = itemList[index];
                ChatRoomAction.createNewChatRoom(
                    userUid ?? "",
                    data.chatUid,
                    item.nickname,
                    item.image?.src ?? "",
                    item.image?.srcSet ?? ""
                );
                setMatched(true);
                setChatRoomUid(data.chatUid);
            }
        });
    }

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const fetchItemList = async () => {
        setItemList([]);
        const { data } = await api.main.get<ItemListResponse>("/matching/");
        setItemList(data.members.filter(item => item.nickname));
        // setItemList(sampleData);
    };

    const handleClickNegativeButton = () => { swipe("left") };
    const handleClickPositiveButton = () => { swipe("right") };

    const handleClickInfo = (uid: string) => {
        dispatch(showMemberDetailAction(uid));
    };

    const swipe = async (dir: Direction) => {
        if (canSwipe && currentIndex < itemList.length) {
            await childRefs[currentIndex]?.current?.swipe(dir)
        }
    };

    const handleBeforeSwipe = (direction: Direction) => {
        setDirection(direction);
    };

    useEffect(() => {
        if (debouncedDirection) {
            setDirection(debouncedDirection)
        }
    }, [debouncedDirection]);

    useEffect(() => {
        if (currentIndex === -1) {
            // setItemList([]);
        }
    }, [currentIndex]);

    return (
        <Screen>
            <HomeFragTopBar handleClickRedCut={() => setMyPage(true)} />
            <Spacing.Vertical height={24} />

            {
                isOffline ?
                    <span>Offline mode...</span>
                    :
                    <>
                        {currentIndex > -1
                            ?
                            <Container>
                                <CardContainer>
                                    {
                                        itemList.map((item, index) =>
                                            <TinderCard
                                                key={item.uid}
                                                className="slide"
                                                ref={childRefs[index]}
                                                onSwipeRequirementFulfilled={handleBeforeSwipe}
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
                                                    thumbnail_src={item.image?.src}
                                                    thubmnail_srcSet={item.image?.srcSet}
                                                    isCursor={currentIndex === index}
                                                    currentDirection={debouncedDirection}
                                                />
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
                            :
                            <AlreadyRead onClickRefetch={fetchItemList} />
                        }
                    </>

            }

            <ItemDetailModal />

            {
                itemList[currentIndex+1] &&
                <MatchModal
                    open={matched}
                    handleClickClose={() => setMatched(false)}
                    chatRoomUid={chatRoomUid}
                    nickname={itemList[currentIndex+1].nickname}
                    name={itemList[currentIndex+1].nickname}
                    madeIn={itemList[currentIndex+1].genCountry}
                    brand={itemList[currentIndex+1].brand}
                    genYear={itemList[currentIndex+1].genYear}
                    genMonth={itemList[currentIndex+1].genMonth}
                    thumbnail_src={itemList[currentIndex+1]?.image?.src ?? ""}
                    thubmnail_srcSet={itemList[currentIndex+1]?.image?.srcSet ?? ""}
                />
            }

            <MyPage
                uid={userUid ?? ""}
                open={myPage}
                setOpen={setMyPage} />
        </Screen>
    );
};

export const Screen = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CardContainer = styled.div`
    /* position: absolute; */
    /* height: 700px; */
    padding: 0 12px;
    box-sizing: border-box;
    height: 520px;
    position: relative;

    @media (min-height: 500px) {
        height: 300px;
    }

    @media (min-height: 600px) {
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