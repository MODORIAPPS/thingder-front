import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import ImgRedCutPhoto from "@/assets/logo/redcut_logo.png";

const MemberList: React.FC = () => {
    return (
        <List>
            <MemberItem>
                <MemberPhoto src={ImgRedCutPhoto} />
                <Spacing.Vertical height={12} />
                <MemberName>융융</MemberName>
            </MemberItem>
            <MemberItem>
                <MemberPhoto src={ImgRedCutPhoto} />
                <Spacing.Vertical height={12} />
                <MemberName>약모</MemberName>
            </MemberItem>
            <MemberItem>
                <MemberPhoto src={ImgRedCutPhoto} />
                <Spacing.Vertical height={12} />
                <MemberName>큐컴</MemberName>
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

    &:hover {
        opacity: .8;
    }
    
    &:active {
        opacity: .8;
    }
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