import api from "@/api";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { closeMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from 'react-modal';
import ImgShare from "@/assets/icon/share_white.svg";
import Spacing from "@/components/Spacing";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { ChooseButtonWrapper } from "@/pages/Home/fragments/Home/HomeFragment";
import ChooseButton from "@/pages/Home/fragments/Home/components/ChooseButton";
import { useTranslation } from "react-i18next";
import ManufacturedDateView from "@/components/ManufacturedDateView";
import "./card.css"
import ActionBar from "./components/ActionBar";
import 'react-awesome-slider/dist/styles.css';
import AwesomeSlider from "react-awesome-slider";
import SimpleImageSlider from "react-simple-image-slider";
import { Direction } from "@/pages/Home/fragments/Home/types";
import MatchModal from "@/pages/Home/fragments/Home/modals/MatchModal";
import { useNavigate } from "react-router-dom";

export const RELATION = {
    BLOCK: "BLOCK",
    DISLIKE: "DISLIKE",
    LIKE: "LIKE"
}

interface Props {
    swipe?: (dir: Direction) => void;
}

/**
 * Member Detail
 */
const ItemDetailModal: React.FC<Props> = ({ swipe }) => {

    const { t } = useTranslation();

    const [matched, setMatched] = useState(false);
    const [chatUid, setChatUid] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const uid = useAppSelector(state => state.ui.memberDetailUid);
    const open = useAppSelector(state => state.ui.memberDetailModalVisible);

    const ref = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<MemberDetail>();

    const fetchData = async () => {
        const { data } = await api.main.get<MemberDetail>("/member/" + uid);
        setData(data);
    };

    const handleClickBackButton = () => dispatch(closeMemberDetailAction());

    const handleClickShare = () => {
        window.navigator.share({
            url: "https://thingder.app/share/" + uid,
            title: data?.nickname
        });
    }

    const handleClickNegativeButton = async () => {
        const { data } = await api.main.post<MatchingPickResponse>("/matching/pick", {
            relation: RELATION.DISLIKE,
            uid,
        });

        const cards = document.querySelectorAll(".tinder--card:not(.removed)");
        const moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        const card = cards[0];

        card.classList.add("removed");
        (card as any).style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        swipe && swipe("left")
        setTimeout(() => {
            handleClickBackButton();
        }, 300);
    };

    const handleClickPositiveButton = async () => {
        const { data } = await api.main.post<MatchingPickResponse>("/matching/pick", {
            relation: RELATION.LIKE,
            uid,
        });

        if (data.match && !swipe) {
            setMatched(data.match);
            setChatUid(data.chatUid);
            return;
        }

        const cards = document.querySelectorAll(".tinder--card:not(.removed)");
        const moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;

        const card = cards[0];

        card.classList.add("removed");
        (card as any).style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
        swipe && swipe("right");
        setTimeout(() => {
            handleClickBackButton();
        }, 300);
    };

    useEffect(() => {
        if (uid) {
            fetchData();

            const tinderCard = window.document.getElementsByClassName("tinder-card")[0];
            tinderCard
                ?.removeEventListener("touchmove", () => { console.log("removed!") });
        } else {
            setData(undefined)
        }
    }, [uid]);

    const itemImages = useMemo(() => {
        let images = [];
        images = data?.images
            ? data?.images.map(image => ({
                url: image.src,
            }))
            : [];

        return images;
    }, [data?.images, uid]);

    return (
        <Modal className={"tinder--card"} isOpen={open} style={styles}>

            <ActionBar
                handleClickGuard={() => {
                    console.log(uid);
                    navigate(uid)
                }}
                handleClickClose={handleClickBackButton} />

            {/* 슬라이드 가능하게 */}
            <PrsentImageWrapper>
                {
                    itemImages.length > 0 &&
                    <SimpleImageSlider
                        key={uid}
                        width={'100%'}
                        height={375}
                        images={itemImages}
                        showBullets={true} showNavs={false} />
                }

                {/* 공유 버튼 */}
                <ShareIcon onClick={handleClickShare} src={ImgShare} />

                {/* 선택 버튼 */}
                <ChooseButtonWrapper style={{ position: "absolute", bottom: 32, left: 0, right: 0 }}>
                    <ChooseButton.Negative onClick={handleClickNegativeButton} />
                    <Spacing.Horizontal width={65} />
                    <ChooseButton.Positive onClick={handleClickPositiveButton} />
                </ChooseButtonWrapper>
            </PrsentImageWrapper>

            <Spacing.Vertical height={24} />
            <Container>
                <Typography.Header1>{data?.nickname}</Typography.Header1>
                <p className="self-end text-sm text-end font-bold">{data?.type}</p>
                <p className="mt-2"></p>
                {/* 제조년도, 제조국, 브랜드 */}
                <ManufacturedDateView slateColor={true} genYear={data?.genYear ?? 0} genMonth={data?.genMonth ?? 0} />
                <p className="text-sm text-slate-500 mt-1 font-normal">{t("detail.country")} : {data?.genCountry}</p>
                <p className="text-sm text-slate-500 mt-1 font-normal">{t("detail.brand")} : {data?.brand}</p>

                <Divider />

                {/* 이모지로 말해요 */}
                {/* <SubTitle>{t("detail.talk_with_emoji")}</SubTitle> */}
                <Spacing.Vertical height={8} />
                <Content>
                    {data?.story}
                </Content>

                {/* 다섯개 태그 */}
                <Divider />
                <Content>{data?.tag.split(",").map(t => `#${t} `)}</Content>
                <Divider />

                {/* 저에 대한 이야기 */}
                {/* <SubTitle>{t("detail.about_me")}</SubTitle> */}
                <Spacing.Vertical height={8} />
                <Content>
                    {data?.description}
                </Content>

                <Spacing.Vertical height={42} />
            </Container>

            {
                data &&
                <MatchModal
                    open={matched}
                    handleClickClose={() => setMatched(false)}
                    chatRoomUid={chatUid}
                    nickname={data.nickname}
                    name={data.nickname}
                    madeIn={data.genCountry}
                    brand={data.brand}
                    genYear={data.genYear}
                    genMonth={data.genMonth}
                    thumbnail_src={data?.images[0]?.src ?? ""}
                    thubmnail_srcSet={data?.images[0]?.srcSet ?? ""}
                />
            }
        </Modal>
    );
};

const styles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: "100%",
    }
}

