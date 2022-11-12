import ActionBar from "@/components/ActionBar";
import Spacing from "@/components/Spacing";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ChooseButton from "@/pages/Home/fragments/Home/components/ChooseButton";
import { ChooseButtonWrapper } from "@/pages/Home/fragments/Home/HomeFragment";
import { fetchMyPage } from "@/store/edit-mypage/edit-mypage.reducer";
import React, { useEffect } from "react";
import Modal from 'react-modal';
import { BottomProperty, BottomPropertyDivider, BottomWrapper, Container, Content, Divider, PresentImage, PrsentImageWrapper, ShareIcon, SubTitle } from "../ItemDetail/ItemDetailModal";
import ImgShare from "@/assets/icon/share_white.svg";

interface Props {
    uid: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MyPageModal: React.FC<Props> = ({
    uid,
    open,
    setOpen
}) => {

    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.myPage);

    useEffect(() => {
        if (uid) {
            dispatch(fetchMyPage(uid));
        }
    }, [uid]);

    const handleClickClose = () => setOpen(false);

    const handleClickShare = () => {

    };

    const genYear = data.madeAt.split("-")[0];
    const genMonth = data.madeAt.split("-")[1];

    if (!data) return <span></span>

    return (
        <Modal isOpen={open} style={styles}>
            <ActionBar onClickBackButton={handleClickClose} />

            {/* 슬라이드 가능하게 */}
            <PrsentImageWrapper>
                <PresentImage src={data.images[0].src} />

                {/* 공유 버튼 */}
                <ShareIcon onClick={handleClickShare} src={ImgShare} />
            </PrsentImageWrapper>

            <Spacing.Vertical height={16} />
            <Container>
                <Stack.Horizontal style={{ alignItems: "flex-end" }}>
                    <Typography.Header1>{data.nickname}</Typography.Header1>
                    <Typography.Caution1>{genYear}년 {genMonth}월 제조</Typography.Caution1>
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
};

export default MyPageModal;