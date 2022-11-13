import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import ImgEmail from "@/assets/icon/message_alt_fill.png";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeRegisterProperty } from "@/store/register/register.reducer";
import { useTranslation } from "react-i18next";


const EmailInput: React.FC = () => {

    const { t } = useTranslation();

    const email = useAppSelector(state => state.register.email);
    const dispatch = useAppDispatch();
    const [error, setError] = useState("")

    const handleChange = (email: string) => {
        if (!isEmailValid(email)) {
            const EMAIL_INPUT_ERROR = t("prer.email_error");
            setError(EMAIL_INPUT_ERROR);
        } else {
            setError("");
        }

        dispatch(changeRegisterProperty({ email }));
    };

    return (
        <TextInput
            leadingIcon={<EmailIcon src={ImgEmail} />}
            label={t("prer.email_label")}
            placeholder={t("prer.email_placeholder")}
            onChange={handleChange}
            value={email}
            error={error}
            type="email"
        />
    );
};

const isEmailValid = (email: string) => {
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return reg_email.test(email);
}


const EmailIcon = styled.img`
    width: 28px;
    height: 28px;
`;

export default EmailInput;