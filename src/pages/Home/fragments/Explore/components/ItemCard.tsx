import styled from "@emotion/styled";
import React from "react";

// interface Props {
//     uid: string;

//     nickname: string;
//     name: string;

//     thumbnail_src: string;
//     thumbnail_srcSet: string;
// }

const ItemCard: React.FC<ItemCardType> = (props) => {
    return (
        <Container>
            <ItemImage src={props.thumbnail_src} srcSet={props.thumbnail_srcSet} />
            <PropertyWrapper>
                <Nickname>{props.nickname}</Nickname>
                <Name>{props.name}</Name>
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
    name: string;

    thumbnail_src: string;
    thumbnail_srcSet: string;
}

export const sampleData: ItemCardType[] = [
    {
        uid: "123122",
        nickname: "고양이축제",
        name: "네모난 블루투스 스피커",
        thumbnail_src: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
        thumbnail_srcSet: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
    },
    {
        uid: "12312",
        nickname: "웰컴투더돌고래월드",
        name: "돌고래 벽지",
        thumbnail_src: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
        thumbnail_srcSet: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
    },
    {
        uid: "345443",
        nickname: "돌고래귀여워",
        name: "큰돌고래",
        thumbnail_src: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
        thumbnail_srcSet: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
    },
    {
        uid: "32322332",
        nickname: "고양이축제",
        name: "네모난 블루투스 스피커",
        thumbnail_src: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
        thumbnail_srcSet: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
    },
    {
        uid: "54543434",
        nickname: "흰돌고래",
        name: "빡빡이",
        thumbnail_src: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
        thumbnail_srcSet: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
    },
    {
        uid: "43433443",
        nickname: "땡땡이",
        name: "동그란 알람시계",
        thumbnail_src: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
        thumbnail_srcSet: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
    },
    {
        uid: "ewafewew",
        nickname: "동그랑땡",
        name: "동그란 알람시계",
        thumbnail_src: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
        thumbnail_srcSet: "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg",
    }
]

export default ItemCard;