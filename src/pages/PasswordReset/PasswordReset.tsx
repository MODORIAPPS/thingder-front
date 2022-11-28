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
import SendCodeButton from "../Register/components/SendCodeButton";
import { useNavigate } from "react-router-dom";

// 영문, 숫자, 특수 문자를 조합한 6자리 이상의 비밀번호 체크 
const passwordRegex = new RegExp("^((?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{6,}))");

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

    const navigate = useNavigate();

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
        try {
            const { data } = await api.main.post<{ token: string }>("/auth/email/check", {
                email,
                pin: code
            });
            setCodeError("");
            setToken(data.token)
            pause();
        } catch (e) {
            setCodeError(CODE_CONFIRM_ERROR);
        }
    };

    const handleClickContinue = async () => {
        try {
            await api.main.post("/auth/reset-password", {
                emailToken: token,
                password: pwd
            });
            navigate("/login")
        } catch (e) {
            alert("죄송합니다. 문제가 발생했습니다. 나중에 다시 시도해주세요.")
        }
    };

    const handleChangePwd = (password: string) => {
        if (isPasswordValid(password)) {
            setPwdError("");
        } else {
            const PASSWORD_INPUT_ERROR = t("prer.pwd_error");
            setPwdError(PASSWORD_INPUT_ERROR);
        }
        setPwd(password);
    };

    const handleChangePwdConfirm = (pwdConfirm: string) => {
        const PASSWORD_CONFIRM_ERROR = t("prer.pwd_c_error")

        if (pwd !== pwdConfirm) {
            setPwdError(PASSWORD_CONFIRM_ERROR);
        } else {
            setPwdError("");
        }
        setPwdC(pwdConfirm)
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
                    action={<SendCodeButton onClick={handleClickSendCode} />}
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
                    onChange={handleChangePwd}
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
                    onChange={handleChangePwdConfirm}
                    value={pwdC}
                    error={pwdCError}
                    type={visible ? "text" : "password"}
                    action={<VisibleToggle visible={visible} onChanged={(visible) => setVisible(visible)} />}
                />
                <Spacing.Vertical height={32} />

                <Button disable={!(pwd === pwdC && token)} text="계속" onClick={handleClickContinue} />
            </Container>
        </>
    );
};

const isPasswordValid = (pwd: string): boolean => {
    return passwordRegex.test(pwd);
}

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