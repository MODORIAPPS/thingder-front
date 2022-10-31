import { Divider, Input } from "@/components/PlainTextInput";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import dayjs from "dayjs";
import React, { forwardRef, LegacyRef, ReactElement, useState } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";

interface Props {
    /** ex) 2022-02 */
    value: string;

    /** ex) 2022-02 */
    onChange: (date: string) => void;
}

const InputMadeAt: React.FC<Props> = ({ value, onChange }) => {

    const ExampleCustomInput = forwardRef<HTMLInputElement,
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
    >(({ onClick, ref }) => (
        <Input
            onClick={onClick}
            ref={ref}
            readOnly={true}
            placeholder={"__년 __ 월"}
            value={dayjs(new Date(value)).format("YYYY년 MM월")} />
    ));

    return (
        <>
            <Typography.Body2 style={{ color: "rgba(0, 0, 0, 0.75)" }}>물건의 제조년도를 알려주세요.</Typography.Body2>
            <Spacing.Vertical height={11} />
            <DatePicker
                selected={new Date(value)}
                dateFormat="MM/yyyy"
                onChange={(date: Date) => onChange(dayjs(date).format("YYYY-MM"))}
                customInput={<ExampleCustomInput />}
            />

            <Spacing.Vertical height={2} />
            <Divider />
        </>
    );
};

export default InputMadeAt