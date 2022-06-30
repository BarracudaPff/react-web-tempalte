import {ReduxType} from "src/redu"
import {createAction} from "typesafe-actions"
import {RestaurantID, UserID} from "src/models/types/primitive"
import {User} from "src/models/application"

export const addAllUsers = createAction(ReduxType.LIST_USERS)<{ users: User[], restId: RestaurantID }>()
export const addUser = createAction(ReduxType.ADD_USER)<{ user: User, restId: RestaurantID }>()
export const updUser = createAction(ReduxType.UPD_USER)<{ user: User, restId: RestaurantID }>()
export const deleteUser = createAction(ReduxType.DELETE_USER)<UserID>()
