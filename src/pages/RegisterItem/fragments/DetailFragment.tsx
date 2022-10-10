import api, { ACCESS_TOKEN_KEY } from "@/api";
import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import PlainTextInput from "@/components/PlainTextInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeRegisterProperty } from "@/store/register/register.reducer";
import { signInUser } from "@/store/user/user.reducer";
import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spacing from "../../../components/Spacing";

interface Props {
    onClickBackButton: () => void;
}

export const BASE_URL = "https://api.thingder.app";

interface RegisterResponse {
    email: string;
    expiration: string;
    token: string;
}

const DetailFragment: React.FC<Props> = (props) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.register);
    const handleClickCompleteRegister = async () => {
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

    return (
        <Screen>
            <ActionBar onClickBackButton={props.onClickBackButton} />
            <Spacing.Vertical height={16} />
            <PresentImage
                src={state.images[0]?.src}
            />
            <Container>
                <Spacing.Vertical height={24} />
                <PlainTextInput
                    label={"당신을 이렇게 불러드릴게요."}
                    placeholder="별명을 입력해주세요."
                    value={state.nickname}
                    onChange={(nickname) => dispatch(changeRegisterProperty({ nickname }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"당신은 어떤 물건인가요?"}
                    placeholder="물건의 종류를 입력해주세요"
                    value={state.type}
                    onChange={(type) => dispatch(changeRegisterProperty({ type }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건의 제조국을 알려드릴게요."}
                    placeholder="제조국가를 입력해주세요."
                    value={state.genCountry}
                    onChange={(genCountry) => dispatch(changeRegisterProperty({ genCountry }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건의 제조년도를 알려주세요."}
                    placeholder="예) 2002"
                    value={state.genYear}
                    onChange={(genYear) => dispatch(changeRegisterProperty({ genYear }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건의 제조월을 알려주세요."}
                    placeholder="예) 12"
                    value={state.genMonth}
                    onChange={(genMonth) => dispatch(changeRegisterProperty({ genMonth }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건의 브랜드를 알려주세요."}
                    placeholder="브랜드명을 입력해주세요."
                    value={state.brand}
                    onChange={(brand) => dispatch(changeRegisterProperty({ brand }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건을 대표하는 물질성 5가지를 적어주세요."}
                    placeholder="#흐름  #차가움  #깨지기쉬움  #방수  #재활용"
                    value={state.tag}
                    onChange={(tag) => dispatch(changeRegisterProperty({ tag }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건을 이모지로만 설명해주세요."}
                    placeholder="😎 🌽 🎑 🥝 🍑 🌽 🎑 🥝"
                    value={state.description}
                    onChange={(description) => dispatch(changeRegisterProperty({ description }))} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건에 대해 짧게 이야기해주세요."}
                    placeholder="자유롭게 소개 부탁해요."
                    value={state.story}
                    onChange={(story) => dispatch(changeRegisterProperty({ story }))} />
                <Spacing.Vertical height={60} />
                <Button onClick={handleClickCompleteRegister} text="회원가입 완료!" />
                <Spacing.Vertical height={40} />
            </Container>
        </Screen>
    );
};

const Screen = styled.div`
    width: 100%;
    height: 100vh;

    overflow-y: scroll;
`;

const Container = styled.div`
    box-sizing: border-box;
    padding: 0 36px;
`;

const PresentImage = styled.img`
    width: 100%;
    max-height: 400px;

    object-fit: contain;
`;

export default DetailFragment;