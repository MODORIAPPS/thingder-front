import { MemberDTO } from "@/@types/Member";
import api from "@/api";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

interface Props {
    uid: string;
    onClick: (uid: string) => void;
    memberUid: string;
    message: string;
}

const ProfileItemCard: React.FC<Props> = (props) => {

    const [member, setMember] = useState<MemberDTO>();

    useEffect(() => {
        (async () => {
            const { data } = await api.main.get("/member/" + props.memberUid);
            setMember(data);
        })();
    }, [props.memberUid]);

    if (!member) return <></>

    return (
        <Container onClick={() => props.onClick(props.uid)}>
            <ItemImage
                src={member.images[0].src}
                srcSet={member.images[0].srcSet}
            />
            <PropertyWrapper>
                <Nickname>{member.nickname}</Nickname>
                <Name>{member.nickname}</Name>
            </PropertyWrapper>
        </Container>
    );
};

const Container = styled.div`
    height: 200px;
    overflow: hidden;

    position: relative;
`;

const ItemImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;

    border-radius: 10px;
`;

const PropertyWrapper = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    background: linear-gradient(180deg, rgba(130, 130, 130, 0) 0%, #828282 100%);
    border-radius: 0px 0px 10px 10px;

    padding: 8px 12px;
`;

const Nickname = styled.span`
    font-size: 0.875rem;
    font-weight: bold;
    margin: 0;
    color: white;

    display: block;
`;

const Name = styled.span`
    font-size: 0.5rem;
    margin: 0;
    color: white;

    display: block;
`;

export interface ItemCardType {
    uid: string;

    nickname: string;
    type: string;
    genYear: number;
    genMonth: number;
    genCountry: string;
    brand: string;

    image: {
        uid: string;
        src: string;
        srcSet: string;
    }
}

export default ProfileItemCard;