import {Mappable, staticImplements} from "src/models/types/mapping";
import ApiServiceI from "src/services/api/base"
import {AuthSIDToken, AuthToken, User} from "src/models/application"
import {AuthPhoneRequest, AuthPhoneSIDRequest, AuthRequest, AuthTokenI, NewWaiterRequest, UserI} from "src/models/domain"
import {parseRequest, parseRequestArr, parseRequestNull, simpleRequest} from "src/services"
import {API} from "src/services/Endpoints"
import {BaseApiService} from "src/services/BaseApiService"
import {Color, Email, Phone, RestaurantID, TeamID, UserID, WaiterCode} from "src/models/types/primitive"
import {Restaurant, RestaurantAddress, RestaurantFinanceInfo, RestaurantLegalInfo} from "src/models/application/restaurants"
import {RestaurantPayout} from "src/models/application/payouts"
import {convertModelToFormData} from "src/utils"
import {WaiterInfoNarrow} from "src/models/application/waiter"
import {Team} from "src/models/application/team"
import teams from "src/views/admin/teams"
import {RestaurantDesign} from "src/models/application/design"
import {OmitTS} from "src/models/types/utility"

export enum RestField {
    OWNER = "owner",
    MANAGER = "manager",
    ADDRESS = "address",
    INFO_FINANCE = "finance_info",
    INFO_LEGAL = "legal_info",
    TIPS = "tips",
    TIPS_DESIGN = "tips_design",
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

    static getNarrowUserInfo(code: WaiterCode) {
        return parseRequest(BaseApiService.get(API.WaitersInfo, { code }), WaiterInfoNarrow)
    }

    static deleteUser(id: UserID) {
        return simpleRequest(BaseApiService.post(API.WaitersDelete, { waiter_id: id }))
    }

    static addTeam(restId: RestaurantID, data: {
        name: string,
        showLastName: boolean,
        useTeamCode: boolean,
        groupTips: boolean,
        showList: boolean,
    }) {
        return parseRequest(BaseApiService.post(API.WaitersTeamsNew, {
            restaurant_id: restId,
            team_name: data.name,
            show_last_name: data.showLastName,
            use_team_code: data.useTeamCode,
            group_tips: data.groupTips,
            show_list: data.showList,
        }), Team)
    }

    static updateTeam(teamId: TeamID, data: {
        leadId: UserID,
        name: string,
        showLastName: boolean,
        useTeamCode: boolean,
        groupTips: boolean,
        showList: boolean,
        showWaiter: boolean,
    }) {
        return parseRequest(BaseApiService.post(API.WaitersTeamsUpdate, {
            team_id: teamId,
            lead_id: data.leadId,
            team_name: data.name,
            show_last_name: data.showLastName,
            use_team_code: data.useTeamCode,
            group_tips: data.groupTips,
            show_list: data.showList,
            show_waiter: data.showWaiter,
        }), Team)
    }

    static deleteTeam(id: TeamID) {
        return simpleRequest(BaseApiService.post(API.WaitersTeamsDelete, { team_id: id }))
    }

    static updateDesign(id: RestaurantID, design: OmitTS<RestaurantDesign, "toObj">) {
        return parseRequest(BaseApiService.postFormData(API.RestaurantUpdateTipsDesign, convertModelToFormData({
            restaurant_id: id,
            big_logo: design.bigLogo, // TODO: Check why sometimes pending

            bg_grad: design.bgGrad,
            fg_grad: design.fgGrad,
            accents: design.accents,
            comment: design.commentFrame,
            percentages: design.additionalFields.percentages,
            amounts: design.additionalFields.amounts,
            custom_placeholder: design.additionalFields.customPlaceholder,
            delete_placeholer: !!design.additionalFields.customPlaceholder,
            // delete_texture: !!design.texture,
            // texture: design.texture,

            font_color: design.additionalFields.additionalColors.fontColor,
            star_color: design.additionalFields.additionalColors.starColor,
            font_color_picked: design.additionalFields.additionalColors.fontColorPicked,
            star_color_picked: design.additionalFields.additionalColors.starColorPicked,
            button_disabled_background_color: design.additionalFields.additionalColors.buttonDisabledBackgroundColor,
            payment_button_fg: design.additionalFields.additionalColors.paymentButton_fg,
            payment_button_bg: design.additionalFields.additionalColors.paymentButton_bg,
            shadow: design.additionalFields.additionalColors.shadow,
            show_border: design.additionalFields.additionalColors.showBorder,
            warn_color: design.additionalFields.additionalColors.warnColor,
            err_color: design.additionalFields.additionalColors.errColor,
        })), Team)
    }
}
