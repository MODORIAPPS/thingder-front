import { Divider, Input } from "@/components/PlainTextInput";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import { isMobile } from "@/utils/native";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

interface Props {
    /** ex) 2022-02 */
    value: string;

    /** ex) 2022-02 */
    onChange: (date: string) => void;
}

const InputMadeAt: React.FC<Props> = ({ value, onChange }) => {

    const { t } = useTranslation();
    /** Mobile DatePicker Ref */
    const mobileDPRef = useRef<HTMLInputElement>(null);
    const handleClickMobileDP = () => {
        if (iOS()) {
            mobileDPRef?.current?.focus();
        }else{
            mobileDPRef.current?.click();
        }
    }
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
            <Typography.Body2 style={{ color: "rgba(0, 0, 0, 0.75)" }}>{t("register.made_at_label")}</Typography.Body2>
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


function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

const MonthInput = styled.input`
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    position: absolute;
    opacity: 0;
`;

export default InputMadeAt