import {UserState} from "src/redu/reducers/user"
import {EnsureCorrectEnum} from "src/models/types/utility"

export interface AppState {
    user: UserState;
}

export enum ReduxType {
    LOAD_USERS = "LOAD_USERS",
    ADD_USER = "ADD_USER",
}

// noinspection JSUnusedLocalSymbols
type assert = EnsureCorrectEnum<typeof ReduxType>;

////////////////////////////////////////////////////////////////////////////////
