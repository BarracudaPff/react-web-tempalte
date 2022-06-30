import {ReduxType} from "src/redu"
import {createAction} from "typesafe-actions"
import {UserID} from "src/models/types/primitive"
import {User} from "src/models/application"

export const addAllUsers = createAction(ReduxType.LIST_USERS)<User[]>()
export const addUser = createAction(ReduxType.ADD_USER)<User>()
export const updUser = createAction(ReduxType.UPD_USER)<User>()
export const deleteUser = createAction(ReduxType.DELETE_USER)<UserID>()
