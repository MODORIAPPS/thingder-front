import i18n from "@/utils/i18n";
import { useTranslation } from "react-i18next";
import Typography from "./Typography";

interface Props {
    genYear: number;
    genMonth: number;
    slateColor?: boolean;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ManufacturedDateView: React.FC<Props> = (
    {
        genYear,
        genMonth,
        slateColor
    }
) => {

    const { t } = useTranslation();
    const isKorean = i18n.language === "kr";

    if (isKorean) {
        return <p className={`mt-1 text-sm ${slateColor && 'text-slate-500'} mt-1`}>{t("detail.gen")} : {genYear}{t("detail.year")} {genMonth}{t("detail.month")}</p>
    }

    return <p className={`mt-1 text-sm ${slateColor && 'text-slate-500'} mt-1`}>Produced by : {monthNames[genMonth - 1]}, {genYear}</p>
};

export default ManufacturedDateView;