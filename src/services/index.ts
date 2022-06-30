import Config from "../config"
import {ResponseI} from "src/models/domain"
import {ResponseStatus} from "src/models/types/base"
import {CustomError} from "ts-custom-error"
import {Mappable} from "src/models/types/mapping"
import {Response as ResponseApp, ResponseArr as ResponseArrApp} from "src/models/application"
import {notification} from "antd"

export {default as ApiService} from "./api"

function showError(title: string = "", message: string) {
    notification.error({
        message: title + "<br/>" + message
    })
}

export class DomainError extends CustomError {
    response: ResponseI<unknown>

    constructor(res: ResponseI<unknown | null>, ...customMessage: (string | unknown | null)[]) {
        super(
            !!res.message
                ? DomainError.msgFull(res) + ((!!customMessage && !!customMessage?.length) ? `; Also, ${customMessage}` : "")
                : (!!customMessage ? customMessage.toString() : "")
        )
        console.debug("Status check failed", this)

        this.response = res
    }

    static msgFor(res: ResponseI<unknown>, key: string) {
        if (!res.errors || !(key in res.errors)) return undefined
        return res.errors[key].join("; ")
    }

    static msgFull(res: ResponseI<unknown>) {
        const nestedErrors = res.errors
            ? Object.keys(res.errors).map(key => " " + key + ": " + DomainError.msgFor(res, key))
            : ""
        return res.message + (nestedErrors.length > 0 ? `. ${nestedErrors}` : "")
    }

    static parse(err: any, header?: string, body?: string): { [key: string]: string } | void {
        if (err instanceof DomainError) {
            if (err.response.errors) {
                const data = Object.fromEntries(
                    Object.entries(err.response.errors).map(([k, v]) => [k, v.join("; ")])
                )
                console.debug("Error obj", err)
                return data
            } else if (err.response.message) {
                showError(header ?? "Что-то пошло не так", err.response.message)
            } else {
                console.error(err)
                showError(header ?? "Что-то пошло не так", body ?? err.toString())
            }
        } else if (err instanceof SyntaxError) {
            console.error("JSON parsing error", err)
        } else {
            console.error("Unsupported error", err)
            showError(header ?? "Что-то пошло не так", body ?? err.toString())
        }
    }

    static notifyError(err: any, title: string = "") {
        if (err instanceof DomainError) {
            const msg = this.msgFull(err.response)
            console.error(msg)
            showError(title, err.response.message ?? "")
        } else {
            console.error(err)
            showError(title, "Что-то пошло не так")
        }
    }

    //TODO: remove title?
    static tryToParse(err: any, key?: string, title: string = "") {
        console.debug("Parsing error: ", err)
        if (err instanceof DomainError) {
            return key ? DomainError.msgFor(err.response, key) : err.response.message
        } else {
            //TODO: better alert here
            // Toast.show({
            //     type: 'error',
            //     text1: 'Что-то пошло не так',
            //     text2: err.toString()
            // });
            return
        }
    }
}

export class MappingError<D, A> extends DomainError {
    constructor(res: ResponseI<unknown>, e: any, cls: Mappable<D, A>) {
        super(
            res,
            `Mapping issue happened. Failed at mapping domain model. Initial error log: \`${e}\`.`
            + ` Model: \`${cls.name}\`.`
            + ` Data: ${JSON.stringify(res.data, null, 2)}.`
        );
    }
}

export function checkErrors<T>(res: ResponseI<T>) {
    if (res.status == ResponseStatus.OK) {
        return res
    } else {
        Config.logHttp && console.error("Response error", res)
        throw new DomainError(res)
    }
}

export function parseRequest<D, A>(req: Promise<Response>, cls: Mappable<D, A>): Promise<A> {
    return req.then(data => data.json() as Promise<ResponseI<D>>)
        .then(checkErrors)
        .then(mapToApplication(cls))
        .catch(err => {
            console.error("Server request failed", err.toString())
            throw err
        })
}

export function simpleRequest<A>(req: Promise<Response>): Promise<A> {
    return req.then(data => data.json() as Promise<ResponseI<A>>)
        .then(checkErrors)
        .then(it => it.data)
        .catch(err => {
            console.error("Server request failed", err.toString())
            throw err
        })
}

export function parseRequestNull(req: Promise<Response>): Promise<null | undefined> {
    return req.then(data => data.json() as Promise<ResponseI<null | undefined>>)
        .then(checkErrors)
        .then(res => res.data)
        .catch(err => {
            console.error("Server request failed", err.toString())
            throw err
        })
}

export function parseRequestArr<D, A>(req: Promise<Response>, cls: Mappable<D, A>): Promise<A[]> {
    return req.then(data => data.json() as Promise<ResponseI<D[]>>)
        .then(checkErrors)
        .then(mapToApplicationArr(cls))
        .catch(err => {
            console.error("Server request failed", err.toString())
            throw err
        })
}

export function mapToApplication<D, A>(cls: Mappable<D, A>) {
    return (res: ResponseI<D>): A => {
        try {
            Config.logHttp && console.debug("Response", res, "Map to: ", cls.name)
            const obj = new ResponseApp<D, A>(res, cls)
            Config.logHttp && console.debug("After mapping: ", obj)
            return obj.data
        } catch (e) {
            throw new MappingError(res, e, cls)
        }
    }
}

export function mapToApplicationArr<D, A>(cls: Mappable<D, A>) {
    return (res: ResponseI<D[]>): A[] => {
        try {
            Config.logHttp && console.debug("Response", res, "Map to: ", cls.name)
            const obj = new ResponseArrApp<D, A>(res, cls)
            Config.logHttp && console.debug("After mapping: ", obj)
            return obj.data
        } catch (e) {
            throw new MappingError(res, e, cls)
        }
    }
}

