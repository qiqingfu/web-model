/**
 * Created by qiqf on 2020/6/24
 */
import Model from "@/Model"

describe("Model", () => {
    it("model config apis", () => {
        const spy = jest.fn()
        const model = new Model({
            api: {
                send: spy,
                submit() {
                }
            }
        })
        expect(model.hasOwnProperty("send")).toBeTruthy()
        expect(model.hasOwnProperty("submit")).toBeTruthy()

        const data = {token: "abcdefghrgklmn", pass: true}
        model.send(data)

        expect(spy.mock.calls[0][0]).toEqual(data)
    })
})