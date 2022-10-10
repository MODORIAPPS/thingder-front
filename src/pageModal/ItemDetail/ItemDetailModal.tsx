import api from "@/api";
import ActionBar from "@/components/ActionBar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { closeMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import ImgShare from "@/assets/icon/share_white.svg";
import Spacing from "@/components/Spacing";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { ChooseButtonWrapper } from "@/pages/Home/fragments/Home/HomeFragment";
import ChooseButton from "@/pages/Home/fragments/Home/components/ChooseButton";
import { toast } from "react-toastify";

export const RELATION = {
    BLOCK: "BLOCK",
    DISLIKE: "DISLIKE",
    LIKE: "LIKE"
}

/**
 * Member Detail
 */
const ItemDetailModal: React.FC = () => {

    const dispatch = useAppDispatch();
    const uid = useAppSelector(state => state.ui.memberDetailUid);
    const open = useAppSelector(state => state.ui.memberDetailModalVisible);

    const [data, setData] = useState<MemberDetail>();

    const fetchData = async () => {
        const { data } = await api.main.get<MemberDetail>("/member/" + uid);
        setData(data);
    };

    const handleClickBackButton = () => dispatch(closeMemberDetailAction());

    const handleClickShare = () => alert("어떤 내용을 공유할까요?");

    const handleClickNegativeButton = async () => {
        const { data } = await api.main.post<MatchingPickResponse>("/matching/pick", {
            relation: RELATION.DISLIKE,
            uid,
        });
        toast("맘에 들지 않으셨군요!")
        console.log(data);
    };

    const handleClickPositiveButton = async () => {
        const { data } = await api.main.post<MatchingPickResponse>("/matching/pick", {
            relation: RELATION.LIKE,
            uid,
        });
        toast("맘에 드셨군요!");
        console.log(data);
    };


    useEffect(() => {
        if (uid) {
            fetchData();
        }
    }, [uid]);

    if (!data) return <span></span>

    return (
        <Modal isOpen={open} style={styles}>
            <ActionBar onClickBackButton={handleClickBackButton} />

            {/* 슬라이드 가능하게 */}
            <PrsentImageWrapper>
                <PresentImage src={data.images[0].src} />

                {/* 공유 버튼 */}
                <ShareIcon onClick={handleClickShare} src={ImgShare} />

                {/* 선택 버튼 */}
                <ChooseButtonWrapper style={{ position: "absolute", bottom: 32, left: 0, right: 0 }}>
                    <ChooseButton.Negative onClick={handleClickNegativeButton} />
                    <Spacing.Horizontal width={65} />
                    <ChooseButton.Positive onClick={handleClickPositiveButton} />
                </ChooseButtonWrapper>
            </PrsentImageWrapper>

            <Spacing.Vertical height={16} />
            <Container>
                <Stack.Horizontal style={{ alignItems: "flex-end" }}>
                    <Typography.Header1>{data.nickname}</Typography.Header1>
                    <Typography.Caution1>{data.genYear}년 {data.genMonth}월 제조</Typography.Caution1>
                </Stack.Horizontal>
                <Stack.Vertical style={{ alignItems: "flex-end" }}>
                    <Content>{data.brand}</Content>
                    <BottomWrapper>
                        <BottomProperty>제조국: {data.genCountry}</BottomProperty>
                        <BottomPropertyDivider />
                        <BottomProperty>브랜드: {data.brand}</BottomProperty>
                    </BottomWrapper>
                </Stack.Vertical>

                {/* 다섯개 태그 */}
                <Divider />
                <Content>{data.tag}</Content>
                <Divider />

                {/* 이모지로 말해요 */}
                <SubTitle>이모지로 말해요</SubTitle>
                <Spacing.Vertical height={8} />
                <Content>
                    {data.description}
                </Content>

                <Divider />

                {/* 저에 대한 이야기 */}
                <SubTitle>저에 대한 이야기</SubTitle>
                <Spacing.Vertical height={8} />
                <Content>
                    {data.story}
                </Content>
            </Container>
        </Modal>
    );
};

const styles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        inset: 0,
        width: '100%',
        height: 'calc(100%-70px)',
    }
}

interface MatchingPickResponse {
    match: boolean;
    member: MemberDetail;
}

interface MemberDetail {
    uid: string;
    images: { uid: string; src: string; srcSet: string }[];
    nickname: string;
    type: string;
    genYear: number;
    genMonth: number;
    genCountry: number;
    brand: string;
    tag: string;
    description: string;
    story: string;
}

const Container = styled.div`
    box-sizing: border-box;
    padding: 0 40px;
`;

const PrsentImageWrapper = styled.div`
    position: relative;
`;

const PresentImage = styled.img`
    width: 100%;
    height: 375px;

    object-fit: cover;
`;

const ShareIcon = styled.img`
    position: absolute;
    top: 12px;
    right: 12px;

    width: 24px;
    height: 24px;
`;

const SubTitle = styled.span`
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: rgba(0,0,0,0.75);
    display: block;
`;

const Content = styled.span`
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0,0,0,0.75);
    display: block;
`;

const Divider = styled.div`
    height: 1px;
    background-color: rgba(0, 0, 0, 0.05);

    margin: 12px 0;
`;

const BottomWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BottomPropertyDivider = styled.div`
    width: 2px;
    height: 16px;
    background-color: #26C485;
    margin: 0 10px;
`;

const BottomProperty = styled.span`
    font-size: 0.875rem;
    line-height: 1.125;
    font-weight: 400;
    color: rgba(0,0,0,0.75);
`;

export default ItemDetailModal;