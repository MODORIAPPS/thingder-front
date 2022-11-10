import api, { ACCESS_TOKEN_KEY } from "@/api";
import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import PlainTextInput from "@/components/PlainTextInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { HighLight, RedCut } from "@/pages/Home/fragments/About/components/Introduction";
import { changeRegisterProperty } from "@/store/register/register.reducer";
import { signInUser } from "@/store/user/user.reducer";
import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spacing from "../../../components/Spacing";
import InputMadeAt from "./components/InputMadeAt";
import { PhotoBox } from "./PhotoFragment";
import emojiRegex from "emoji-regex";
import Container from "@/components/Container";

const regex = emojiRegex();


interface Props {
    onClickBackButton: () => void;
}

interface RegisterResponse {
    email: string;
    expiration: string;
    token: string;
}

interface ImageResponse {
    src: string;
    srcSet: string;
}

const DetailFragment: React.FC<Props> = (props) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.register);

    const [photo, setPhoto] = useState<ImageResponse>();
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
        setPhoto(image);
        dispatch(changeRegisterProperty({ images: [image] }));
    }, [photo]);

    const clickImageUploadButton = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, []);

    const handleClickPhotoBox = () => {
        if (photo) {
            setPhoto(undefined);
            dispatch(changeRegisterProperty({ images: undefined }));
        } else {
            clickImageUploadButton();
        }
    };

    const handleClickCompleteRegister = async () => {

        if (!photo) {
            alert("이미지를 등록해주세요.");
            return;
        }

        try {
            const { data } = await api.main.post<RegisterResponse>("/auth/register", state);
            if (data.token) {
                localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
                dispatch(signInUser(data.token));
                navigate("/home");
                toast("회원가입이 완료되었습니다!")
            }
        } catch (e) {
            // 유효하지 않은 pin 토큰입니다.
            toast.error("전화번호 인증시간이 만료되었습니다. 다시 시도해주세요.");
            navigate("/");
        }
    };

    const handleChangeEmoji = (value: string) => {
        const description = value.match(regex)?.join("");
        if (!description) return;
        dispatch(changeRegisterProperty({ description }))
    };

    return (
        <Container>
            <ActionBar onClickBackButton={props.onClickBackButton} />
            <Spacing.Vertical height={16} />

            <Body>
                {/* 앱 소개 */}
                <HighLight>띵더</HighLight>는 <RedCut>레드커틀러리</RedCut>
                가 만든 예술실험적 데이팅 앱입니다.
                <Spacing.Vertical height={12} />
                <Description>띵더에서는 물건이 당신을 대변해요! </Description>

                <Spacing.Vertical height={25} />
                {/* 사진 입력 */}
                <PhotoBox
                    index={0}
                    onClick={handleClickPhotoBox}
                    src={photo?.src}
                    srcSet={photo?.srcSet}
                    big={true} />
                {(photo &&
                    <>
                        <Spacing.Vertical height={4} />
                        <PhotoDescription>
                            사진은 나중에 더 추가할 수 있어요.
                        </PhotoDescription>
                    </>
                )}

                {/* 별명 입력 */}
                <Spacing.Vertical height={24} />
                <PlainTextInput
                    label={"당신을 이렇게 불러드릴게요."}
                    placeholder="별명을 입력해주세요."
                    value={state.nickname}
                    handleChange={(nickname) => dispatch(changeRegisterProperty({ nickname }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"당신은 어떤 물건인가요?"}
                    placeholder="물건의 종류를 입력해주세요"
                    value={state.type}
                    handleChange={(type) => dispatch(changeRegisterProperty({ type }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건의 제조국을 알려드릴게요."}
                    placeholder="제조국가를 입력해주세요."
                    value={state.genCountry}
                    handleChange={(genCountry) => dispatch(changeRegisterProperty({ genCountry }))} />
                <Spacing.Vertical height={36} />

                <InputMadeAt
                    value={state.madeAt}
                    onChange={(madeAt) => dispatch(changeRegisterProperty({ madeAt }))}
                />
                <Spacing.Vertical height={36} />

                <PlainTextInput
                    label={"물건의 브랜드를 알려주세요."}
                    placeholder="브랜드명을 입력해주세요."
                    value={state.brand}
                    handleChange={(brand) => dispatch(changeRegisterProperty({ brand }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건을 대표하는 물질성 5가지를 적어주세요."}
                    placeholder="#흐름  #차가움  #깨지기쉬움  #방수  #재활용"
                    value={state.tag}
                    handleChange={(tag) => dispatch(changeRegisterProperty({ tag }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건을 이모지로만 설명해주세요."}
                    placeholder="😎 🌽 🎑 🥝 🍑 🌽 🎑 🥝"
                    value={state.description}
                    handleChange={handleChangeEmoji} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건에 대해 짧게 이야기해주세요."}
                    placeholder="자유롭게 소개 부탁해요."
                    value={state.story}
                    handleChange={(story) => dispatch(changeRegisterProperty({ story }))} />
                <Spacing.Vertical height={60} />
                <Button onClick={handleClickCompleteRegister} text="회원가입 완료!" />
                <Spacing.Vertical height={40} />
            </Body>
            <input style={{ visibility: "hidden" }} type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
        </Container>
    );
};

const Body = styled.div`
    box-sizing: border-box;
    padding: 0 36px;
`;

const Description = styled.span`
    font-size: 14px;
    line-height: 21px;
    color: rgba(0,0,0,0.35);
`;

const PhotoDescription = styled.div`
    font-size: 12px;
    color: rgba(0,0,0,0.35);

    text-align: right;
`;


export default DetailFragment;