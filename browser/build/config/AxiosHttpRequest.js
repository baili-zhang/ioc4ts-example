"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ioc4ts_1 = require("ioc4ts");
let AxiosHttpRequest = class AxiosHttpRequest {
    constructor() {
        this.instance = axios_1.default.create({ baseURL: 'http://localhost:3000' });
    }
    request(config) {
        return this.instance.request({
            method: config.method,
            url: config.path,
            params: config.params,
            headers: config.headers,
            data: config.data
        });
    }
};
AxiosHttpRequest = __decorate([
    (0, ioc4ts_1.HttpRequest)()
], AxiosHttpRequest);
exports.default = AxiosHttpRequest;
