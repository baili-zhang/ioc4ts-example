"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc4ts_1 = __importStar(require("ioc4ts"));
ioc4ts_1.default.getInstance({ log: true });
const AxiosHttpRequest_1 = __importDefault(require("./config/AxiosHttpRequest"));
const User_1 = __importDefault(require("./model/User"));
const UserMapper_1 = __importDefault(require("./mapper/UserMapper"));
const HomeTitle_1 = __importDefault(require("./view/HomeTitle"));
const HomeContent_1 = __importDefault(require("./view/HomeContent"));
exports.default = {
    AxiosHttpRequest: AxiosHttpRequest_1.default,
    User: User_1.default,
    UserMapper: UserMapper_1.default,
    HomeTitle: HomeTitle_1.default,
    HomeContent: HomeContent_1.default
};
new ioc4ts_1.WebApplication().run();