export interface MatchingPickResponse {
    match: boolean;
    chatUid: string;
}

export interface MemberDetail {
    uid: string;
    images: { uid: string; src: string; srcSet: string }[];
    nickname: string;
    type: string;
    genYear: number;
    genMonth: number;
    genCountry: string;
    brand: string;
    tag: string;
    description: string;
    story: string;
}

export const Container = styled.div`
    box-sizing: border-box;
    padding: 0 40px;
`;

export const PrsentImageWrapper = styled.div`
    position: relative;
`;

export const PresentImage = styled.img`
    width: 100%;
    height: 375px;

    object-fit: cover;
`;

export const ShareIcon = styled.img`
    position: absolute;
    top: 12px;
    right: 12px;

    width: 24px;
    height: 24px;
`;

export const SubTitle = styled.span`
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: rgba(0,0,0,0.75);
    display: block;
`;

export const Content = styled.span`
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0,0,0,0.75);
    display: block;
`;

export const Divider = styled.div`
    height: 1px;
    background-color: rgba(0, 0, 0, 0.05);

    margin: 12px 0;
`;

export const BottomWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const BottomPropertyDivider = styled.div`
    width: 2px;
    height: 16px;
    background-color: #26C485;
    margin: 0 10px;
`;

export const BottomProperty = styled.span`
    font-size: 0.875rem;
    line-height: 1.125;
    font-weight: 400;
    color: rgba(0,0,0,0.75);
`;

export default ItemDetailModal;