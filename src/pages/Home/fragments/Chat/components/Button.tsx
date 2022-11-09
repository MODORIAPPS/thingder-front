import styled from "@emotion/styled";

const Button = styled.div<{
    backgroundColor: string;
    textColor: string;
}>`
    width: 146px;
    height: 53px;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    font-weight: bold;
    
    font-size: 18px;
    line-height: 26px;

    border-radius: 32px;

    text-align: center;
    
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Button;