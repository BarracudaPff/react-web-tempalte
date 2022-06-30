import {UserState} from "src/redu/reducers/user"
import {EnsureCorrectEnum} from "src/models/types/utility"
import {RestState} from "src/redu/reducers/rest"
import {addManagerRest, deleteManagerRest, updManagerRest} from "src/redu/actions/rest"

export interface AppState {
    user: UserState;
    rest: RestState
}

export enum ReduxType {
    // LOAD_USERS = "LOAD_USERS",
    LOG_IN = "LOG_IN",
    LOG_OUT = "LOG_OUT",


    LIST_REST = "LIST_REST",
    ADD_REST = "ADD_REST",
    UPD_REST = "UPD_REST",
    DELETE_REST = "DELETE_REST",

    MODIFY_BASIC_REST = "MODIFY_BASIC_REST",
    MODIFY_ADDRESS_REST = "MODIFY_ADDRESS_REST",
    MODIFY_LEGAL_INFO_REST = "MODIFY_LEGAL_INFO_REST",
    MODIFY_FINANCE_INFO_REST = "MODIFY_FINANCE_INFO_REST",
    MODIFY_TIPS_DESIGN_REST = "MODIFY_TIPS_DESIGN_REST",
    MODIFY_PAYMENT_SETTINGS_REST = "MODIFY_PAYMENT_SETTINGS_REST",

    ADD_MANAGER_REST = "ADD_MANAGER_REST",
    UPD_MANAGER_REST = "UPD_MANAGER_REST",
    DELETE_MANAGER_REST = "DELETE_MANAGER_REST",
}

// noinspection JSUnusedLocalSymbols
type assert = EnsureCorrectEnum<typeof ReduxType>;

////////////////////////////////////////////////////////////////////////////////
