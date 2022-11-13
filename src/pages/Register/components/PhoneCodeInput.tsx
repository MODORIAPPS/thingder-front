import TextInput from "@/components/TextInput";
import React from "react";
import LockFill from "@/assets/icon/lock_fill.svg";
import styled from "@emotion/styled";
import { InputCommonType } from "@/pages/Login/components/input.type";
import { useTranslation } from "react-i18next";

interface Props extends InputCommonType {
    onClickAction: React.ReactElement;
}

const PhoneCodeInput: React.FC<Props> = (props) => {

    const { t } = useTranslation();

    return (
        <TextInput
            leadingIcon={<EmailIcon src={LockFill} />}
            label={t("prer.code_label")}
            placeholder={t("prer.code_placeholder")}
            onChange={props.onChange}
            value={props.value}
            error={props.error}
            type="number"
            action={props.onClickAction}
        />
    );
};

const EmailIcon = styled.img`
    width: 28px;
    height: 28px;
`;

export default PhoneCodeInput;