import api from "@/api";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeRegisterProperty, resetRegisterStateAction } from "@/store/register/register.reducer";
import { formatPhoneNumberHypen } from "@/utils/formatter";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";
import ActionBar from "../../components/ActionBar";
import Spacing from "../../components/Spacing";
import Typography from "../../components/Typography";
import EmailInput from "./components/EmaiInput";
import PasswordConfirmInput from "./components/PasswordConfirmInput";
import PasswordInput from "./components/PasswordInput";
import PhoneCodeInput from "./components/PhoneCodeInput";
import PhoneNumberInput from "./components/PhoneNumberInput";
import SendCodeButton from "./components/SendCodeButton";
import Timer from "./components/Timer";
import useRegister from "./hooks/useRegister";

interface PinCheckResponse {
    expiration: number;
    phone: string;
    token: string;
}

const Register: React.FC = () => {

    const password = useAppSelector(state => state.register.password);
    const passwordConfirm = useAppSelector(state => state.register.passwordConfirm);
    const isCodeConfirmed = useAppSelector(state => state.register.pinToken);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { state, handleChange } = useRegister();

    // phone
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    // code
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");

    const { seconds, minutes, isRunning, restart, pause } = useTimer({
        expiryTimestamp: CODE_EXPIRY_TIME,
        onExpire: () => setEnd(true),
        autoStart: false
    });

    const { t } = useTranslation();

    // 인증 번호 전송 종료 여부
    const [end, setEnd] = useState(false);

    const handleClickSendCode = async () => {
        if (isRunning) {
            restart(CODE_EXPIRY_TIME, true);
            return;
        }

        try {
            await api.main.post("/auth/pin/send?phone=" + phone.replace(/-/g, ""));
            setPhoneError("");
            const CODE_EXPIRY_TIME = new Date(new Date().setMinutes(new Date().getMinutes() + 3));
            restart(CODE_EXPIRY_TIME, true);
            setEnd(false);
        } catch (e) {
            console.error(e);
            setPhoneError(PHONE_NUMBER_ERROR);
        }
    };

    const handleClickCodeConfirm = async () => {
        try {
            const { data } = await api.main.post<PinCheckResponse>("/auth/pin/check", {
                phone: phone.replace(/-/g, ""),
                pin: code
            });
            setCodeError("");
            dispatch(changeRegisterProperty({ pinToken: data.token }));
            alert(t("prer.confirm_toast"))
            pause();
        } catch (e) {
            setCodeError(CODE_CONFIRM_ERROR);
        }
    };

    const handleClickContinue = () => {
        navigate("/auth/policy");
    };

    const handleClickBackButton = () => {
        dispatch(resetRegisterStateAction());
        navigate(-1);
    };

    const handleChangePhone = (value: string) => {
        if (value.length > 13) return;
        const data = value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
        setPhone(data);
    };

    return (
        <Container>
            <ActionBar onClickBackButton={handleClickBackButton} />
            <Spacing.Vertical height={16} />
            <Body>
                <Typography.Header1>{t("register.title")}</Typography.Header1>

                <Spacing.Vertical height={36} />

                {/* 이메일 입력 */}
                <EmailInput />
                <Spacing.Vertical height={16} />

                {/* 휴대폰 번호 */}
                <PhoneNumberInput
                    value={phone}
                    onChange={handleChangePhone}
                    error={phoneError}
                    onClickAction={<SendCodeButton onClick={handleClickSendCode} />} />
                <Spacing.Vertical height={16} />

                {/* 인증 코드 */}
                <PhoneCodeInput
                    value={code}
                    onChange={code => setCode(code)}
                    error={codeError}
                    onClickAction={isRunning ? <Timer minute={minutes} seconds={seconds} end={end} /> : <></>} />
                {
                    isRunning && <ConfirmCodeButton onClick={handleClickCodeConfirm}>{t("prer.confirm_btn")}</ConfirmCodeButton>
                }
                <Spacing.Vertical height={26} />

                {/* 비밀 번호 */}
                <PasswordInput />
                <Spacing.Vertical height={16} />

                {/* 비밀번호 확인 */}
                <PasswordConfirmInput />
                <Spacing.Vertical height={32} />

                <Button disable={!(password === passwordConfirm && isCodeConfirmed)} onClick={handleClickContinue} text={t("prer.continue")} />
                <Spacing.Vertical height={24} />
            </Body>
        </Container>
    );
};


const ConfirmCodeButton = styled.span` 
    display: inline-block;
    font-size: 14px;
    box-sizing: border-box;
    padding: 4px 8px;
    background-color: grey;
    border-radius: 16px;
    margin-top: 4px;
    color: white;
`;

// 3분
export const CODE_EXPIRY_TIME = new Date(new Date().setMinutes(new Date().getMinutes() + 3));

export const PHONE_NUMBER_ERROR = "유효하지 않은 휴대폰 번호입니다";
export const CODE_CONFIRM_ERROR = "인증코드가 일치하지 않습니다";

const Body = styled.div`
    padding: 0 20px;
    box-sizing: border-box;
`;

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;

export default Register;