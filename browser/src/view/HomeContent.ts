import { View } from "ioc4ts";

@View("content")
class HomeContent {
    render() {
        return `<p>ioc4ts 是一个前端 MVC 框架，正在努力开发中！</p>`
    }
}

export default HomeContent