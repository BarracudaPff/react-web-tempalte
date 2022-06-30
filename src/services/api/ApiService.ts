import {staticImplements} from "src/models/types/mapping";
import ApiServiceI from "src/services/api/base"
import {AuthSIDToken, AuthToken, User} from "src/models/application"
import {AuthPhoneRequest, AuthPhoneSIDRequest, AuthRequest, AuthTokenI, NewWaiterRequest, UserI} from "src/models/domain"
import {parseRequest, parseRequestArr, parseRequestNull, simpleRequest} from "src/services"
import {API} from "src/services/Endpoints"
import {BaseApiService} from "src/services/BaseApiService"
import {Email, Phone, RestaurantID, UserID} from "src/models/types/primitive"
import {Restaurant, RestaurantAddress, RestaurantFinanceInfo, RestaurantLegalInfo} from "src/models/application/restaurants"
import {RestaurantPayout} from "src/models/application/payouts"
import {convertModelToFormData, toFormData} from "src/utils"

export enum RestField {
    OWNER = "owner",
    MANAGER = "manager",
    ADDRESS = "address",
    INFO_FINANCE = "finance_info",
    INFO_LEGAL = "legal_info",
    TIPS = "tips",
    PAYOUTS = "payouts",
    WAITERS = "waiters",
    WAITERS_BASE = "base_waiters",
    PAYMENT_SETTINGS = "payment_settings",
    TEAMS = "teams",
    COMMENTS = "comments",
}

export enum UserField {
    WAITER_INFO = "waiter_info",
    TIPS = "tips",
    PAYOUTS = "payouts",
    COMMENTS = "comments",
}


@staticImplements<ApiServiceI>()
export default class {
    static loginEmail(req: AuthRequest): Promise<AuthToken> {
        return parseRequest(BaseApiService.post(API.Login, req), AuthToken)
    }

    static loginEmailSimple(req: AuthRequest): Promise<AuthTokenI> {
        return simpleRequest(BaseApiService.post(API.Login, req))
    }

    static getPhoneSID(req: AuthPhoneSIDRequest): Promise<AuthSIDToken> {
        return parseRequest(BaseApiService.post(API.GetPhoneToken, req), AuthSIDToken)
    }

    static loginPhone(req: AuthPhoneRequest): Promise<AuthToken> {
        return parseRequest(BaseApiService.post(API.GetPhoneToken, req), AuthToken)
    }

    static logout() {
        return parseRequestNull(BaseApiService.get(API.Logout))
    }

    static sendApplication(phone: Phone, email: Email, company_name: string, additional_information: string) {
        return parseRequestNull(BaseApiService.post(API.SendApplication, {
            phone, email, company_name, additional_information
        }))
    }

    static getMe() {
        return parseRequest(BaseApiService.get(API.WaitersMe), User)
        // return ApiServiceFake.getMe()
    }

    static getMeSimple(): Promise<UserI> {
        return simpleRequest(BaseApiService.get(API.WaitersMe))
    }

    static createNewRest(full_name: string, fee_amount: number) {
        return parseRequest(BaseApiService.post(API.RestaurantNew, { full_name, fee_amount }), Restaurant)
    }

    static updateBaseInfoRest(id: RestaurantID, data: { fullName: string, feeAmount: number }) {
        return parseRequest(BaseApiService.post(API.RestaurantUpdateBaseInfo, {
            id: id,
            restaurant_id: id,
            full_name: data.fullName,
            fee_amount: data.feeAmount,
        }), Restaurant)
    }

    static updateAddressRest(id: RestaurantID, data: { country: string, city: string, street: string, building: string }) {
        return parseRequest(BaseApiService.post(API.RestaurantUpdateAddress, {
            id: id,
            restaurant_id: id,
            country: data.country,
            city: data.city,
            street: data.street,
            building: data.building,
        }), RestaurantAddress)
    }

    static updateLegalInfoRest(id: RestaurantID, data: {
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
    }) {
        return parseRequest(BaseApiService.post(API.RestaurantUpdateLegalInfo, {
            id: id,
            restaurant_id: id,
            ogrn: data.ogrn,
            inn: data.inn,
            kpp: data.kpp,
            organization_full_name: data.organizationFullName,
            zip_code: data.zipCode,
            russia_subject: data.russiaSubject,
            city: data.city,
            street: data.street,
            building: data.building,
            office: data.office,
        }), RestaurantLegalInfo)
    }

