import {ReduxType} from "src/redu"
import {createAction} from "typesafe-actions"
import {User} from "src/models/application"

export const logIn = createAction(ReduxType.LOG_IN)<User>()
export const logOut = createAction(ReduxType.LOG_OUT)<User>()
