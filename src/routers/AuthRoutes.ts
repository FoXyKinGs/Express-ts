import BaseRoutes from "./BaseRouter"
import Validate from "../middlewares/AuthValidator"
import { auth } from "../middlewares/AuthMiddleware"

// Controllers
import AuthController from "../controllers/AuthController"

class AuthRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post("/register", Validate, AuthController.register)
        this.router.post("/login", Validate, AuthController.login)
        this.router.get("/profile", auth, AuthController.profile)
    }
}

export default new AuthRoutes().router
