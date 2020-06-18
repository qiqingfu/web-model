/**
 * Created by qiqf on 2020/6/16
 */
import Model from "web-model";

Model.use({
    beforeEach(next) {
        console.log("全局的前置拦截器")
        next()
    },
    afterEach(err, res) {
        console.log("global err", err)
        console.log("global res", res)
        console.log("全局的后置拦截器")
    }
})

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
    },
    beforeEach(next) {
        console.log("实例请求前置拦截器 this", this)
        next()
    },
    afterEach(err, res) {
        console.log("实例请求后置拦截器 err", err)
        console.log("实例请求后置拦截器 res", res)

        if (err) return false;

        res._name = "zhangsan"

        return res;
    }
})
