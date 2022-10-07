import TextInput from "@/components/TextInput";
import React from "react";
import ImgKey from "@/assets/icon/key_alt_fill.png";
import styled from "@emotion/styled";
import { InputCommonType } from "@/pages/Login/components/input.type";

interface Props extends InputCommonType {

}

const PasswordInput: React.FC<Props> = (props) => {
    return (
        <TextInput
            leadingIcon={<PasswordIcon src={ImgKey} />}
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
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