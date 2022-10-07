import ImgEmail from "@/assets/icon/message_alt_fill.png";
import TextInput from "@/components/TextInput";
import styled from "@emotion/styled";
import React from "react";
import { InputCommonType } from "./input.type";

const EMAIL_INPUT_ERROR = "유효하지 않은 이메일 주소입니다";


interface Props extends InputCommonType {

}

const EmailInput: React.FC<Props> = (props) => {

    return (
        <TextInput
            leadingIcon={<EmailIcon src={ImgEmail} />}
            label="이메일"
            placeholder="이메일 주소를 입력해주세요"
            onChange={props.onChange}
            value={props.value}
            error={props.error}
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