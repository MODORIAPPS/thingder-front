import api from "@/api";
import ActionBar from "@/components/ActionBar";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { BottomProperty, BottomPropertyDivider, BottomWrapper, Content, Divider, MemberDetail, PresentImage, PrsentImageWrapper, ShareIcon, SubTitle } from "@/pageModal/ItemDetail/ItemDetailModal";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ChooseButton from "../Home/fragments/Home/components/ChooseButton";
import { ChooseButtonWrapper } from "../Home/fragments/Home/HomeFragment";

const Share: React.FC = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) navigate("/");

        fetchData();
    }, []);

    const [data, setData] = useState<MemberDetail>();

    const fetchData = async () => {
        const { data } = await api.main.get<MemberDetail>("/member/" + id);
        setData(data);
    };

    const handleClickButton = () => {
        navigate("/");
    };

    if (!data) return <></>

    return (
        <Container>
            <ActionBar onClickBackButton={handleClickButton} />

            {/* 슬라이드 가능하게 */}
            <PrsentImageWrapper>
                <PresentImage src={data.images[0].src} />

                {/* 선택 버튼 */}
                <ChooseButtonWrapper style={{ position: "absolute", bottom: 32, left: 0, right: 0 }}>
                    <ChooseButton.Negative onClick={handleClickButton} />
                    <Spacing.Horizontal width={65} />
                    <ChooseButton.Positive onClick={handleClickButton} />
                </ChooseButtonWrapper>
            </PrsentImageWrapper>

            <Spacing.Vertical height={16} />
            <Container>
                <Stack.Horizontal style={{ alignItems: "flex-end" }}>
                    <Typography.Header1>{data.nickname}</Typography.Header1>
                    <Typography.Caution1>{data.genYear}{t("detail.year")} {data.genMonth}{t("detail.month")} {t("detail.gen")}</Typography.Caution1>
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
                    {data.description}
                </Content>

                <Divider />

                {/* 저에 대한 이야기 */}
                <SubTitle>{t("detail.about_me")}</SubTitle>
                <Spacing.Vertical height={8} />
                <Content>
                    {data.story}
                </Content>
            </Container>
        </Container>
    );
};

export default Share;