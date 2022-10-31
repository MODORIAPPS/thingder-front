export interface RegisterState {
    email: string;
    brand: string;
    description: string;
    genCountry: string;
    
    madeAt: string;

    images: RegisterImage[];

    nickname: string;
    password: string;
    passwordConfirm: string;

    story: string;
    tag: string;
    type: string;

    /**
    * Authentication Tokens
    */
    pinToken: string;
}

export interface RegisterImage {
    src: string;
    srcSet: string;
}