import { Get, ReturnType } from "ioc4ts";
import User from "../model/User";

class UserMapper {
    @Get("/user")
    @ReturnType("User")
    static getUser () : User { return new User() }
}

export default UserMapper