import {ReduxType} from "src/redu"
import {createAction} from "typesafe-actions"
import {UserInfo} from "src/models/application"

export const loadUsers = createAction(ReduxType.LOAD_USERS)<UserInfo[]>()

export const addUser = createAction(ReduxType.ADD_USER)<UserInfo>()

