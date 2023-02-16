import * as usersAct from "src/redu/actions/user"
import {addUser, loadUsers, logIn, logOut} from "src/redu/actions/user"
import {ActionType, createReducer} from "typesafe-actions"
import {UserInfo} from "src/models/application"

export interface UserState {
  isLogin: boolean;
  // userInfo?: UserInfo;
  users: UserInfo[]
}

export type UserActionType = ActionType<typeof usersAct>

const auth = createReducer<UserState, UserActionType>({
  isLogin: false,
  // userInfo: Config.mockForms ? {} : undefined
  users: []
})
  .handleAction(addUser, (state, {payload}) => ({
    ...state,
    users: [...state.users, payload]
  }))
  .handleAction(loadUsers, (state, {payload}) => ({
    ...state,
    users: payload
  }))
  .handleAction(logIn, (state) => ({
    ...state,
    isLogin: true
  }))
  .handleAction(logOut, (state) => ({
    ...state,
    isLogin: false
  }))

export default auth
