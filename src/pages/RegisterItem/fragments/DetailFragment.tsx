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
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();

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
            src: data.src,
            srcSet: data.srcSet
        };
        setPhoto(image);
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
            const madeAt = state.madeAt;
            const genYear = Number(madeAt.split("-")[0]) ?? 2002;
            const genMonth = Number(madeAt.split("-")[1]) ?? 4;

            const { data } = await api.main.post<RegisterResponse>("/auth/register", {
                ...state,
                images: [
                    {
                        src: photo.src,
                        srcSet: photo.srcSet
                    }
                ],
                genYear,
                genMonth
            });
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
                <HighLight>{t("register.thingder")}</HighLight>{t("register.is")} <RedCut>{t("register.redcut")}</RedCut>
                {t("register.desc1")}
                <Spacing.Vertical height={12} />
                <Description>{t("register.desc2")}</Description>

                <Spacing.Vertical height={25} />
                {/* 사진 입력 */}
                <PhotoBox
                    index={0}
                    onClick={handleClickPhotoBox}
                    src={photo?.src}
                    // srcSet={photo?.srcSet}
                    big={true} />
                {(photo &&
                    <>
                        <Spacing.Vertical height={4} />
                        <PhotoDescription>
                            {t("register.photo_add")}
                        </PhotoDescription>
                    </>
                )}

                {/* 별명 입력 */}
                <Spacing.Vertical height={24} />
                <PlainTextInput
                    label={t("register.nickname_label")}
                    placeholder={t("register.nickname_placeholder")}
                    value={state.nickname}
                    handleChange={(nickname) => dispatch(changeRegisterProperty({ nickname }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={t("register.kind_label")}
                    placeholder={t("register.kind_placeholder")}
                    value={state.type}
                    handleChange={(type) => dispatch(changeRegisterProperty({ type }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={t("register.made_country_label")}
                    placeholder={t("register.made_country_placeholder")}
                    value={state.genCountry}
                    handleChange={(genCountry) => dispatch(changeRegisterProperty({ genCountry }))} />
                <Spacing.Vertical height={36} />

                <InputMadeAt
                    value={state.madeAt}
                    onChange={(madeAt) => dispatch(changeRegisterProperty({ madeAt }))}
                />
                <Spacing.Vertical height={36} />

                <PlainTextInput
                    label={t("register.brand_label")}
                    placeholder={t("register.brand_placeholder")}
                    value={state.brand}
                    handleChange={(brand) => dispatch(changeRegisterProperty({ brand }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={t("register.type_label")}
                    placeholder={t("register.type_placeholder")}
                    value={state.tag}
                    handleChange={(tag) => dispatch(changeRegisterProperty({ tag }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={t("register.emoji_label")}
                    placeholder="😎 🌽 🎑 🥝 🍑 🌽 🎑 🥝"
                    value={state.description}
                    handleChange={handleChangeEmoji} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={t("register.desc_label")}
                    placeholder={t("register.desc_placeholder")}
                    value={state.story}
                    handleChange={(story) => dispatch(changeRegisterProperty({ story }))} />
                <Spacing.Vertical height={60} />
                <Button onClick={handleClickCompleteRegister} text={t("register.register_button")} />
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