import { MemberDTO } from "@/@types/Member";

export interface User {
    type: "USER" | "ADMIN";
    uid: string;
    member: MemberDTO;
}