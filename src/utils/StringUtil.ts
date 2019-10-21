export default class StringUtil {
    /**
     * 判断字符串是否为空
     * @param param
     */
    public isNull(param: string) {
        if (typeof param === 'undefined' || param === null || param === '') {
            return true;
        } else {
            return false;
        }
    }
}
