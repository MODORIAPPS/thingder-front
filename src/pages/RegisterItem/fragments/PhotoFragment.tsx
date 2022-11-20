import api from "@/api";
import AddRoundBtn from "@/assets/button/add_round.png";
import ActionBar from "@/components/ActionBar";
import { useAppDispatch } from "@/hooks/redux";
import { changeRegisterProperty } from "@/store/register/register.reducer";
import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import ImgAddRound from "../../../assets/icon/add_round.svg";
import Button from "../../../components/Button";
import Spacing from "../../../components/Spacing";

interface ImageResponse {
    src: string;
    srcSet: string;
}

interface Props {
    onClickContinueButton: () => void;
}

const PhotoFragment: React.FC<Props> = ({ onClickContinueButton }) => {

    const dispatch = useAppDispatch();
    const [photo, setPhoto] = useState<ImageResponse[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onUploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        const { data } = await api.main.post<ImageResponse>("/image/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        const image: ImageResponse = {
            src: import.meta.env.VITE_API_CLIENT_BASEURL + data.src,
            srcSet: data.srcSet
        };
        const array = [...photo];
        array.push(image)
        console.log(array);
        setPhoto(array);
    }, [photo]);


    const clickImageUploadButton = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, []);

    const handleClickContinue = () => {
        if (photo.length < 1) {
            alert("적어도 하나의 이미지가 필요합니다.")
            return;
        }

        dispatch(changeRegisterProperty({ images: photo }));
        onClickContinueButton();
    };

    const handleClickPhotoBox = (index: number) => {
        let array = [...photo];
        if (photo[index]) {
            console.log('asdf');
            array.splice(index, 1);
            setPhoto(array);
        } else {
            clickImageUploadButton();
        }
    };

    return (
        <>
            <ActionBar />
            <Container>
                <PhotoBox
                    index={0}
                    onClick={handleClickPhotoBox}
                    src={photo[0]?.src}
                    srcSet={photo[0]?.srcSet}
                    big={true} />
                <Spacing.Vertical height={12} />
                <Wrapper>
                    <PhotoBox
                        index={1}
                        onClick={handleClickPhotoBox}
                        src={photo[1]?.src}
                        srcSet={photo[1]?.srcSet}
                    />
                    <PhotoBox
                        index={2}
                        onClick={handleClickPhotoBox}
                        src={photo[2]?.src}
                        srcSet={photo[2]?.srcSet} />
                    <PhotoBox
                        index={3}
                        onClick={handleClickPhotoBox}
                        src={photo[3]?.src}
                        srcSet={photo[3]?.srcSet} />
                </Wrapper>
                <Spacing.Vertical height={12} />
                <Wrapper>
                    <PhotoBox
                        index={4}
                        onClick={handleClickPhotoBox}
                        src={photo[4]?.src}
                        srcSet={photo[4]?.srcSet} />
                    <PhotoBox
                        index={5}
                        onClick={handleClickPhotoBox}
                        src={photo[5]?.src}
                        srcSet={photo[5]?.srcSet} />
                    <PhotoBox
                        index={6}
                        onClick={handleClickPhotoBox}
                        src={photo[6]?.src}
                        srcSet={photo[6]?.srcSet} />
                </Wrapper>
                <Spacing.Vertical height={32} />
                <Button text="계속" onClick={handleClickContinue} />
            </Container>
            <input style={{ visibility: "hidden" }} type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
        </>
    );
};

const Container = styled.div`
    box-sizing: border-box;
    padding: 0 20px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

interface PhotoBoxProps {
    index: number;
    src?: string;
    srcSet?: string;
    big?: boolean;
    onClick: (index: number) => void;
}

export const PhotoBox: React.FC<PhotoBoxProps> = (props) => {
    if (props.src || props.srcSet) {
        return <PhotoWrapper big={props.big}>
            <Photo
                onClick={() => props.onClick(props.index)}
                big={props.big}
                src={props.src}
            />
            {(props.src)
                &&
                <DeleteButton
                    src={AddRoundBtn}
                    onClick={() => props.onClick(0)}
                />
            }
        </PhotoWrapper>
    }

    return (
        <PhotoAddWrapper onClick={() => props.onClick(props.index)} big={props.big}>
            <AddIcon big={props.big} src={ImgAddRound} />
        </PhotoAddWrapper>
    );
};

const PhotoWrapper = styled.div<{ big?: boolean }>`
    width: ${({ big }) => big ? '100%' : '103px'};
    height: 333px;
    position: relative;

    margin: 0 auto;
`;

const Photo = styled.img<{ big?: boolean }>`
    position: absolute;
    display: flex;
    background-color: #292929;
    border-radius: 20px;
    object-fit: cover;

    margin: 0 auto;

    width: ${({ big }) => big ? '100%' : '103px'};
    height: ${({ big }) => big ? '333px' : '103px'};

    &:hover {
        background-color: #121212;
    }

    &:active {
        background-color: #121212;
    }
`;

const DeleteButton = styled.img`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 42px;
    height: 42px;
`;

const PhotoAddWrapper = styled.div<{ big?: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E9E9E9;
    border-radius: 20px;

    transition: .2s;

    margin: 0 auto;

    width: ${({ big }) => big ? '100%' : '103px'};
    height: ${({ big }) => big ? '333px' : '103px'};

    &:hover {
        background-color: #d5d5d5;
    }

    &:active {
        background-color: #d5d5d5;
    }

    cursor: pointer;
`;

const AddIcon = styled.img<{ big?: boolean }>`
    width: ${({ big }) => big ? 150 : 50}px;
    height: ${({ big }) => big ? 150 : 50}px;
`;

export default PhotoFragment;