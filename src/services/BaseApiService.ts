import {BodyInit, HttpHeaders, HttpMethod, UrlParams} from "./types";
import Config from "../config"
import AuthTokenProvider from "src/services/AuthTokenProvider"

export class BaseApiService {
    static get = (url: string, params?: UrlParams, headers?: HttpHeaders) => this.request(url, "get", headers, null, params)

    static post(url: string, body: BodyInit | object, params?: UrlParams, headers?: HttpHeaders) {
        const _body = typeof body == "object" ? JSON.stringify(body) : body
        return this.request(url, "post", { "Content-Type": "application/json", ...headers }, _body, params)
    }

    static postFormData(url: string, body: FormData, params?: UrlParams, headers?: HttpHeaders) {
        return this.request(url, "post", { "Content-Type": "multipart/form-data;", ...headers }, body, params)
    }

    private static request(info: RequestInfo, method: HttpMethod, customH?: HttpHeaders, body?: BodyInit, params?: UrlParams) {
        console.log({ info })
        if (typeof info === "string") {
            if (params) info = this.withParams(info, params)
        } else {
            if (params) info = new Request({
                ...info,
                url: this.withParams(info.url, params)
            })
        }

        Config.logInput && console.debug("REQUEST sending ", info, method, body)
        return this.headers(customH).then(headers => fetch(info, {
            method: method,
            keepalive: true,
            headers,
            body
        }))
    }

    private static headers = (custom?: HttpHeaders) => AuthTokenProvider.getSession().then(token => {
        const headers: HttpHeaders = {
            "Accept": "application/json",
            ...custom
        }
        if (Config.http.testModeToken)
            headers["X-TEST-MODE-TOKEN"] = Config.http.testModeToken
        if (token)
            headers.Authorization = `${token.type} ${token.token}`

        return headers
    })

    private static withParams = (url: string, params: UrlParams) => url + "?" + new URLSearchParams(params)

}
