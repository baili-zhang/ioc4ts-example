import ApplicationContext, { View } from "ioc4ts";
import User from "../model/User";

@View("app")
class HomeView {
    async render() {
        const application = ApplicationContext.getInstance()
        const beanFactory = application.getBeanFactory()

        const UserMapper = beanFactory.getBeanClass("UserMapper")
        const user = await UserMapper.getUser() as User

        return `<h1>${user.hello()}</h1>`
    }
}

export default HomeView