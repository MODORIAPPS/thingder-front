import { RegisterImage } from "../register/register.type";

export interface EditMyPageState {
    brand: string;
    description: string;
    genCountry: string;

    madeAt: string;

    images: RegisterImage[];

    nickname: string;

    story: string;
    tag: string;
    type: string;
}