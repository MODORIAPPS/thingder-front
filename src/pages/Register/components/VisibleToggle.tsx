import React from "react";

import ImgInvisible from "@/assets/icon/invisible.svg";
import ImgVisible from "@/assets/icon/invisible.svg";
import styled from "@emotion/styled";

interface Props {
    visible: boolean;
    onChanged: (visible: boolean) => void;
}

const VisibleToggle: React.FC<Props> = (props) => {
    return <Icon onClick={() => props.onChanged(!props.visible)} src={props.visible ? ImgVisible : ImgInvisible} />
};

const Icon = styled.img`
    width: 15px;
    height: 15px;

    margin-right: 8px;

    object-fit: contain;
`;

export default VisibleToggle;