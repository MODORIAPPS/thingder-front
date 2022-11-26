import { AdminMemberDTO, MemberDTO } from "@/@types/Member";
import api from "@/api";
import Spacing from "@/components/Spacing";
import { useAppDispatch } from "@/hooks/redux";
import useDebounce from "@/hooks/useDebounce";
import ItemDetailModal from "@/pageModal/ItemDetail/ItemDetailModal";
import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import { ItemCardType, sampleData } from "@/pages/Home/fragments/Explore/components/ItemCard";
import AlreadyRead from "@/pages/Home/fragments/Home/components/AlreadyRead";
import ChooseButton from "@/pages/Home/fragments/Home/components/ChooseButton";
import ItemCardBig from "@/pages/Home/fragments/Home/components/ItemCardBig";
import { CardContainer, ChooseButtonWrapper, Container } from "@/pages/Home/fragments/Home/HomeFragment";
import { API, Direction } from "@/pages/Home/fragments/Home/types";
import { showMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TinderCard from "react-tinder-card";
import RemainedReviewCount from "../components/RemainedReviewCount";

const PhotoFragment: React.FC = () => {

    const navigate = useNavigate();

    const handleClickBack = () => navigate("/admin");

    const dispatch = useAppDispatch();
    const [itemList, setItemList] = useState<AdminMemberDTO[]>([]);
    const [matched, setMatched] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(itemList.length - 1);
    const [direction, setDirection] = useState<Direction>();
    const currentIndexRef = useRef(currentIndex);

    const debouncedDirection = useDebounce({ value: direction, delay: 300 });

    const canSwipe = currentIndex >= 0;

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
        const uid = itemList[index].uid;
        setDirection(direction);
        updateCurrentIndex(index - 1);
        if (direction === "left") {
            // 밴처리
            api.main.post("/admin/" + uid, { status: "BANNED" }).then(res => {
                alert('밴처리 되었습니다!');
            });
        }
    }

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const fetchItemList = async () => {
        const { data } = await api.main.get<{ members: AdminMemberDTO[] }>("/admin/members");
        setItemList(data.members);
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
            setItemList([]);
        }
    }, [currentIndex]);

    return (
        <Container1>
            <AdminActionBar onClickBackButton={handleClickBack} />
            <RemainedReviewCount>남은 리뷰 건수: {itemList.length - currentIndex}개</RemainedReviewCount>
            <Spacing.Vertical height={24} />

            <>
                {currentIndex > -1
                    ?
                    <Container>
                        <CardContainer>
                            {
                                itemList?.filter(item => item.nickname).map((item, index) =>
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
                                            thumbnail_src={item.image.src}
                                            thubmnail_srcSet={item.image.srcSet}
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
            <ItemDetailModal />
        </Container1>
    );
};

const Container1 = styled.div`
    display: flex;
    flex-direction: column;
`;

export default PhotoFragment;