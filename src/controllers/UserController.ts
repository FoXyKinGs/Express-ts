import { Request, Response } from "express"
import IController from "./ControllersInterface"

let data: any[] = [
    { id: 1, name: "Jhon"},
    { id: 2, name: "Doe"},
    { id: 3, name: "Alexa"},
    { id: 4, name: "Samuel"},
]

class UserController implements IController {
    index(req: Request, res: Response): Response {
        return res.send(data)
    }
    create(req: Request, res: Response): Response {
        const { id, name } = req.body

        data.push({
            id,
            name
        })

        return res.send("Create Success")
    }
    show(req: Request, res: Response): Response {
        const { id } = req.params

        let result = data.find(item => item.id == id)

        return res.send(result)
    }
    update(req: Request, res: Response): Response {
        const { id } = req.params
        const { name } = req.body

        let result = data.find(item => item.id == id)
        result.name = name

        return res.send("Update Success")
    }
    delete(req: Request, res: Response): Response {
        const { id } = req.params

        let result = data.filter(item => item.id != id)

        return res.send(result)
    }
    
}

export default new UserController()
