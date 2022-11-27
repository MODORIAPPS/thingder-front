import api from "@/api";
import ImgEditImage from "@/assets/icon/img_load_box.png";
import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import Container from "@/components/Container";
import PlainTextInput from "@/components/PlainTextInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { PresentImage, PrsentImageWrapper, ShareIcon } from "@/pageModal/ItemDetail/ItemDetailModal";
import InputTags from "@/pages/RegisterItem/fragments/components/InputTags";
import { updageMyPage } from "@/store/edit-mypage/edit-mypage.reducer";
import { changeRegisterProperty } from "@/store/register/register.reducer";
import { updateMyInfo } from "@/store/user/user.reducer";
import styled from "@emotion/styled";
import emojiRegex from "emoji-regex";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Spacing from "../../../components/Spacing";
import { PageType } from "../MyPage";
import InputMadeAt from "./components/InputMadeAt";

const regex = emojiRegex();

interface Props {
    onClickBackButton: () => void;
    setPage: (type: PageType) => void;
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

const DetailFragment: React.FC<Props> = ({
    onClickBackButton,
    setPage
}) => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state.myPage);

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

    const handleClickCompleteRegister = async () => {
        const madeAt = state.madeAt;
        const genYear = madeAt.split("-")[0];
        const genMonth = madeAt.split("-")[1];
        console.log(state);
        const { data } = await api.main.put("/auth/my", {
            ...state,
            genYear,
            genMonth
        });
        alert("저장되었습니다!");
        navigate(-1);
        dispatch(updateMyInfo())
    };

    const handleClickEdit = () => {
        setPage("PHOTO");
    };

    const handleChangeEmoji = (value: string) => {
        if (value === "") {
            dispatch(updageMyPage({ story: "" }));
            return;
        }
        const story = value.match(regex)?.join("");
        if (!story) return;
        dispatch(updageMyPage({ story }))
    };

    return (
        <Container>
            <ActionBar />
            <Spacing.Vertical height={16} />

            <Body>

                {/* 슬라이드 가능하게 */}
                <PrsentImageWrapper>
                    <PresentImage src={state.images[0]?.src ?? ""} />

                    {/* 공유 버튼 */}
                    <ShareIcon onClick={handleClickEdit} src={ImgEditImage} />
                </PrsentImageWrapper>

                <Padding>
                    {/* 별명 입력 */}
                    <Spacing.Vertical height={24} />
                    <PlainTextInput
                        label={t("register.nickname_label")}
                        placeholder={t("register.nickname_placeholder")}
                        value={state.nickname}
                        handleChange={(nickname) => dispatch(updageMyPage({ nickname }))} />
                    <Spacing.Vertical height={36} />
                    <PlainTextInput
                        label={t("register.kind_label")}
                        placeholder={t("register.kind_placeholder")}
                        value={state.type}
                        handleChange={(type) => dispatch(updageMyPage({ type }))} />
                    <Spacing.Vertical height={36} />
                    <PlainTextInput
                        label={t("register.made_country_label")}
                        placeholder={t("register.made_country_placeholder")}
                        value={state.genCountry}
                        handleChange={(genCountry) => dispatch(updageMyPage({ genCountry }))} />
                    <Spacing.Vertical height={36} />

                    <InputMadeAt
                        value={state.madeAt}
                        onChange={(madeAt) => dispatch(updageMyPage({ madeAt }))}
                    />
                    <Spacing.Vertical height={36} />

                    <PlainTextInput
                        label={t("register.brand_label")}
                        placeholder={t("register.brand_placeholder")}
                        value={state.brand}
                        handleChange={(brand) => dispatch(updageMyPage({ brand }))} />
                    <Spacing.Vertical height={36} />
                    <InputTags
                        tags={state.tag.split(",").filter(Boolean)}
                        setTags={(tags) => dispatch(updageMyPage({ tag: tags.toString() }))}
                    />
                    <Spacing.Vertical height={36} />
                    <PlainTextInput
                        label={t("register.emoji_label")}
                        placeholder="😎 🌽 🎑 🥝 🍑 🌽 🎑 🥝"
                        value={state.story}
                        handleChange={handleChangeEmoji} />
                    <Spacing.Vertical height={36} />
                    <PlainTextInput
                        label={t("register.desc_label")}
                        placeholder={t("register.desc_placeholder")}
                        value={state.description}
                        handleChange={(description) => dispatch(updageMyPage({ description }))} />
                    <Spacing.Vertical height={24} />
                    <Button onClick={handleClickCompleteRegister} text={t("register.save")} />
                    <Spacing.Vertical height={40} />
                </Padding>

            </Body>
            <input style={{ visibility: "hidden" }} type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
        </Container>
    );
};

const Body = styled.div`
    box-sizing: border-box;
    /* padding: 0 36px; */
`;

const Padding = styled.div`
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