import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import DescFragment from "./fragments/DescFragment";
import StartFragment from "./fragments/StartFragment";

const Welcome: React.FC = () => {

    const navigate = useNavigate();
    const [page, setPage] = useState<"start" | "desc">("start");

    const handleClickHello = () => setPage("desc");
    const handleClickShare = () => {
        alert("공유에 어떤 텍스트를 넣을 것인지 정해야합니다.")
    };

    const handleClickStartService = () => {
        navigate("/auth")
    }; 

    return (
        <>
            {
                page === "start"
                    ?
                    <StartFragment handleClickHello={handleClickHello} />
                    :
                    <DescFragment
                        handleClickStartService={handleClickStartService}
                        handleClickShare={handleClickShare} />
            }
        </>
    );
};

export default Welcome;