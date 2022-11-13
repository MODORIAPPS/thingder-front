import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import Spacing from "@/components/Spacing";
import TextInput from "@/components/TextInput";
import styled from "@emotion/styled";
import React, { useState } from "react";
import Typography from "../../components/Typography";
import PasswordConfirmInput from "../Register/components/PasswordConfirmInput";
import ImgKey from "@/assets/icon/key_alt_fill.png";
import VisibleToggle from "../Register/components/VisibleToggle";
import { useTranslation } from "react-i18next";
import ImgEmail from "@/assets/icon/message_alt_fill.png";
import PhoneCodeInput from "../Register/components/PhoneCodeInput";
import { useTimer } from "react-timer-hook";
import { CODE_CONFIRM_ERROR, CODE_EXPIRY_TIME } from "../Register/Register";
import api from "@/api";
import Timer from "../Register/components/Timer";

const PasswordReset: React.FC = () => {

    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdC, setPwdC] = useState("");
    const [token, setToken] = useState("");

    const [emailError, setEmailError] = useState("");
    const [codeError, setCodeError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [pwdCError, setPwdCError] = useState("");

    /** Password Visiblity */
    const [visible, setVisible] = useState(false);

    const { seconds, minutes, isRunning, restart, pause } = useTimer({
        expiryTimestamp: CODE_EXPIRY_TIME,
        onExpire: () => setEnd(true),
        autoStart: false
    });

    // 인증 번호 전송 종료 여부
    const [end, setEnd] = useState(false);

    const handleClickSendCode = async () => {
        if (isRunning) {
            restart(CODE_EXPIRY_TIME, true);
            return;
        }

        try {
            const { data } = await api.main.post("/auth/email/send?email=" + email);
            setEmailError("");
            const CODE_EXPIRY_TIME = new Date(new Date().setMinutes(new Date().getMinutes() + 3));
            restart(CODE_EXPIRY_TIME, true);
            setEnd(false);
        } catch (e) {
            console.error(e);
            setEmailError("PHONE_NUMBER_ERROR");
        }
    };


    const handleClickCodeConfirm = async () => {
        // try {
        //     const { data } = await api.main.post<PinCheckResponse>("/auth/pin/check", { phone, pin: code });
        //     setCodeError("");
        //     setToken(data.)
        //     toast(t("prer.confirm_toast"));
        //     pause();
        // } catch (e) {
        //     setCodeError(CODE_CONFIRM_ERROR);
        // }
    };

    const handleClickContinue = () => {

    };

    return (
        <>
            <ActionBar />
            <Spacing.Vertical height={16} />
            <Container>
                <Typography.Header1>비밀번호 재설정</Typography.Header1>

                <Spacing.Vertical height={36} />

                <TextInput
                    leadingIcon={<Icon src={ImgEmail} />}
                    label={t("login.email")}
                    placeholder={t("login.email_placeholder")}
                    onChange={setEmail}
                    value={email}
                    error={emailError}
                    type="email"
                />
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
                <Spacing.Vertical height={16} />
                <TextInput
                    leadingIcon={<Icon src={ImgKey} />}
                    label={t("prer.pwd_label")}
                    placeholder={t("prer.pwd_placeholder")}
                    onChange={setPwd}
                    value={pwd}
                    error={pwdError}
                    type={visible ? "text" : "password"}
                    action={<VisibleToggle visible={visible} onChanged={(visible) => setVisible(visible)} />}
                />
                <Spacing.Vertical height={16} />

                <TextInput
                    leadingIcon={<Icon src={ImgKey} />}
                    label={t("prer.pwd_c_label")}
                    placeholder={t("prer.pwd_c_placeholder")}
                    onChange={setPwdC}
                    value={pwdC}
                    error={pwdCError}
                    type={visible ? "text" : "password"}
                    action={<VisibleToggle visible={visible} onChanged={(visible) => setVisible(visible)} />}
                />
                <Spacing.Vertical height={32} />

                <Button text="계속" onClick={handleClickContinue} />
            </Container>
        </>
    );
};

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;

const Container = styled.div`
    padding: 0 20px;
    box-sizing: border-box;
`;

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

export default PasswordReset;