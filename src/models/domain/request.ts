import {Email, Password, Phone, RestaurantID, TeamID} from "src/models/types/primitive"
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

export interface NewWaiterRequest {
    restaurantId: RestaurantID
    teamId: TeamID
    avatar?: File
    firstName: string
    lastName?: string
    email?: Email
    password?: Password
    phone?: Phone
    customFee: number // Must be 0 if custom_fee_use is false!
    customFeeUse: boolean
    goal?: string
    cropX: number
    cropY: number
    cropS: number
}
