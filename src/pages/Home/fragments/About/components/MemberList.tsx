import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import ImgRedCutPhoto from "@/assets/logo/redcut_logo.png";
import { useTranslation } from "react-i18next";

const MemberList: React.FC = () => {

    const { t } = useTranslation();

    return (
        <List>
            <MemberItem>
                <MemberPhoto src={ImgRedCutPhoto} />
                <Spacing.Vertical height={12} />
                <MemberName>{t("about.name1")}</MemberName>
            </MemberItem>
            <MemberItem>
                <MemberPhoto src={ImgRedCutPhoto} />
                <Spacing.Vertical height={12} />
                <MemberName>{t("about.name2")}</MemberName>
            </MemberItem>
            <MemberItem>
                <MemberPhoto src={ImgRedCutPhoto} />
                <Spacing.Vertical height={12} />
                <MemberName>{t("about.name3")}</MemberName>
            </MemberItem>
        </List>
    );
};

const List = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-width: 600px;
`;

const MemberItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MemberPhoto = styled.img`
    width: 75px;
    height: 75px;
`;

const MemberName = styled.span`
    font-size: 20px;
    font-weight: bold;
    line-height: 25px;
    color: #3F3F3F;
`;

export default MemberList;