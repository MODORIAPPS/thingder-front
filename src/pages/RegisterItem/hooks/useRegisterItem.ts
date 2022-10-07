import { useState } from "react";

const useRegisterItem = () => {
    const [state, setState] = useState<RegisterItemState>(initState);

    
};

const initState: RegisterItemState = {
    nickname: "",
    type: "",
    madeAt: "",
    madeIn: "",
    brand: "",
    features5: [],
    onlyEmojDesc: "",
    shortDesc: ""
}

export default useRegisterItem;

interface RegisterItemState {
    /**
     * 별명
     */
    nickname: string;

    /**
     * 물건의 종류
     */
    type: string;

    /**
     * 제조 년월일
     */
    madeAt: string;

    /**
     * 물건의 제조국
     */
    madeIn: string;

    /**
     * 브랜드
     */
    brand: string;

    /**
     * 물건의 대표하는 물질성 5가지
     */
    features5: string[];

    /**
     * 물건을 이모지로만 설명
     */
    onlyEmojDesc: string;

    /**
     * 물건에 대해 짧게 설명
     */
    shortDesc: string;
}