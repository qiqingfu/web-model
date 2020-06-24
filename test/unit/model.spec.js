/**
 * Created by qiqf on 2020/6/24
 */
import Model from "@/Model"

describe("Model", () => {
    it("model config api", () => {
        const spy = jest.fn()
        const model = new Model({
            api: {
                submit() {},
                getUser() {},
            }
        })
        expect(model.hasOwnProperty("submit")).toBeTruthy()
        expect(model.hasOwnProperty("getUser")).toBeTruthy()
    })

    it("whether the function call parameters are correct", () => {
        const spy = jest.fn()
        const model = new Model({
            api: {
                send: spy,
            }
        })
        const data = {token: "abcdefghrgklmn", pass: true}
        model.send(data)

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0]).toEqual(data)
    })

    it("the base field for the Model option", () => {
        const base = "https://api.github.com"
        const model = new Model({
            base,
        })

        expect(model).toHaveProperty("_base", base)
    })
})