    static updateFinanceInfoRest(id: RestaurantID, data: { bik: string, accountNumber: string, useCard: boolean }) {
        console.log({ data })
        return parseRequest(BaseApiService.post(API.RestaurantUpdateFinanceInfo, {
            id: id,
            restaurant_id: id,
            bik: data.bik,
            account_number: data.accountNumber,
            use_card: data.useCard,
        }), RestaurantFinanceInfo)
    }

    //TODO
    static updateTipsDesignRest(id: RestaurantID) {
        return parseRequest(BaseApiService.post(API.RestaurantUpdateTipsDesign, { id: id, restaurant_id: id }), Restaurant)
    }

    static updatePaymentSettingsRest(id: RestaurantID, data: { hideZeroFeeMark: boolean, saveReceiptAmount: boolean }) {
        return parseRequest(BaseApiService.post(API.RestaurantUpdatePaymentSettings, {
            id: id,
            restaurant_id: id,
            hide_zero_fee_mark: data.hideZeroFeeMark,
            save_receipt_amount: data.saveReceiptAmount,
        }), Restaurant)
    }

    static linkPhoneRest(id: RestaurantID) {
        return simpleRequest<string>(BaseApiService.post(API.RestaurantLinkPhone, {
            id: id,
            restaurant_id: id,
        }))
    }

    static linkCardRest(id: RestaurantID) {
        return simpleRequest<string>(BaseApiService.post(API.RestaurantLinkCard, {
            id: id,
            restaurant_id: id,
        }))
    }

    static newManagerRest(id: RestaurantID, email: string, phone: string, phoneCountry: string) {
        return parseRequest(BaseApiService.post(API.RestaurantManagerNew, {
            id: id,
            restaurant_id: id,
            email,
            phone,
            phone_country: phoneCountry,
        }), User)
    }

    static updateManagerRest(id: RestaurantID, email: string, phone: string, phoneCountry: string) {
        return parseRequest(BaseApiService.post(API.RestaurantManagerUpdate, {
            id: id,
            restaurant_id: id,
            email,
            phone,
            phone_country: phoneCountry,
        }), User)
    }

    static deleteManagerRest(id: RestaurantID) {
        return simpleRequest(BaseApiService.post(API.RestaurantsManagerDelete, {
            id: id,
            restaurant_id: id,
        }))
    }

    static requestPayout(id: RestaurantID) {
        return parseRequest(BaseApiService.post(API.RestaurantRequestPayout, {
            id: id,
            restaurant_id: id,
        }), RestaurantPayout)
    }

    static listRest(id?: RestaurantID, fields?: RestField[]) {
        const params: any = {}
        if (fields?.length) params.fields = fields?.join(",")
        if (id) params.restaurant_id = id

        return parseRequestArr(BaseApiService.get(API.RestaurantList, params), Restaurant)
    }

    static deleteRest(id: RestaurantID) {
        return parseRequestNull(BaseApiService.post(API.RestaurantDelete, { restaurant_id: id }))
    }

    static listUsers(restId?: RestaurantID, userId?: UserID, fields?: UserField[]) {
        const params: any = {}
        if (fields?.length) params.fields = fields?.join(",")
        if (restId) params.restaurant_id = restId
        if (userId) params.waiter_id = userId
        params.restaurant_id = 3

        return parseRequestArr(BaseApiService.get(API.WaitersList, params), User)
    }

    static longReq(timeout: number = 2000) {
        return new Promise(resolve => setTimeout(() => resolve(null), timeout))
    }

    static createNewUser(data: NewWaiterRequest) {
        if (!data.customFeeUse) data.customFee = 0

        return parseRequest(BaseApiService.postFormData(API.WaitersNew, convertModelToFormData({
            restaurant_id: data.restaurantId,
            team_id: data.teamId,
            avatar: data.avatar,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email != "" ? data.email : undefined,
            password: data.password != "" ? data.password : undefined,
            phone: data.phone,
            custom_fee: data.customFee,
            custom_fee_use: data.customFeeUse,
            goal: data.goal,
            crop_x: data.cropX,
            crop_y: data.cropY,
            crop_s: data.cropS,
        })), User)
    }
}
