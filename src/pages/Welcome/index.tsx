import React, { useState } from "react";
import Button from "../../components/Button";
import DescFragment from "./fragments/DescFragment";
import StartFragment from "./fragments/StartFragment";

const Welcome: React.FC = () => {

    const [page, setPage] = useState<"start" | "desc">("start");

    const handleClickHello = () => setPage("desc");
    const handleClickShare = () => {

    };

    const handleClickStartService = () => {

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