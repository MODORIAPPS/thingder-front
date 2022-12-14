/**
 * 휴대전화 번호 사이에 - 넣어서 반환
 */
export const formatPhoneNumberHypen = (text?: string) => {
    if (!text) return "";
    return text
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
};

/**
 * srcSet 상대경로를 절대경로로 바꿔줌
 * @param srcSet 원본 srcSet
 */
export const formatRelativeToAbsoluteURL = (srcSet: string) => {
    const URL = import.meta.env.VITE_API_CLIENT_BASEURL;
    let newArray: string[] = [];
    const array = srcSet.split(", ");

    array.forEach(item => {
        newArray.push(" " + URL + item);
    });

    return newArray.toString();
};