import express, { Application, Request, Response, Router } from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import { config as dotenv } from "dotenv"

// Routers
import UserRoutes from "./routers/UserRoutes"
import AuthRoutes from "./routers/AuthRoutes"
import TodoRoutes from "./routers/TodoRoutes"

class App {
    public app: Application

    constructor() {
        dotenv()
        this.app = express()
        this.plugins()
        this.routes()
    }

    protected plugins(): void {
        this.app.use(bodyParser.json())
        this.app.use(morgan("dev"))
        this.app.use(compression())
        this.app.use(helmet())
        this.app.use(cors())
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Hello World!")
        })
        this.app.use("/api/v1/users", UserRoutes)
        this.app.use("/api/v1/auth", AuthRoutes)
        this.app.use("/api/v1/todos", TodoRoutes)
    }
}
const port: number | string | undefined = process.env.PORT
const app = new App().app

app.listen(port || 8000, () => {
    console.log(`App is running on port ${port ? port : 8000}`)
})
