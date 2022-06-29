import {Mappable, Patch, PatchHard, staticMappable} from "src/models/types/mapping"
import {AuthSIDTokenI, AuthTokenI, LinkI, PageRequestI, RecordAtI, ResponseI, ResponseIArr} from "src/models/domain"
import {AuthTokenType, ResponseStatus} from "src/models/types/base"
import {PC} from "src/models/config"
import {ensureDate} from "src/utils/datetime"
import {Nullable} from "src/models/types/utility"
import {ApiErrors} from "src/models/types/api"
import Config from "src/config"

@staticMappable<ResponseI<unknown>, Response<unknown, unknown>>()
export class Response<D, A> implements PatchHard<ResponseI<D>, {}, {
    data: A
}> {
    status: ResponseStatus
    message: Nullable<string>
    errors: Nullable<ApiErrors>
    data: A

    constructor(data: ResponseI<D>, map: Mappable<D, A>) {
        this.status = data.status
        this.message = data.message
        this.errors = data.errors
        this.data = new map(data.data)
    }
}

@staticMappable<ResponseIArr<unknown>, Response<unknown, unknown>>()
export class ResponseArr<D, A> implements PatchHard<ResponseIArr<D>, {}, {
    data: A[]
}> {
    status: ResponseStatus
    message: Nullable<string>
    errors: Nullable<ApiErrors>
    data: A[]

    constructor(data: ResponseIArr<D>, map: Mappable<D, A>) {
        this.status = data.status
        this.message = data.message
        this.errors = data.errors
        this.data = data.data.map(it => new map(it))
    }
}

//ResponseIArr
// export class ResponseArr<D, A> extends Response<D[], A> {
//     constructor(data: ResponseI<A[]>, map: Mappable<D, A>) {
//         super()
//         this.status = data.status
//         this.message = data.message
//         this.errors = data.errors
//         this.data = new map(data.data)
//     }
// }

// @staticMappable<ResponseI<unknown>, Response<unknown, unknown>>()
// export class Response<D, A> implements PatchHard<ResponseI<D>, {}, {
//     data: A
// }> {
//     status: ResponseStatus
//     message: Nullable<string>
//     errors: Nullable<ApiErrors>
//     data: A
//
//     constructor(data: ResponseI<D>, map: Mappable<D, A>) {
//         this.status = data.status
//         this.message = data.message
//         this.errors = data.errors
//         this.data = new map(data.data)
//     }
// }

@staticMappable<AuthSIDTokenI, AuthSIDToken>()
export class AuthSIDToken implements Patch<AuthSIDTokenI> {
    sid: string
    _debugCode?: string

    constructor(data: AuthSIDTokenI) {
        this.sid = data.sid
        this._debugCode = Config.debugPhoneCode
    }
}

@staticMappable<AuthTokenI, AuthToken>()
export class AuthToken implements Patch<AuthTokenI, PC.AuthToken> {
    expireIn: Date
    token: string
    type: AuthTokenType

    constructor(data: AuthTokenI) {
        const expire = new Date()
        expire.setTime(expire.getTime() + (data.expire_in as number * 1000))

        this.expireIn = expire
        this.token = data.token
        this.type = data.type
    }
}

@staticMappable<RecordAtI, RecordAt>()
export class RecordAt implements PatchHard<RecordAtI, PC.RecordAt, {
    createdAt?: Date
    updatedAt?: Date
}> {
    createdAt?: Date
    updatedAt?: Date

    constructor(data: RecordAtI) {
        this.createdAt = data.created_at ? ensureDate(data.created_at) : undefined
        this.updatedAt = data.updated_at ? ensureDate(data.updated_at) : undefined
    }

}

@staticMappable<PageRequestI<unknown>, PageRequest<unknown, unknown>>()
export class PageRequest<D, A> implements PatchHard<PageRequestI<D>, PC.PageRequest, {
    data: A[]
    to: number
}> {
    currentPage: number
    firstPageUrl: string
    from: number
    lastPage: number
    lastPageUrl: string
    links: LinkI[]
    nextPageUrl: string
    path: string
    perPage: number
    prevPageUrl: string | null
    to: number
    total: number
    data: A[]

    constructor(data: PageRequestI<D>, map: Mappable<D, A>) {
        this.currentPage = data.current_page
        this.firstPageUrl = data.first_page_url
        this.from = data.from
        this.lastPage = data.last_page
        this.lastPageUrl = data.last_page_url
        this.links = data.links
        this.nextPageUrl = data.next_page_url
        this.path = data.path
        this.perPage = data.per_page
        this.prevPageUrl = data.prev_page_url
        this.to = data.to
        this.total = data.total
        this.data = data.data.map(it => new map(it))
    }
}

@staticMappable<Link, LinkI>()
export class Link implements Patch<LinkI> {
    url?: string
    label: string
    active: boolean

    constructor(data: LinkI) {
        this.url = data.url
        this.label = data.label
        this.active = !!data.active
    }
}
