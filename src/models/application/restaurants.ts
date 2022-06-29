import {Double, Int, RestaurantID, UserID} from "src/models/types/primitive"
import {Patch, PatchHard, staticMappable} from "src/models/types/mapping"
import {
    RestaurantAddressI,
    RestaurantExpandedI,
    RestaurantFinanceInfoI,
    RestaurantI,
    RestaurantLegalInfoI,
    RestaurantPaymentSettingsI
} from "src/models/domain/restaurants"
import {PC, PCH} from "src/models/config"
import {VerifyStatus} from "src/models/types/base"
import {Nullable} from "src/models/types/utility"
import {RecordAt} from "src/models/application/base"
import {ensureDate} from "src/utils"
import {User} from "src/models/application/user"
import {WaiterInfo} from "src/models/application/waiter"

@staticMappable<RestaurantI, Restaurant>()
export class Restaurant extends RecordAt implements PatchHard<RestaurantI, PC.Restaurant, PCH.Rest> {
    id: UserID
    ownerId: UserID
    managerId: UserID
    feeAmount: Double
    fullName: string
    verifyStatus: VerifyStatus
    is_demo: boolean

    owner?: User
    financeInfo?: RestaurantFinanceInfo
    legalInfo?: RestaurantLegalInfo
    baseWaiters?: WaiterInfo[]
    paymentSettings?: RestaurantPaymentSettings

    constructor(data: RestaurantI) {
        super(data)
        this.id = data.id
        this.feeAmount = data.fee_amount
        this.ownerId = data.owner_id
        this.managerId = data.manager_id
        this.fullName = data.full_name
        this.verifyStatus = data.verify_status
        this.is_demo = !!data.is_demo

        this.owner = data.owner && new User(data.owner)
        this.financeInfo = data.finance_info && new RestaurantFinanceInfo(data.finance_info)
        this.legalInfo = data.legal_info && new RestaurantLegalInfo(data.legal_info)
        this.baseWaiters = data.base_waiters && data.base_waiters.map(it => new WaiterInfo(it))
        this.paymentSettings = data.payment_settings && new RestaurantPaymentSettings(data.payment_settings)
    }
}

@staticMappable<RestaurantExpandedI, RestaurantExpanded>()
export class RestaurantExpanded extends Restaurant implements PatchHard<RestaurantExpandedI, PC.RestaurantExpanded, PCH.Rest> {
    ourFee: Nullable<Double>

    constructor(data: RestaurantExpandedI) {
        super(data)
        this.ourFee = data.our_fee
    }
}

@staticMappable<RestaurantAddressI, RestaurantAddress>()
export class RestaurantAddress implements Patch<RestaurantAddressI, PC.RestaurantAddress> {
    restaurantId: RestaurantID
    country: string
    city: string
    street: string
    building: string

    constructor(data: RestaurantAddressI) {
        this.restaurantId = data.restaurant_id
        this.country = data.country
        this.city = data.city
        this.street = data.street
        this.building = data.building
    }
}

@staticMappable<RestaurantLegalInfoI, RestaurantLegalInfo>()
export class RestaurantLegalInfo implements Patch<RestaurantLegalInfoI, PC.RestaurantLegalInfo> {
    restaurantId: RestaurantID
    ogrn: string
    inn: string
    kpp: string
    organizationFullName: string
    zipCode: string
    russiaSubject: string
    city: string
    street: string
    building: string
    office: string

    constructor(data: RestaurantLegalInfoI) {
        this.restaurantId = data.restaurant_id
        this.ogrn = data.ogrn
        this.inn = data.inn
        this.kpp = data.KPP
        this.organizationFullName = data.organization_full_name
        this.zipCode = data.zip_code
        this.russiaSubject = data.russia_subject
        this.city = data.city
        this.street = data.street
        this.building = data.building
        this.office = data.office
    }
}

@staticMappable<RestaurantFinanceInfoI, RestaurantFinanceInfo>()
export class RestaurantFinanceInfo implements Patch<RestaurantFinanceInfoI, PC.RestaurantFinanceInfo> {
    restaurantId: RestaurantID
    bik: string
    accountNumber: string
    cardLinked: boolean
    cardExpire: Date
    phoneLinked: boolean
    useCard: boolean
    balance: Double
    cardBalance: Double
    lastPayoutRequest: Date

    constructor(data: RestaurantFinanceInfoI) {
        this.restaurantId = data.restaurant_id
        this.bik = data.bik
        this.accountNumber = data.account_number
        this.cardLinked = !!data.card_linked
        this.cardExpire = ensureDate(data.card_expire)
        this.phoneLinked = !!data.phone_linked
        this.useCard = !!data.use_card
        this.balance = data.balance
        this.cardBalance = data.card_balance
        this.lastPayoutRequest = ensureDate(data.last_payout_request)
    }
}

@staticMappable<RestaurantPaymentSettingsI, RestaurantPaymentSettings>()
export class RestaurantPaymentSettings implements Patch<RestaurantPaymentSettingsI, PC.RestaurantPaymentSettings> {
    restaurantId: RestaurantID
    hideZeroFeeMark: boolean
    saveReceiptAmount: boolean

    constructor(data: RestaurantPaymentSettingsI) {
        this.restaurantId = data.restaurant_id
        this.hideZeroFeeMark = !!data.hide_zero_fee_mark
        this.saveReceiptAmount = !!data.save_receipt_amount
    }
}

//
// // | "b2p_id"
// export interface RestaurantNarrowI extends OmitTS<RestaurantI,
//     "id" | "owner_id" | "manager_id" | "verify_status" | "our_fee"> {
// }
