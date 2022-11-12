import api from "@/api";
import ActionBar from "@/components/ActionBar";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Button from "@/pages/Home/fragments/Chat/components/Button";
import { closeMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

export const RELATION = {
    BLOCK: "BLOCK",
    DISLIKE: "DISLIKE",
    LIKE: "LIKE"
}

/**
 * Admin Member Detail
 */
const AdminItemDetailModal: React.FC = () => {

    const dispatch = useAppDispatch();
    const uid = useAppSelector(state => state.ui.memberDetailUid);
    const open = useAppSelector(state => state.ui.memberDetailModalVisible);

    const [data, setData] = useState<MemberDetail>();

    const fetchData = async () => {
        const { data } = await api.main.get<MemberDetail>("/member/" + uid);
        setData(data);
    };

    const handleClickBackButton = () => dispatch(closeMemberDetailAction());

    const handleClickNegativeButton = async () => {
        await api.main.post(`/admin/report/profile/${uid}`, {
            status: "BAN"
        });
        alert("밴 처리되었습니다.")
    };

    const handleClickPositiveButton = () => handleClickBackButton();

    useEffect(() => {
        if (uid) {
            fetchData();
        }
    }, [uid]);

    if (!data) return <span></span>

    return (
        <Modal isOpen={open} style={styles}>
            <ActionBar onClickBackButton={handleClickBackButton} />

            <ReportReasonView>
                유저가 기입한 신고 이유 여기에 스크롤 가능하게 해서 띄워주세요!
            </ReportReasonView>

            {/* 슬라이드 가능하게 */}
            <PresentImageWrapper>
                <ButtonWrapper>
                    <Button
                        onClick={handleClickNegativeButton}
                        backgroundColor="#FF5100"
                        textColor="white">BAN!</Button>
                    <Spacing.Horizontal width={24} />
                    <Button
                        onClick={handleClickPositiveButton}
                        backgroundColor="#26C485"
                        textColor="black">DISMISS!</Button>
                </ButtonWrapper>
                <PresentImage src={data.images[0].src} />
            </PresentImageWrapper>

            <Spacing.Vertical height={16} />
            <Container style={{ padding: '0 40px' }}>
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

export interface MatchingPickResponse {
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

const PresentImageWrapper = styled.div`
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

export const ReportReasonView = styled.div`
    position: relative;
    box-sizing: border-box;
    padding: 16px 28px;
    background-color: #d4d4d4;
    height: 155px;
    overflow-y: scroll;
    color: black;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    z-index: 99;
    top: -26px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
`;

export default AdminItemDetailModal;