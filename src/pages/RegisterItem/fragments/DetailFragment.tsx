import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import PlainTextInput from "@/components/PlainTextInput";
import styled from "@emotion/styled";
import React from "react";
import Spacing from "../../../components/Spacing";

interface Props {
    onClickBackButton: () => void;
}

const DetailFragment: React.FC<Props> = (props) => {

    const handleClickCompleteRegister = async () => { };

    return (
        <Screen>
            <ActionBar onClickBackButton={props.onClickBackButton} />
            <Spacing.Vertical height={16} />
            <PresentImage src={"https://th3.tmon.kr/thumbs/image/343/3fd/dfd/fbce85afe_700x700_95_FIT.jpg"} />
            <Container>
                <PlainTextInput
                    label={"당신을 이렇게 불러드릴게요."}
                    placeholder="별명을 입력해주세요."
                    value={""}
                    onChange={() => { }} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"당신은 어떤 물건인가요?"}
                    placeholder="물건의 종류를 입력해주세요"
                    value={""}
                    onChange={() => { }} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건의 제조국을 알려드릴게요."}
                    placeholder="제조국가를 입력해주세요."
                    value={""}
                    onChange={() => { }} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건의 브랜드를 알려주세요."}
                    placeholder="브랜드명을 입력해주세요."
                    value={""}
                    onChange={() => { }} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"당신을 이렇게 불러드릴게요."}
                    placeholder="별명을 입력해주세요."
                    value={""}
                    onChange={() => { }} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건을 이모지로만 설명해주세요."}
                    placeholder="😎 🌽 🎑 🥝 🍑 🌽 🎑 🥝"
                    value={""}
                    onChange={() => { }} />
                <Spacing.Vertical height={36} />
                <PlainTextInput
                    label={"물건에 대해 짧게 이야기해주세요."}
                    placeholder="자유롭게 소개 부탁해요."
                    value={""}
                    onChange={() => { }} />
                <Spacing.Vertical height={120} />
                <Button onClick={handleClickCompleteRegister} text="회원가입 완료!" />
                <Spacing.Vertical height={40} />
            </Container>
        </Screen>
    );
};

const Screen = styled.div`
    width: 100%;
    height: 100vh;

    overflow-y: scroll;
`;

const Container = styled.div`
    box-sizing: border-box;
    padding: 0 36px;
`;

const PresentImage = styled.img`
    width: 100%;
    max-height: 400px;

    object-fit: contain;
`;

export default DetailFragment;