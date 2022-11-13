import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import ImgKey from "@/assets/icon/key_alt_fill.png";
import styled from "@emotion/styled";
import VisibleToggle from "./VisibleToggle";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeRegisterProperty } from "@/store/register/register.reducer";
import { useTranslation } from "react-i18next";


const PasswordConfirmInput: React.FC = () => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    // Password visibility
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");

    const password = useAppSelector(state => state.register.password);
    const passwordConfirm = useAppSelector(state => state.register.passwordConfirm);

    const handleChange = (pwdConfirm: string) => {
        const PASSWORD_CONFIRM_ERROR = t("prer.pwd_c_error")

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
            label={t("prer.pwd_c_label")}
            placeholder={t("prer.pwd_c_placeholder")}
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