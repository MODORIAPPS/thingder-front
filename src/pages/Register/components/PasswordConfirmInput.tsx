import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import ImgKey from "@/assets/icon/key_alt_fill.png";
import styled from "@emotion/styled";
import VisibleToggle from "./VisibleToggle";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeRegisterProperty } from "@/store/register/register.reducer";

const PASSWORD_CONFIRM_ERROR = "비밀번호가 일치하지 않습니다";

const PasswordConfirmInput: React.FC = () => {

    const dispatch = useAppDispatch();

    // Password visibility
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");

    const password = useAppSelector(state => state.register.password);
    const passwordConfirm = useAppSelector(state => state.register.passwordConfirm);

    const handleChange = (pwdConfirm: string) => {
        if (password !== pwdConfirm) {
            setError(PASSWORD_CONFIRM_ERROR);
        } else {
            setError("");
        }

        dispatch(changeRegisterProperty({ passwordConfirm: pwdConfirm }))
    };

    return (
        <TextInput
            leadingIcon={<Icon src={ImgKey} />}
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={handleChange}
            value={passwordConfirm}
            error={error}
            type={visible ? "text" : "password"}
            action={<VisibleToggle visible={visible} onChanged={(visible) => setVisible(visible)} />}
        />
    );
};

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;

export default PasswordConfirmInput;