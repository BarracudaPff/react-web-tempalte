import {RecordAtI} from "src/models/domain/base"
import {Int, UserID, RestaurantID, BoolExt, DateExt, Double} from "src/models/types/primitive"
import {TipRecordI} from "src/models/domain/tips"
import {RestaurantPayoutI} from "src/models/domain/payouts"
import {UserI} from "src/models/domain/user"
import {TeamI} from "src/models/domain/team"
import {WaiterInfoI} from "src/models/domain/waiter"
import {VerifyStatus} from "src/models/types/base"
import {Nullable} from "src/models/types/utility"
import {User} from "src/models/application"
import {WaiterInfo} from "src/models/application/waiter"
import {RestaurantFinanceInfo, RestaurantLegalInfo, RestaurantPaymentSettings} from "src/models/application/restaurants"
import {Team} from "src/models/application/team"
import {RestaurantDesignI} from "src/models/domain/design"

// type RestaurantExtraField =
//     "owner"
//     | "manager"
//     | "address"
//     | "finance_info"
//     | "legal_info"
//     | "tips"
//     | "payouts"
//     | "waiters"

export interface RestaurantI extends RecordAtI {
    id: UserID
    owner_id: UserID
    manager_id?: UserID
    full_name: string
    verify_status: VerifyStatus

    fee_amount: Double
    is_demo: BoolExt

    owner?: UserI
    manager?: UserI
    address?: RestaurantAddressI
    finance_info?: RestaurantFinanceInfoI
    legal_info?: RestaurantLegalInfoI
    payment_settings?: RestaurantPaymentSettingsI
    tips_design?: RestaurantDesignI
    base_waiters?: WaiterInfoI[]

    teams?: TeamI[]
    // "id": "integer", //ID ресторана
    // "owner_id": "integer", //ID пользователя (владельца ресторана)
    // "manager_id": "integer", //ID пользователя (менеджера ресторана)
    // "full_name": "string[100]", //Полное наименование ресторана
    // "verify_status": "integer", //Статус верификации

    // "fee_amount": "integer", //Размер комиссии (в процентах)
    // our_fee?: Double
}

export interface RestaurantExpandedI extends RestaurantI {
    our_fee: Nullable<Double>
}

export interface RestaurantAddressI extends RecordAtI {
    restaurant_id: RestaurantID
    country: string
    city: string
    street: string
    building: string
}

export interface RestaurantLegalInfoI extends RecordAtI {
    restaurant_id: RestaurantID
    ogrn: string
    inn: string
    kpp: string
    organization_full_name: string
    zip_code: string
    russia_subject: string
    city: string
    street: string
    building: string
    office: string
}

export interface RestaurantFinanceInfoI extends RecordAtI {
    restaurant_id: RestaurantID
    bik: string
    account_number: string
    card_linked: BoolExt
    card_expire: DateExt
    phone_linked: BoolExt
    use_card: BoolExt
    balance: Double
    card_balance: Double
    last_payout_request: DateExt
}

export interface RestaurantPaymentSettingsI extends RecordAtI {
    restaurant_id: RestaurantID

    hide_zero_fee_mark: BoolExt
    save_receipt_amount: BoolExt
}

//
// // | "b2p_id"
// export interface RestaurantNarrowI extends OmitTS<RestaurantI,
//     "id" | "owner_id" | "manager_id" | "verify_status" | "our_fee"> {
// }
