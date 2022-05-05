import ApiServiceI from "src/services/api/base"
import {staticImplements} from "src/models/types/mapping"
import {ResponseI, UserInfoI} from "src/models/domain"
import {UserInfo} from "src/models/application"
import {ResponseStatus} from "src/models/types/base"
import {Nullable} from "src/models/types/utility"
import {ApiErrors} from "src/models/types/api"

enum KEYS {
    USER_INFO,
}

enum DELAY {
    MIN_UN_NOTICE = 300,
    MIN_NOTICE = 300,
    SECOND = 1000,
}

// @ts-ignore
@staticImplements<ApiServiceI>()
export default class {
    static listUsers(): Promise<UserInfo[]> {
        return this.withDelay(
            new Promise<UserInfoI[]>(resolve => resolve([
                {
                    "id": 9,
                    "name": "Glenna Reichert",
                    "username": "Delphine",
                    "email": "Chaim_McDermott@dana.io",
                    "address": {
                        "street": "Dayna Park",
                        "suite": "Suite 449",
                        "city": "Bartholomebury",
                        "zipcode": "76495-3109",
                        "geo": {
                            "lat": "24.6463",
                            "lng": "-168.8889"
                        }
                    },
                    "phone": "(775)976-6794 x41206",
                    "website": "conrad.com",
                    "company": {
                        "name": "Yost and Sons",
                        "catchPhrase": "Switchable contextually-based project",
                        "bs": "aggregate real-time technologies"
                    }
                },
                {
                    "id": 10,
                    "name": "Clementina DuBuque",
                    "username": "Moriah.Stanton",
                    "email": "Rey.Padberg@karina.biz",
                    "address": {
                        "street": "Kattie Turnpike",
                        "suite": "Suite 198",
                        "city": "Lebsackbury",
                        "zipcode": "31428-2261",
                        "geo": {
                            "lat": "-38.2386",
                            "lng": "57.2232"
                        }
                    },
                    "phone": "024-648-3804",
                    "website": "ambrose.net",
                    "company": {
                        "name": "Hoeger LLC",
                        "catchPhrase": "Centralized empowering task-force",
                        "bs": "target end-to-end models"
                    }
                }
            ])).then(users => users.map(it => new UserInfo(it)))
            , DELAY.MIN_NOTICE
        )
    }

    static getUser(id: number): Promise<UserInfo> {
        return this.withDelay(
            new Promise<UserInfoI>(resolve => resolve({
                "id": id,
                "name": "Clementina DuBuque",
                "username": "Moriah.Stanton",
                "email": "Rey.Padberg@karina.biz",
                "address": {
                    "street": "Kattie Turnpike",
                    "suite": "Suite 198",
                    "city": "Lebsackbury",
                    "zipcode": "31428-2261",
                    "geo": {
                        "lat": "-38.2386",
                        "lng": "57.2232"
                    }
                },
                "phone": "024-648-3804",
                "website": "ambrose.net",
                "company": {
                    "name": "Hoeger LLC",
                    "catchPhrase": "Centralized empowering task-force",
                    "bs": "target end-to-end models"
                }
            })).then(it => new UserInfo(it))
            , DELAY.MIN_NOTICE
        )
    }

    static addUser(info: UserInfoI): Promise<UserInfo> {
        const res = this.withDelay(
            this.setMemoryReq(KEYS.USER_INFO, info)
                .then(() => new UserInfo(info))
            , DELAY.MIN_NOTICE
        )

        if (info.name.length > 0 && info.email.length > 0 && info.phone.length > 0) {
            return res

        } else {
            // const errors: Nullable<ApiErrors> = {}
            //
            // if (info.name.length > 0) errors["name"] = ["Passed empty name"]
            // if (info.email.length > 0) errors["email"] = ["Passed empty email"]
            // if (info.phone.length > 0) errors["phone"] = ["Passed empty phone"]
            //
            // return this.resErr(res, "Passed empty fields", errors)
            return res
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    // @ts-ignore
    private static _data: Record<KEYS, any | undefined> = {}

    private static getMemoryReq<T>(key: KEYS): Promise<T> {
        return new Promise((resolve, reject) => {
            const val = this._data[key]
            !!val ? resolve(this._data[key]) : reject(this._data[key])
        })
    }

    private static setMemoryReq<T>(key: KEYS, data: T): Promise<void> {
        return new Promise(resolve => {
            this._data[key] = data
            resolve()
        })
    }

    private static removeMemoryReq<T>(key: KEYS): Promise<void> {
        return new Promise(resolve => {
            delete this._data[key]
            resolve()
        })
    }

    // private static resOk<T>(promise: Promise<T>): Promise<ResponseI<T>> {
    //     return promise.then(data => ({
    //         status: ResponseStatus.OK,
    //         message: null,
    //         errors: null,
    //         data,
    //     }))
    // }
    //
    // private static resErr<T>(promise: Promise<T>, message: string, key?: ApiErrors): Promise<ResponseI<T>> {
    //     return promise.then(data => {
    //         let errors: Nullable<ApiErrors> = {}
    //         if (key) {
    //             Object.keys(key).forEach(it => errors![it] = key[it])
    //         } else {
    //             errors = null
    //         }
    //
    //         return {
    //             status: ResponseStatus.ERROR,
    //             message,
    //             errors,
    //             data,
    //         }
    //     })
    // }

    private static withDelay<T>(promise: Promise<T>, timeout: number = 300): Promise<T> {
        return new Promise(resolve => setTimeout(() => resolve(promise), timeout))
    }
}
