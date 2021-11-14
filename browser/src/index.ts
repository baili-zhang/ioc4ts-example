import ApplicationContext, { WebApplication } from "ioc4ts";

ApplicationContext.getInstance({ log: true })

import AxiosHttpRequest from "./config/AxiosHttpRequest";
import User from "./model/User";
import UserMapper from "./mapper/UserMapper"
import HomeTitle from "./view/HomeTitle";
import HomeContent from "./view/HomeContent"

export default {
    AxiosHttpRequest,
    User,
    UserMapper,
    HomeTitle,
    HomeContent
}

new WebApplication().run()