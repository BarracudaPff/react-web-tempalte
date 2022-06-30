import {ReduxType} from "src/redu"
import {createAction} from "typesafe-actions"
import {Restaurant, RestaurantAddress, RestaurantFinanceInfo, RestaurantLegalInfo} from "src/models/application/restaurants"
import {RestaurantID} from "src/models/types/primitive"
import {User} from "src/models/application"

export const addAllRest = createAction(ReduxType.LIST_REST)<Restaurant[]>()
export const addRest = createAction(ReduxType.ADD_REST)<Restaurant>()
export const updRest = createAction(ReduxType.UPD_REST)<Restaurant>()

export const modifyBasicRest = createAction(ReduxType.MODIFY_BASIC_REST)<Restaurant>()
export const modifyAddressRest = createAction(ReduxType.MODIFY_ADDRESS_REST)<{id: RestaurantID, address: RestaurantAddress}>()
export const modifyLegalRest = createAction(ReduxType.MODIFY_LEGAL_INFO_REST)<{id: RestaurantID, legalInfo: RestaurantLegalInfo}>()
export const modifyFinanceRest = createAction(ReduxType.MODIFY_FINANCE_INFO_REST)<{id: RestaurantID, financeInfo: RestaurantFinanceInfo}>()
export const modifyTipsDesignRest = createAction(ReduxType.MODIFY_TIPS_DESIGN_REST)<Restaurant>()
export const modifyPaymentSettingsRest = createAction(ReduxType.MODIFY_PAYMENT_SETTINGS_REST)<Restaurant>()
export const addManagerRest = createAction(ReduxType.ADD_MANAGER_REST)<{id: RestaurantID, manager: User}>()
export const updManagerRest = createAction(ReduxType.UPD_MANAGER_REST)<{id: RestaurantID, manager: User}>()
export const deleteManagerRest = createAction(ReduxType.DELETE_MANAGER_REST)<RestaurantID>()

export const deleteRest = createAction(ReduxType.DELETE_REST)<RestaurantID>()
