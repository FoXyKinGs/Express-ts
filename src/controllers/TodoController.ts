import { Request, Response } from "express"
import IController from "./ControllersInterface"
const db = require("../db/models")

class TodoController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.app.locals.credential

        const todo = await db.todo.findAll({
            where: { user_id: id },
            attributes: ["id", "description"]
        })
        
        return res.send({
            data: todo,
            message: "success"
        })
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.app.locals.credential
        const { description } = req.body

        const todo = await db.todo.create({
            user_id: id,
            description
        })
        todo
        return res.send({
            data: todo,
            message: "Todo created"
        })
    }
    show = async (req: Request, res: Response): Promise<Response> => {
        const { id: user_id } = req.app.locals.credential
        const { id } = req.params

        const todo = await db.todo.findOne({
            where: { id, user_id }
        })

        return res.send({
            data: todo,
            message: "success"
        })
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        const { id: user_id } = req.app.locals.credential
        const { id } = req.params
        const { description } = req.body

        await db.todo.update({
            description
        }, {
            where: { id, user_id }
        })

        return res.send({
            data: "",
            message: "Data updated"
        })
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id: user_id } = req.app.locals.credential
        const { id } = req.params

        await db.todo.destroy({
            where: { id, user_id }
        })

        return res.send({
            data: "",
            message: "Data deleted"
        })
    }
    
}

export default new TodoController()
