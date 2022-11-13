import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import ImgAboutUsBottom from "@/assets/aboutus_bottom.png";
import { useTranslation } from "react-i18next";

const Introduction: React.FC = () => {

    const { t } = useTranslation();

    return (
        <Wrapper>
            <HighLight>띵더</HighLight>는 <RedCut>레드커틀러리</RedCut>
            가 만든 예술실험적 데이팅 앱입니다.
            <Spacing.Vertical height={32} />
            <Bold>{t("about.subject")}</Bold>
            <Spacing.Vertical height={32} />

            {t("about.desc1")}
            <Spacing.Vertical height={32} />
            {t("about.desc2")}
            <Spacing.Vertical height={32} />
            {t("about.desc3")}

            <Spacing.Vertical height={32} />
            <AboutUsBottom src={ImgAboutUsBottom} />
        </Wrapper>
    );
};

const Wrapper = styled.span`
    font-weight: 400;
    font-size: 18px;
    color: #404040;
`;

export const HighLight = styled.span`
    font-weight: bold;
    color: #FF5100;
`;

export const RedCut = styled.span`
    font-weight: bold;
    text-decoration: underline;
    color: #FF0000;
`;

const Bold = styled.span`
    font-weight: bold;
`;

const AboutUsBottom = styled.img`
    width: 100%;
    max-width: 400px;
    object-fit: contain;
`;

export default Introduction;