import styled from "@emotion/styled";
import React from "react";

interface Props {
    minute: number;
    seconds: number;
    end: boolean;
}

const Timer: React.FC<Props> = ({ minute, seconds, end }) => {
    if (end) {
        return <TimerText>시간이 만료되었어요.</TimerText>
    }

    return <TimerText>{minute > 10 ? minute : "0" + minute}:{seconds > 10 ? seconds : "0" + seconds}</TimerText>
};

const TimerText = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: grey;

    margin-right: 8px;
`;

export default Timer;