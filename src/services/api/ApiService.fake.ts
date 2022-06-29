import ApiServiceI from "src/services/api/base"
import {staticImplements} from "src/models/types/mapping"
import {parseRequest} from "src/services"
import {BaseApiService} from "src/services/BaseApiService"
import {API} from "src/services/Endpoints"
import {User} from "src/models/application"
import {StaffStatus, UserRank} from "src/models/types/base"

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
    static getMe = () => new Promise<User>(resolve => resolve(new User({
        email: "",
        id: 0,
        is_finance_manager: false,
        is_staff: false,
        password: "",
        phone: undefined,
        rank: UserRank.MANAGER,
        staff_status: StaffStatus.NONE
    })))

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
