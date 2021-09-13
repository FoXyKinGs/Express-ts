import { Request, Response } from "express"
import Authentication from "../utils/Authentication"
const db = require("../db/models")

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        let { username, password } = req.body
        const hashPassword: string = await Authentication.passwordHash(password) 

        await db.user.create({ username, password: hashPassword })

        return res.send("Register success")
    }
    login = async (req: Request, res: Response): Promise<Response> => {
        let { username, password } = req.body
        const user = await db.user.findOne({
            where: { username }
        })
            if(user) {
            let compare: boolean = await Authentication.compare(password, user.password)

            if(compare) {
                let token = Authentication.generateToken(user.id, user.username, user.password)
                return res.send({
                    token
                })
            }

            return res.send("Password wrong")
        }

        return res.send("User not found")
    }
    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credential)
    }
}

export default new AuthController()
