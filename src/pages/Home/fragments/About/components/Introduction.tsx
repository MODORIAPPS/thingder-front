import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import ImgAboutUsBottom from "@/assets/aboutus_bottom.png";

const Introduction: React.FC = () => {
    return (
        <Wrapper>
            <HighLight>띵더</HighLight>는 <RedCut>레드커틀러리</RedCut>
            가 만든 예술실험적 데이팅 앱입니다.
            <Spacing.Vertical height={32} />
            <Bold>틴더 (온라인 데이팅) - 몸 = ?</Bold>
            <Spacing.Vertical height={32} />

            틴더에서 몸을 빼면 우리는 어떻게 서로를 보게 될까요? 그동안 우리는 틴더에서 무엇을 보고 있었을까요?
            <Spacing.Vertical height={32} />
            띵더를 통해 몸이 기성품으로 대체되고 인간성이 물질성으로 치환되는 온라인 데이팅을 경험하세요. 흐릿했던 것들이 덜 흐릿하게 보일지도 몰라요. 더 흐릿하게 보일지도 모르죠 😶‍️

            <Spacing.Vertical height={32} />
            그리고 어느 날 문득 틴더를 다시 열어보면 다른게 보일지도 몰라요 👾

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