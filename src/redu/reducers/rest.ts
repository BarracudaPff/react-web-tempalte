import * as restAct from "src/redu/actions/rest"
import {
    addAllRest, addManagerRest,
    addRest, deleteManagerRest,
    deleteRest,
    modifyAddressRest,
    modifyBasicRest,
    modifyFinanceRest,
    modifyLegalRest, updManagerRest, updRest
} from "src/redu/actions/rest"
import {ActionType, createReducer} from "typesafe-actions"
import {Restaurant, RestaurantAddress, RestaurantFinanceInfo, RestaurantLegalInfo} from "src/models/application/restaurants"

export interface RestState {
    data: {
        rest: Restaurant,
    }[]
}

export type RestActionType = ActionType<typeof restAct>

const user = createReducer<RestState, RestActionType>({
    data: []
})
    .handleAction(addAllRest, (state, { payload }) => ({
        ...state,
        data: payload.map((item, i) => Object.assign({}, { rest: item }, state.data[i]))
    }))
    .handleAction(addRest, (state, { payload }) => ({
        ...state,
        data: [...state.data, { rest: payload }]
    }))
    .handleAction(updRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload.id) {
                rest = payload
            }

            return { rest }
        })
    }))
    .handleAction(deleteRest, (state, { payload }) => ({
        ...state,
        data: state.data.filter(it => it.rest.id != payload)
    }))
    .handleAction(modifyBasicRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload.id) {
                rest.fullName = payload.fullName
                rest.feeAmount = payload.feeAmount
            }

            return { rest }
        })
    }))
    .handleAction(modifyAddressRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload.id) {
                if (rest.address) {
                    rest.address.country = payload.address.country
                    rest.address.city = payload.address.city
                    rest.address.street = payload.address.street
                    rest.address.building = payload.address.building
                } else {
                    rest.address = new RestaurantAddress({
                        restaurant_id: rest.id,
                        country: payload.address.country,
                        city: payload.address.city,
                        street: payload.address.street,
                        building: payload.address.building,
                    })
                }
            }

            return { rest }
        })
    }))
    .handleAction(modifyLegalRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload.id) {
                if (rest.legalInfo) {
                    rest.legalInfo.ogrn = payload.legalInfo.ogrn
                    rest.legalInfo.inn = payload.legalInfo.inn
                    rest.legalInfo.kpp = payload.legalInfo.kpp
                    rest.legalInfo.organizationFullName = payload.legalInfo.organizationFullName
                    rest.legalInfo.zipCode = payload.legalInfo.zipCode
                    rest.legalInfo.russiaSubject = payload.legalInfo.russiaSubject
                    rest.legalInfo.city = payload.legalInfo.city
                    rest.legalInfo.street = payload.legalInfo.street
                    rest.legalInfo.building = payload.legalInfo.building
                    rest.legalInfo.office = payload.legalInfo.office
                } else {
                    rest.legalInfo = new RestaurantLegalInfo({
                        restaurant_id: rest.id,
                        ogrn: payload.legalInfo.ogrn,
                        inn: payload.legalInfo.inn,
                        kpp: payload.legalInfo.kpp,
                        organization_full_name: payload.legalInfo.organizationFullName,
                        zip_code: payload.legalInfo.zipCode,
                        russia_subject: payload.legalInfo.russiaSubject,
                        city: payload.legalInfo.city,
                        street: payload.legalInfo.street,
                        building: payload.legalInfo.building,
                        office: payload.legalInfo.office,
                    })
                }
            }

            return { rest }
        })
    }))
    .handleAction(modifyFinanceRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload.id) {
                if (rest.financeInfo) {
                    rest.financeInfo.bik = payload.financeInfo.bik
                    rest.financeInfo.accountNumber = payload.financeInfo.accountNumber
                    rest.financeInfo.useCard = payload.financeInfo.useCard
                }
            }

            return { rest }
        })
    }))
    .handleAction(addManagerRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload.id) {
                rest.manager = payload.manager
                rest.managerId = payload.manager.id
            }

            return { rest }
        })
    }))
    .handleAction(updManagerRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload.id) {
                rest.manager = payload.manager
                rest.managerId = payload.manager.id
            }

            return { rest }
        })
    }))
    .handleAction(deleteManagerRest, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ rest }) => {
            if (rest.id === payload) {
                rest.manager = undefined
                rest.managerId = undefined
            }

            return { rest }
        })
    }))

export default user
