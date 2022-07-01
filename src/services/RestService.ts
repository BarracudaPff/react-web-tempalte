import {ApiService} from "src/services"
import {RestField} from "src/services/api/ApiService"
import {RestaurantID} from "src/models/types/primitive"
import {RestaurantDesign} from "src/models/application/design"
import {OmitTS} from "src/models/types/utility"

export class RestService {
    static createNew(name: string, percent: number) {
        return ApiService.createNewRest(name, percent)
    }

    static listWithFieldsRest(id?: number, fields?: RestField[]) {
        return ApiService.listRest(id, fields)
    }

    static listRest(id?: number) {
        return ApiService.listRest(id, [RestField.OWNER, RestField.MANAGER, RestField.WAITERS_BASE])
    }

    static getFullInfo(id?: number) {
        return ApiService.listRest(id, [
            RestField.OWNER,
            RestField.MANAGER,
            RestField.ADDRESS,
            RestField.INFO_FINANCE,
            RestField.INFO_LEGAL,
            RestField.PAYMENT_SETTINGS,
            RestField.WAITERS_BASE,
        ])
    }

    static updateBaseInfo(id: RestaurantID, data: { fullName: string, feeAmount: number }) {
        return ApiService.updateBaseInfoRest(id, data)
    }

    static updateAddress(id: RestaurantID, data: { country: string, city: string, street: string, building: string }) {
        return ApiService.updateAddressRest(id, data)
    }

    static updateLegalInfo(id: RestaurantID, data: {
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
        return ApiService.updateLegalInfoRest(id, data)
    }

    static updateFinanceInfo(id: RestaurantID, data: { bik: string, accountNumber: string, useCard: boolean }) {
        return ApiService.updateFinanceInfoRest(id, data)
    }

    static updatePaymentSettings(id: RestaurantID, data: { hideZeroFeeMark: boolean, saveReceiptAmount: boolean }) {
        return ApiService.updatePaymentSettingsRest(id, data)
    }

    static linkPhone(id: RestaurantID) {
        return ApiService.linkPhoneRest(id)
    }

    static linkCard(id: RestaurantID) {
        return ApiService.linkCardRest(id)
    }

    static newManager(id: RestaurantID, email: string, phone: string) {
        return ApiService.newManagerRest(id, email, phone, "ru")
    }

    static updateManager(id: RestaurantID, email: string, phone: string) {
        return ApiService.updateManagerRest(id, email, phone, "ru")
    }

    static deleteManager(id: RestaurantID) {
        return ApiService.deleteManagerRest(id)
    }

    static requestPayout(id: RestaurantID) {
        return ApiService.requestPayout(id)
    }

    static delete(id: RestaurantID) {
        return ApiService.deleteRest(id)
    }

    static updateDesign(id: RestaurantID, design: OmitTS<RestaurantDesign, "toObj">) {
        return ApiService.updateDesign(id, design)
    }
}
