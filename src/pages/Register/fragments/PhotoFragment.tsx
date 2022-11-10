import styled from "@emotion/styled";
import React, { useState } from "react";
import Spacing from "../../../components/Spacing";
import ImgAddRound from "../../../assets/icon/add_round.svg";
import Button from "../../../components/Button";

const PhotoFragment: React.FC = () => {

    const [photo, setPhoto] = useState(false);

    // redux
    return (
        <>
            <Spacing.Vertical height={16} />
            <Container>
                {/* <div>
                    <PhotoBox />
                </div>
                <Button
                    text={"계속"}
                    onClick={} /> */}
            </Container>
        </>
    );
};

const Container = styled.div`
    box-sizing: border-box;
    padding: 0 20px;
`;

interface PhotoBoxProps {
    index: number;
    src: string;
    srcSet: string;
    big?: boolean;
    onClick: (index: number) => void;
}

const PhotoBox: React.FC<PhotoBoxProps> = (props) => {
    if (props.src || props.srcSet) {
        return <Photo
            onClick={() => props.onClick(props.index)}
            src={props.src}
            big={props.big}
            // srcSet={props.srcSet}
        />
    }

    return (
        <PhotoAddWrapper onClick={() => props.onClick(props.index)} big={props.big}>
            <AddIcon big={props.big} src={ImgAddRound} />
        </PhotoAddWrapper>
    );
};

const Photo = styled.img<{ big?: boolean }>`
    background-color: #292929;
    border-radius: 20px;
    object-fit: cover;

    width: ${({ big }) => big ? 333 : 103}px;
    height: ${({ big }) => big ? 333 : 103}px;
`;

const PhotoAddWrapper = styled.div<{ big?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E9E9E9;
    border-radius: 20px;

    width: ${({ big }) => big ? 333 : 103}px;
    height: ${({ big }) => big ? 333 : 103}px;
`;

const AddIcon = styled.img<{ big?: boolean }>`
    width: ${({ big }) => big ? 150 : 50}px;
    height: ${({ big }) => big ? 150 : 50}px;
`;

export default PhotoFragment;