import {Email} from "src/models/types/primitive"
import {Browser, OS} from "src/utils/platform"

export interface AuthRequest {
    email: Email
    password: string
    os: OS
    browser: Browser
}

export interface AuthPhoneSIDRequest {
    need_call: Email
    phone: string
    phone_country: string
}

export interface AuthPhoneRequest {
    phone: string
    phone_country: string
    code: string
    sid: string
}
