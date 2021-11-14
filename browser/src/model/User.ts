import { Property } from "ioc4ts";

export default class User {
    @Property('name')
    name?: string

    hello() {
        return `Hello, My name is ${this.name}`
    }
}