import ImgKey from "@/assets/icon/key_alt_fill.png";
import TextInput from "@/components/TextInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import VisibleToggle from "@/pages/Register/components/VisibleToggle";
import { changeRegisterProperty } from "@/store/register/register.reducer";
import styled from "@emotion/styled";
import React, { useState } from "react";

const PASSWORD_INPUT_ERROR = "영문, 숫자, 특수문자를 조합한 6자리 이상의 비밀번호를 입력해 주세요";

const PasswordInput: React.FC = () => {

    const dispatch = useAppDispatch();

    // Password visibility
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");

    const password = useAppSelector(state => state.register.password);

    const handleChange = (password: string) => {
        if (isPasswordValid(password)) {
            setError("");
        } else {
            setError(PASSWORD_INPUT_ERROR);
        }

        dispatch(changeRegisterProperty({ password }));
    }

    return (
        <TextInput
            leadingIcon={<PasswordIcon src={ImgKey} />}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            value={password}
            error={error}
            type={visible ? "text" : "password"}
            action={<VisibleToggle visible={visible} onChanged={(visible) => setVisible(visible)} />}
        />
    );
};

const isPasswordValid = (pwd: string): boolean => {
    return true;
}

const PasswordIcon = styled.img`
    width: 28px;
    height: 28px;
`;

export default PasswordInput;