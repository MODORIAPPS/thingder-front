import SettingFillImg from "@/assets/icon/setting_fill.png";
import styled from "@emotion/styled";
import ImgArrowBack from "@/assets/icon/arrow_back.png";
import ImgThingderLogo from "@/assets/logo/thingder_logo_actionbar.png";

interface Props {
    handleClickClose: () => void;
    handleClickGuard: () => void;
}

const ActionBar: React.FC<Props> = ({
    handleClickClose,
    handleClickGuard,
}) => {

    const onClickBack = () => handleClickClose();

    return (
        <Container>
            <Icon onClick={onClickBack} src={ImgArrowBack} />
            <ThingderLogo src={ImgThingderLogo} />
            <Icon onClick={handleClickGuard} src={SettingFillImg} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 24px;
`;

const Icon = styled.img`
    width: 27px;
    height: 25px;
`;

const ThingderLogo = styled.img`
    width: 78px;
    height: 25px;
    object-fit: contain;
`;


export default ActionBar;