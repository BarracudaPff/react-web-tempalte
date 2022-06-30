import * as userAct from "src/redu/actions/user"
import {logIn, logOut} from "src/redu/actions/user"
import {ActionType, createReducer} from "typesafe-actions"
import {User} from "src/models/application"
import {StorageService} from "src/services/StorageService"

export interface UserState {
    isLogin: boolean;
    user?: User;
}

export type UserActionType = ActionType<typeof userAct>

let localUser: User | undefined

try {
    const user = await StorageService.getLocalUser()
    const token = await StorageService.getAuthToken()
    if (user && token) localUser = user
} catch (e) {
}

const initialState = {
    isLogin: !!localUser,
    user: localUser,
}

const user = createReducer<UserState, UserActionType>(initialState)
    .handleAction(logIn, (state, { payload }) => ({
        isLogin: true,
        user: payload
    }))
    .handleAction(logOut, () => ({
        isLogin: false,
        userMe: undefined
    }))

export default user
