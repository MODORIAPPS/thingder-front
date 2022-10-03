import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionBar from "../../components/ActionBar";
import Button from "../../components/Button";
import Spacing from "../../components/Spacing";
import Stack from "../../components/Stack";
import Typography from "../../components/Typography";
import RememberCheckbox from "./components/RememberCheckbox";

const Login: React.FC = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [remember, setRemember] = useState<boolean>(false);

    const handleClickLogin = async () => {

    };

    const handleClickFindPassword = () => navigate("reset");
    const handleClickRegister = () => navigate("register");

    return (
        <>
            <ActionBar />
            <Container>

                <Spacing.Vertical height={16} />
                <Typography.Header1>로그인</Typography.Header1>
                <Spacing.Vertical height={35} />




                {/* 이메일 기억하기, 비밀번호 찾기 버튼 */}
                <Stack.Horizontal>
                    <RememberCheckbox checked={remember} onChanged={value => setRemember(value)} />
                    <Typography.Subtitle4
                        onClick={handleClickFindPassword}
                        style={{ color: "#4D4D4D", paddingLeft: 35 }}>
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