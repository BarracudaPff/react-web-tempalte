import {addUser, loadUsers} from "src/redu/actions/user"
import {createReducer} from "typesafe-actions"
import {UserInfo} from "src/models/application"

export interface UserState {
    // isLogin: boolean;
    // userInfo?: UserInfo;
    users: UserInfo[]
}

export type UserActionType = ReturnType<typeof loadUsers | typeof addUser>

const auth = createReducer<UserState, UserActionType>({
    // isLogin: false,
    // userInfo: Config.mockForms ? {} : undefined
    users: []
})
    .handleAction(addUser, (state, { payload }) => ({
        ...state,
        users: [...state.users, payload]
    }))
    .handleAction(loadUsers, (state, { payload }) => ({ users: payload }))

export default auth
