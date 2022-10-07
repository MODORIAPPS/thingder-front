import api, { ACCESS_TOKEN_KEY } from "@/api";
import { useAppDispatch } from "@/hooks/redux";
import { signInUser } from "@/store/user/user.reducer";
import styled from "@emotion/styled";
import React, { useState } from "react";
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

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [pwd, setPwd] = useState("");
    const [pwdError, setPwdError] = useState("");

    const [remember, setRemember] = useState<boolean>(false);

    const handleClickLogin = async () => {
        try {
            const { data } = await api.main.post<LoginResponse>("/auth/login", {
                email,
                password: pwd
            });

            localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
            dispatch(signInUser());
        } catch (e) {
            setEmailError("유효하지 않은 이메일 주소입니다.");
            setPwdError("비밀번호가 일치하지 않습니다.")
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
    const handleClickRegister = () => navigate("register");

    return (
        <>
            <ActionBar />
            <Container>
                <Spacing.Vertical height={16} />
                <Typography.Header1>로그인</Typography.Header1>
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
                        비밀번호 찾기
                    </Typography.Subtitle4>
                </Stack.Horizontal>

                {/* 로그인 버튼 */}
                <Spacing.Vertical height={50} />
                <Button onClick={handleClickLogin} text="로그인" />
                <Spacing.Vertical height={15} />

                {/* 회원가입 버튼 */}
                <div
                    onClick={handleClickRegister}
                    style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <span>
                        아직 계정이 없다면,
                        <b style={{ fontWeight: "bold", color: "#FF5100" }}> 회원가입</b>
                    </span>
                </div>
            </Container>
        </>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    
    box-sizing: border-box;
    padding: 0 20px;
`;

export default Login;