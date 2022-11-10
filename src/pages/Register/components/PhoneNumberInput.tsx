import PhoneFill from "@/assets/icon/phone_fill.svg";
import TextInput from "@/components/TextInput";
import { InputCommonType } from "@/pages/Login/components/input.type";
import styled from "@emotion/styled";
import React from "react";

interface Props extends InputCommonType {
    onClickAction: React.ReactElement;
}

const PhoneNumberInput: React.FC<Props> = (props) => {

    return (
        <TextInput
            leadingIcon={<EmailIcon src={PhoneFill} />}
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해 주세요"
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