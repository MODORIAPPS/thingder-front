import { Divider } from "@/components/PlainTextInput";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import React from "react";

const InputMadeAt: React.FC = () => {
    return (
        <>
            {/* <Typography.Body2 style={{ color: "rgba(0, 0, 0, 0.75)" }}>{label}</Typography.Body2> */}
            <Spacing.Vertical height={11} />
            {/* <Input
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.currentTarget.value)} /> */}
            <Spacing.Vertical height={2} />
            <Divider />
        </>
    );
};

export default InputMadeAt