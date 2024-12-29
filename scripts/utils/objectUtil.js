export class ObjectUtil {
    /**
     * オブジェクトを複製します
     * @param {any} object 
     * @returns {any}
     */
    static duplication(object) {
        return JSON.parse(JSON.stringify(object)); 
    }
}