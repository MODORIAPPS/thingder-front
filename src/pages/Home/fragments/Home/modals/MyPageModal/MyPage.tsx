import ImgShare from "@/assets/icon/share_white.svg";
import Spacing from "@/components/Spacing";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { BottomProperty, BottomPropertyDivider, BottomWrapper, Container, Content, Divider, PresentImage, PrsentImageWrapper, ShareIcon, SubTitle } from "@/pageModal/ItemDetail/ItemDetailModal";
import { fetchMyPage } from "@/store/edit-mypage/edit-mypage.reducer";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import ActionBar from "./components/ActionBar";

interface Props {
    uid: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MyPage: React.FC<Props> = ({
    uid,
    open,
    setOpen
}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.myPage);

    useEffect(() => {
        if (uid) {
            dispatch(fetchMyPage(uid));
        }
    }, [uid]);

    const handleClickClose = () => setOpen(false);
    const handleClickEdit = () => navigate("/mypage");
    const handleClickShare = () => {
        window.navigator.share({
            url: "https://thingder.app/share/" + uid,
            title: data?.nickname
        });
    }

    const genYear = data.madeAt.split("-")[0];
    const genMonth = data.madeAt.split("-")[1];

    if (!data) return <span></span>

    return (
        <Modal isOpen={open} style={styles}>
            <ActionBar onClickBackButton={handleClickClose} onClickEditButton={handleClickEdit} />

            {/* 슬라이드 가능하게 */}
            <PrsentImageWrapper>
                <PresentImage src={data.images[0]?.src ?? ""} />

                {/* 공유 버튼 */}
                <ShareIcon onClick={handleClickShare} src={ImgShare} />
            </PrsentImageWrapper>

            <Spacing.Vertical height={16} />
            <Container>
                <Stack.Horizontal style={{ alignItems: "flex-end" }}>
                    <Typography.Header1>{data.nickname}</Typography.Header1>
                    <Typography.Caution1>{genYear}{t("detail.year")} {genMonth}{t("detail.month")} {t("detail.gen")}</Typography.Caution1>
                </Stack.Horizontal>
                <Stack.Vertical style={{ alignItems: "flex-end" }}>
                    <Content>{data.brand}</Content>
                    <BottomWrapper>
                        <BottomProperty>{t("detail.country")}: {data.genCountry}</BottomProperty>
                        <BottomPropertyDivider />
                        <BottomProperty>{t("detail.brand")}: {data.brand}</BottomProperty>
                    </BottomWrapper>
                </Stack.Vertical>

                {/* 다섯개 태그 */}
                <Divider />
                <Content>{data.tag}</Content>
                <Divider />

                {/* 이모지로 말해요 */}
                <SubTitle>{t("detail.talk_with_emoji")}</SubTitle>
                <Spacing.Vertical height={8} />
                <Content>
                    {data.story}
                </Content>

                <Divider />

                {/* 저에 대한 이야기 */}
                <SubTitle>{t("detail.about_me")}</SubTitle>
                <Spacing.Vertical height={8} />
                <Content>
                    {data.description}
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

export default MyPage;