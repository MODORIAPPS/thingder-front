import styled from "@emotion/styled";
import ImgChooseNegative from "../../../../../assets/button/choose_negative.svg";
import ImgChoosePositive from "../../../../../assets/button/choose_positive.svg";


interface Props {
    onClick: () => void;
}

const Negative: React.FC<Props> = ({ onClick }) => {
    return (
        <Button onClick={onClick} src={ImgChooseNegative} />
    );
};

const Positive: React.FC<Props> = ({ onClick }) => {
    return (
        <Button onClick={onClick} src={ImgChoosePositive} />
    );
};

const Button = styled.img`
    width: 60px;
    height: 60px;
    transition: .4s;

    &:active {
        opacity: .8;
    }

    cursor: pointer;
`;

const ChooseButton = {
    Negative,
    Positive
};

export default ChooseButton;