import {staticImplements} from "src/models/types/mapping";
import ApiServiceI from "src/services/api/base"
import {AuthSIDToken, AuthToken, User} from "src/models/application"
import {AuthPhoneRequest, AuthPhoneSIDRequest, AuthRequest} from "src/models/domain"
import {parseRequest, parseRequestArr, parseRequestNull} from "src/services"
import {API} from "src/services/Endpoints"
import {BaseApiService} from "src/services/BaseApiService"
import {Email, Phone} from "src/models/types/primitive"
import ApiServiceFake from "src/services/api/ApiService.fake"
import {Restaurant} from "src/models/application/restaurants"
import {toQueryArr} from "src/utils"

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

@staticImplements<ApiServiceI>()
export default class {
    static loginEmail(req: AuthRequest): Promise<AuthToken> {
        return parseRequest(BaseApiService.post(API.Login, req), AuthToken)
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

    static createNewRest(full_name: string, fee_amount: number) {
        return parseRequest(BaseApiService.post(API.RestaurantNew, { full_name, fee_amount }), Restaurant)
    }

    static listRest(id?: string, fields?: RestField[]) {
        const params: any = {}
        if (fields) params.fields = fields?.join(",")
        if (id) params.restaurant_id = id

        return parseRequestArr(BaseApiService.get(API.RestaurantList, params), Restaurant)
    }
}
