import TextInput from "@/components/TextInput";
import React from "react";
import ImgEmail from "@/assets/icon/message_alt_fill.png";
import styled from "@emotion/styled";
import { InputCommonType } from "@/pages/Login/components/input.type";
import { useAppSelector } from "@/hooks/redux";

interface Props extends InputCommonType {
    onClickAction: React.ReactElement;
}

const PhoneNumberInput: React.FC<Props> = (props) => {

    return (
        <TextInput
            leadingIcon={<EmailIcon src={ImgEmail} />}
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