import * as restAct from "src/redu/actions/rest"
import {addRest, addAllRest} from "src/redu/actions/rest"
import {ActionType, createReducer} from "typesafe-actions"
import {Restaurant} from "src/models/application/restaurants"

export interface RestState {
    data: {
        rest: Restaurant,
    }[]
}

export type RestActionType = ActionType<typeof restAct>

const user = createReducer<RestState, RestActionType>({
    data: []
})
    .handleAction(addAllRest, (state, { payload }) => ({
        data: payload.map((item, i) => Object.assign({}, { rest: item }, state.data[i]))
    }))
    .handleAction(addRest, (state, { payload }) => ({
        data: [...state.data, { rest: payload }]
    }))

export default user
