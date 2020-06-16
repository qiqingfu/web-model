/**
 * Created by qiqf on 2020/6/16
 */
import Model from "web-model";

export default new Model({
    base: "https://api.github.com",
    api: {
        getUser(username) {
            return this.request.get(`/users/${username}`)
        },
        /**
         *
         * @param query
         *  - user 用户名
         *  - name 仓库名
         * @return {*}
         */
        getStorage(query) {
            return this.request.get(`/repos/${query.user}/${query.name}`)
        }
    }
})