import styled from "@emotion/styled";
import React, { ChangeEvent, useEffect, useState } from "react";
import ImgThingderLogoStart from "@/assets/logo/thingder_logo_start.png";
import ImgThingderLogoStartEn from "@/assets/logo/thingder_logo_en.png";
import Button from "../../../components/Button";
import Spacing from "../../../components/Spacing";
import Typography from "../../../components/Typography";
import Container from "@/components/Container";
import i18n from "@/utils/i18n";
import { useTranslation } from "react-i18next";

interface Props {
    handleClickHello: () => void;
}

const selectList: LangType[] = ["en", "kr"];

type LangType = "en" | "kr";

const StartFragment: React.FC<Props> = ({ handleClickHello }) => {

    const { t } = useTranslation();

    const [lang, setLang] = useState<LangType>((window.localStorage.getItem("lang") || "en") as LangType);
    const [isKorean, setIsKorean] = useState(false);

    useEffect(() => {
        /** 언어 초기 설정 가져오기 */
        setIsKorean(i18n.language === "kr" ? true : false)
    }, [i18n.language]);

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as LangType;
        setLang(value);
        window.localStorage.setItem("lang", value);
        if (value === "en") {
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("kr");
        }
    };

    return (
        <Container>
            <VerticalStack>
                <LogoImg alt="thingder_logo_start" src={isKorean ? ImgThingderLogoStart : ImgThingderLogoStartEn} />
                <Spacing.Vertical height={42} />
                <Typography.Body1 style={{ color: "#B6B6B6" }}>{t("select_lang")}</Typography.Body1>
                <br />
                <select onChange={handleSelect} value={lang}>
                    {selectList.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </VerticalStack>
            <StickToBottom>
                <Button onClick={handleClickHello} text={t("start")} />
            </StickToBottom>
        </Container>
    );
};

const VerticalStack = styled.div`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const StickToBottom = styled.div`
    width: 100%;
    position: absolute;
    bottom: 35px;
    left: 0;
    box-sizing: border-box;
    padding: 0 30px;
`;

const LogoImg = styled.img`
    height: 94px;
`;

export default StartFragment;