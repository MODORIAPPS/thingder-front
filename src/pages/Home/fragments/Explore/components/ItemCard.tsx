import styled from "@emotion/styled";
import React from "react";

interface Props {
    onClick: (uid: string) => void;

    uid: string;

    nickname: string;
    name: string;

    thumbnail_src: string;
    thumbnail_srcSet: string;
}


const ItemCard: React.FC<Props> = (props) => {
    return (
        <Container onClick={() => props.onClick(props.uid)}>
            <ItemImage src={props.thumbnail_src} />
            <PropertyWrapper>
                <Nickname>{props.nickname}</Nickname>
                <Name>{props.nickname}</Name>
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

// export const sampleData: ItemCardType[] = [
//     {
//         uid: "123122",
//         nickname: "몰랑이",

//     }
// ]

export default ItemCard;