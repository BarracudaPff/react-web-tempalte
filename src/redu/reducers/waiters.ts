import * as waitersAct from "src/redu/actions/waiters"
import {ActionType, createReducer} from "typesafe-actions"
import {User} from "src/models/application"
import {addAllUsers, addUser, deleteUser, updUser} from "src/redu/actions/waiters"
import {RestaurantID} from "src/models/types/primitive"

export interface WaitersState {
    data: {
        user: User
        restId: RestaurantID
    }[];
}

export type WaiterActionType = ActionType<typeof waitersAct>

const waiters = createReducer<WaitersState, WaiterActionType>({
    data: [],
})
    .handleAction(addAllUsers, (state, { payload }) => ({
        ...state,
        data: payload.users.map((item, i) => Object.assign({}, { user: item, restId: payload.restId }, state.data[i]))
    }))
    .handleAction(addUser, (state, { payload }) => ({
        ...state,
        data: [...state.data, payload]
    }))
    .handleAction(updUser, (state, { payload }) => ({
        ...state,
        data: state.data.map((item) => {
            if (item.user.id === payload.user.id) {
                item = payload
            }

            return item
        })
    }))
    .handleAction(deleteUser, (state, { payload }) => ({
        ...state,
        data: state.data.filter(it => it.user.id != payload)
    }))

export default waiters
