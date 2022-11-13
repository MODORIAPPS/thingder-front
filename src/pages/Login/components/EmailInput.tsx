import ImgEmail from "@/assets/icon/message_alt_fill.png";
import TextInput from "@/components/TextInput";
import styled from "@emotion/styled";
import { t } from "i18next";
import React from "react";
import { InputCommonType } from "./input.type";

interface Props extends InputCommonType {

}

const EmailInput: React.FC<Props> = (props) => {

    return (
        <TextInput
            leadingIcon={<EmailIcon src={ImgEmail} />}
            label={t("login.email")}
            placeholder={t("login.email_placeholder")}
            onChange={props.onChange}
            value={props.value}
            error={props.error}
            type="email"
        />
    );
};

const EmailIcon = styled.img`
    width: 28px;
    height: 28px;
`;

export default EmailInput;