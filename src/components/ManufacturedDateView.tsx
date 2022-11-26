import i18n from "@/utils/i18n";
import { useTranslation } from "react-i18next";
import Typography from "./Typography";

interface Props {
    genYear: number;
    genMonth: number;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ManufacturedDateView: React.FC<Props> = (
    {
        genYear,
        genMonth,
    }
) => {

    const { t } = useTranslation();
    const isKorean = i18n.language === "kr";

    if (isKorean) {
        return <Typography.Caution1 className="mt-1">{genYear}{t("detail.year")} {genMonth}{t("detail.month")} {t("detail.gen")}</Typography.Caution1>
    }

    return <Typography.Caution1 className="mt-1">Made in {monthNames[genMonth - 1]}, {genYear}</Typography.Caution1>
};

export default ManufacturedDateView;