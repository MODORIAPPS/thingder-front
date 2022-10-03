import styled from "@emotion/styled";
import React from "react";
import ImgShareIcon from "../../../assets/icon/share.png";
import { Container } from "../../../components/Container";
import PlainTextInput from "../../../components/PlainTextInput";
import Spacing from "../../../components/Spacing";
import { useTranslation, Trans } from "react-i18next";

interface Props {
    handleClickStartService: () => void;
    handleClickShare: () => void;
}

const DescFragment: React.FC<Props> = ({ handleClickStartService, handleClickShare }) => {

    const { t, i18n } = useTranslation();

    return (
        <Container>
            <ActionBar>
                <Icon style={{ opacity: 0 }} />
                <Icon onClick={handleClickShare} src={ImgShareIcon} />
            </ActionBar>
            <Body>
                {t("intro.select_lang")}
            </Body>

            <Trans i18nKey={"intro.select_lang"}>
                dfa
            </Trans>

            <PlainTextInput
                label={t("title")}
                value="faefew"
                placeholder="별명을 입력해주세요."
                onChange={() => { }}
            />

            <Spacing.Vertical height={42} />

            <PlainTextInput
                label="당신을 이렇게 불러드릴게요."
                value="faefew"
                placeholder="별명을 입력해주세요."
                onChange={() => { }}
            />
        </Container>
    );
};

const Body = styled.div`
    padding: 0 30px;
    color: #404040;
`;

const ActionBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 7px;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin: 10px;
`;

export default DescFragment;