import PhoneFill from "@/assets/icon/phone_fill.svg";
import TextInput from "@/components/TextInput";
import { InputCommonType } from "@/pages/Login/components/input.type";
import styled from "@emotion/styled";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props extends InputCommonType {
    onClickAction: React.ReactElement;
}

const PhoneNumberInput: React.FC<Props> = (props) => {

    const { t } = useTranslation();

    return (
        <TextInput
            leadingIcon={<EmailIcon src={PhoneFill} />}
            label={t("prer.phone_label")}
            placeholder={t("prer.phone_placeholder")}
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

export default PhoneNumberInput;