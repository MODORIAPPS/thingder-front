export interface AdminMemberDTO {
    uid: string;
    brand: string;
    genCountry: string;
    genMonth: number;
    genYear: number;
    image: Image;
    nickname: string;
    type: string;
}

export interface MemberDTO {
    uid: string;
    images: Image[] | ImageWithOutUid[];
    nickname: string;
    type: string;
    genYear: number;
    genMonth: number;
    genCountry: string;
    brand: string;
    tag: string;
    description: string;
    story: string;
}

interface Image extends ImageWithOutUid{
    uid: string;
}

interface ImageWithOutUid {
    src: string;
    srcSet: string;
}