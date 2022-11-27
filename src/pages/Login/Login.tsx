import api, { ACCESS_TOKEN_KEY } from "@/api";
import { useAppDispatch } from "@/hooks/redux";
import { signInUser } from "@/store/user/user.reducer";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ActionBar from "../../components/ActionBar";
import Button from "../../components/Button";
import Spacing from "../../components/Spacing";
import Stack from "../../components/Stack";
import Typography from "../../components/Typography";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import RememberCheckbox from "./components/RememberCheckbox";

interface LoginResponse {
    email: string;
    expiration: number;
    token: string;
}

const Login: React.FC = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState(window.localStorage.getItem("email") || "");
    const [emailError, setEmailError] = useState("");

    const [pwd, setPwd] = useState("");
    const [pwdError, setPwdError] = useState("");

    const [remember, setRemember] = useState<boolean>(false);

    const handleClickLogin = async () => {
        try {
            remember ? window.localStorage.setItem("email", email) : window.localStorage.removeItem("email");
            api.main.defaults.headers.common['Authorization'] = "";
            const { data } = await api.main.post<LoginResponse>("/auth/login", {
                email,
                password: pwd
            });

            localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
            dispatch(signInUser(data.token));
        } catch (e) {
            setEmailError(t("login.email_error"));
            setPwdError(t("login.pwd_error"))
        }
    };

    const clearError = () => {
        setEmailError("");
        setPwdError("");
    }

    const handleChangeEmail = (email: string) => {
        setEmail(email);
        clearError();
    };

    const handleChangePassword = (password: string) => {
        setPwd(password);
        clearError();
    }

    const handleClickFindPassword = () => navigate("reset");
    const handleClickRegister = () => {
        api.main.defaults.headers.common['Authorization'] = "";
        navigate("register");
    }

    return (
        <>
            <ActionBar />
            <Container>
                <Spacing.Vertical height={16} />
                <Typography.Header1>{t("login.title")}</Typography.Header1>
                <Spacing.Vertical height={35} />

                <EmailInput value={email} onChange={handleChangeEmail} error={emailError} />
                <Spacing.Vertical height={18} />
                <PasswordInput value={pwd} onChange={handleChangePassword} error={pwdError} />

                {/* 이메일 기억하기, 비밀번호 찾기 버튼 */}
                <Spacing.Vertical height={26} />
                <Stack.Horizontal>
                    <RememberCheckbox checked={remember} onChanged={value => setRemember(value)} />
                    <Typography.Subtitle4
                        onClick={handleClickFindPassword}
                        style={{ color: "#4D4D4D", paddingLeft: 35, fontWeight: "normal" }}>
                        {t("login.pwd_find")}
                    </Typography.Subtitle4>
                </Stack.Horizontal>

                {/* 로그인 버튼 */}
                <Spacing.Vertical height={50} />
                <Button onClick={handleClickLogin} text={t("login.login_button")} />
                <Spacing.Vertical height={15} />

                {/* 회원가입 버튼 */}
                <div
                    onClick={handleClickRegister}
                    style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <span>
                        {t("login.if_you_dont")}
                        <b style={{ fontWeight: "bold", color: "#FF5100" }}> {t("login.register")}</b>
                    </span>
                </div>
            </Container>
        </>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    
    box-sizing: border-box;
    padding: 0 20px;
`;

export default Login;