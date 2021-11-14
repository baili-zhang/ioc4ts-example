import ApplicationContext from "ioc4ts";

ApplicationContext.getInstance({ log: true })

import AxiosHttpRequest from "./config/AxiosHttpRequest";
import User from "./model/User";
import UserMapper from "./mapper/UserMapper"
import HomeView from "./view/HomeView";

export default {
    AxiosHttpRequest,
    User,
    UserMapper,
    HomeView
}