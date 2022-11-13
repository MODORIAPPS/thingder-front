export interface User {
    isLogin: boolean;
    type: "USER" | "ADMIN";
    uid: string;
}