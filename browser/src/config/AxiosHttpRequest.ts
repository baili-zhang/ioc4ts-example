import axios, { AxiosInstance, AxiosResponse } from "axios"
import { HttpRequest, HttpRequestConfig, HttpRequestInterface } from "ioc4ts"


@HttpRequest()
class AxiosHttpRequest implements HttpRequestInterface {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({ baseURL: 'http://localhost:3000' })
    }

    request(config: HttpRequestConfig<unknown>): Promise<AxiosResponse<Object>> {
        return this.instance.request({
            method: config.method,
            url: config.path,
            params: config.params,
            headers: config.headers,
            data: config.data
        })
    }
}

export default AxiosHttpRequest