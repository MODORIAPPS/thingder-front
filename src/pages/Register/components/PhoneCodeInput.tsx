import TextInput from "@/components/TextInput";
import React from "react";
import ImgEmail from "@/assets/icon/message_alt_fill.png";
import styled from "@emotion/styled";
import { InputCommonType } from "@/pages/Login/components/input.type";

interface Props extends InputCommonType {
    onClickAction: React.ReactElement;
}

const PhoneCodeInput: React.FC<Props> = (props) => {
    return (
        <TextInput
            leadingIcon={<EmailIcon src={ImgEmail} />}
            label="인증 코드"
            placeholder="인증 코드 6자리를 입력해주세요"
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