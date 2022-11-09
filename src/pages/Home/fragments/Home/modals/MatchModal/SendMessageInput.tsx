import styled from "@emotion/styled";
import React from "react";

/** Images */
import SendFillImg from "@/assets/icon/send_fill.png";

interface Props {
    text: string;
    onChangeText: (text: string) => void;
    onClickSend: () => void;
}

const SendMessageInput: React.FC<Props> = (
    {
        text,
        onChangeText,
        onClickSend
    }
) => {
    return (
        <Container>
            <Input
                value={text}
                onChange={e => onChangeText(e.target.value)}
                placeholder="이모지로만 대화해 보세요!"
            />
            <Button>
                <SendFill src={SendFillImg} />
            </Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 43px;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid rgba(242, 242, 242, 1);
    border-radius: 22px;
`;

const Input = styled.input`
    flex: 1;
    margin-left: 15px;
    background-color: white;
    border: none;
    font-size: 14px;
    font-weight: bold;

    &:focus{
        outline: none;
    }

    ::placeholder {
        color: rgba(0, 0, 0, 0.25);
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 43px;
    box-sizing: border-box;
    padding: 11px 14px 11px 8px;
    background: rgba(242, 242, 242, 1);
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
`;

const SendFill = styled.img`
    width: 32px;
    height: 32px;
`;


export default SendMessageInput;