import {ReduxType} from "src/redu"
import {createAction} from "typesafe-actions"
import {Restaurant} from "src/models/application/restaurants"

export const addAllRest = createAction(ReduxType.LIST_REST)<Restaurant[]>()

export const addRest = createAction(ReduxType.ADD_REST)<Restaurant>()
