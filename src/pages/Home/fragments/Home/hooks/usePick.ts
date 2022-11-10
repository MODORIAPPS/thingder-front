import api from "@/api";
import { RELATION } from "@/pageModal/ItemDetail/ItemDetailModal";
import { Direction } from "../types";

const usePick = (uid: string, direction: Direction) => {
    return api.main.post<{ chatUid: string, match: true }>("/matching/pick", {
        uid,
        relation: direction === "left" ? RELATION.BLOCK : RELATION.LIKE
    })
};

export default usePick;