import { useState } from "react";

interface RegisterState {
    email: string;
    emailError: string;

    phoneNumber: string;
    phoneNumberError: string;

    confirmCode: string;
    confirmCodeError: string;

    pwd: string;
    pwdError: string;

    pwdConfirm: string;
    pwdConfirmError: string;
}

const useRegister = () => {
    const [state, setState] = useState(initState);
    const handleChange = (key: keyof RegisterState, value: string) => {
        setState({ ...state, [key]: value } as Pick<RegisterState, keyof RegisterState>);
    };

    return {
        state,
        handleChange
    }
};

const initState: RegisterState = {
    email: "",
    emailError: "",
    phoneNumber: "",
    phoneNumberError: "",
    confirmCode: "",
    pwd: "",
    pwdError: "",
    pwdConfirm: "",
    pwdConfirmError: "",
    confirmCodeError: ""
}

export default useRegister;