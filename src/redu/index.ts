import {UserState} from "src/redu/reducers/user"
import {EnsureCorrectEnum} from "src/models/types/utility"
import {RestState} from "src/redu/reducers/rest"

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
}

// noinspection JSUnusedLocalSymbols
type assert = EnsureCorrectEnum<typeof ReduxType>;

////////////////////////////////////////////////////////////////////////////////
