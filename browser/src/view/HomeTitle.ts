import ApplicationContext, { View } from "ioc4ts";
import User from "../model/User";

@View("title")
class HomeTitle {

    private intro = "Hello, my name is ioc4ts！"
    private user?: User

    async render() {
        const application = ApplicationContext.getInstance()
        const beanFactory = application.getBeanFactory()

        const UserMapper = beanFactory.getBeanClass("UserMapper")
        this.user = await UserMapper.getUser() as User

        return `<h1>{this.intro}</h1>
                <div>{this.user.hello()}</div>`
    }
}

export default HomeTitle