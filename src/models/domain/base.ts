import {AuthTokenType, ResponseStatus} from "src/models/types/base"
import {BoolExt, DateExt} from "src/models/types/primitive"
import {Nullable, OmitTS} from "src/models/types/utility"
import {ApiErrors} from "src/models/types/api"

export interface ResponseIArr<T> extends OmitTS<ResponseI<T>, "data"> {
    data: T[]
}

export interface ResponseI<T> {
    status: ResponseStatus,
    message: Nullable<string>,
    errors: Nullable<ApiErrors>,
    data: T
}

export interface AuthTokenResponseI {
    type: AuthTokenType
    token: string
    expire_in: DateExt
}

export interface RecordAtI {
    created_at?: string
    updated_at?: string
}

export interface PageRequestI<T> {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: LinkI[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

export interface LinkI {
    url?: string
    label: string
    active: BoolExt
}
