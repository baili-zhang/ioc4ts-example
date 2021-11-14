"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc4ts_1 = __importDefault(require("ioc4ts"));
ioc4ts_1.default.getInstance({ log: true });
const AxiosHttpRequest_1 = __importDefault(require("./config/AxiosHttpRequest"));
const User_1 = __importDefault(require("./model/User"));
const UserMapper_1 = __importDefault(require("./mapper/UserMapper"));
const HomeView_1 = __importDefault(require("./view/HomeView"));
exports.default = {
    AxiosHttpRequest: AxiosHttpRequest_1.default,
    User: User_1.default,
    UserMapper: UserMapper_1.default,
    HomeView: HomeView_1.default
};
