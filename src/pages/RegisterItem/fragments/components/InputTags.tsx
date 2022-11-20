import { Divider } from '@/components/PlainTextInput';
import Spacing from '@/components/Spacing';
import Typography from '@/components/Typography';
import { useTranslation } from 'react-i18next';
import TagsInput from 'react-tagsinput'

interface Props {
    tags: string[];
    setTags: (tags: string[]) => void;
}

const InputTags: React.FC<Props> = (
    {
        tags,
        setTags
    }
) => {

    const { t } = useTranslation();

    const handleChange = (tags: string[], changed: string[]) => {
        if (tags.length > 5) return;
        setTags(tags);
    };

    return (
        <>
            <Typography.Body2 style={{ color: "rgba(0, 0, 0, 0.75)" }}>{t("register.type_label")}</Typography.Body2>
            <Spacing.Vertical height={11} />
            <form>
                <TagsInput
                    value={tags}
                    onChange={handleChange}
                    inputProps={{
                        placeholder: t("register.type_placeholder")
                    }} />
            </form>
            <Spacing.Vertical height={2} />
            <Divider />
        </>

    );
};

export default InputTags;