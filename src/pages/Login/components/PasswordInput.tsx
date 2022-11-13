import TextInput from "@/components/TextInput";
import React from "react";
import ImgKey from "@/assets/icon/key_alt_fill.png";
import styled from "@emotion/styled";
import { InputCommonType } from "@/pages/Login/components/input.type";
import { t } from "i18next";

interface Props extends InputCommonType {

}

const PasswordInput: React.FC<Props> = (props) => {
    return (
        <TextInput
            leadingIcon={<PasswordIcon src={ImgKey} />}
            label={t("login.pwd")}
            placeholder={t("login.pwd_placeholder")}
            onChange={props.onChange}
            value={props.value}
            error={props.error}
            type="password"
        />
    );
};

const PasswordIcon = styled.img`
    width: 28px;
    height: 28px;
`;

export default PasswordInput;