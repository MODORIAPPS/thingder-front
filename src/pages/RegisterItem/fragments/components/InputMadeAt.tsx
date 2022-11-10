import { Divider, Input } from "@/components/PlainTextInput";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import { isMobile } from "@/utils/native";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";

interface Props {
    /** ex) 2022-02 */
    value: string;

    /** ex) 2022-02 */
    onChange: (date: string) => void;
}

const InputMadeAt: React.FC<Props> = ({ value, onChange }) => {

    /** Mobile DatePicker Ref */
    const mobileDPRef = useRef<HTMLInputElement>(null);
    const handleClickMobileDP = () => mobileDPRef?.current?.focus();
    const handleChangeMobileDateDP = (value: any) => onChange(value);

    const PCDatePickerInput = forwardRef<HTMLInputElement,
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
    >(({ onClick }, ref) => (
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

            {
                isMobile() ?
                    <>
                        <Input
                            onClick={handleClickMobileDP}
                            readOnly={true}
                            placeholder={"__년 __ 월"}
                            value={dayjs(new Date(value)).format("YYYY년 MM월")} />
                        <MonthInput
                            ref={mobileDPRef}
                            type="month"
                            style={{ width: 1, height: 1 }}
                            onChange={e => handleChangeMobileDateDP(e.target.value)} />
                    </>
                    :
                    <DatePicker
                        selected={new Date(value)}
                        dateFormat="MM/yyyy"
                        scrollableMonthYearDropdown={true}
                        showYearDropdown
                        showMonthDropdown
                        yearDropdownItemNumber={100}
                        onChange={(date: Date) => onChange(dayjs(date).format("YYYY-MM"))}
                        customInput={<PCDatePickerInput />}
                    />

            }


            <Spacing.Vertical height={2} />
            <Divider />
        </>
    );
};

const MonthInput = styled.input`
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
`;

export default InputMadeAt