import * as waitersAct from "src/redu/actions/waiters"
import {ActionType, createReducer} from "typesafe-actions"
import {User} from "src/models/application"
import {addAllUsers, addUser, deleteUser, updUser} from "src/redu/actions/waiters"

export interface WaitersState {
    data: {
        user: User
    }[];
}

export type WaiterActionType = ActionType<typeof waitersAct>

const waiters = createReducer<WaitersState, WaiterActionType>({
    data: [],
})
    .handleAction(addAllUsers, (state, { payload }) => ({
        ...state,
        data: payload.map((item, i) => Object.assign({}, { user: item }, state.data[i]))
    }))
    .handleAction(addUser, (state, { payload }) => ({
        ...state,
        data: [...state.data, { user: payload }]
    }))
    .handleAction(updUser, (state, { payload }) => ({
        ...state,
        data: state.data.map(({ user }) => {
            if (user.id === payload.id) {
                user = payload
            }

            return { user }
        })
    }))
    .handleAction(deleteUser, (state, { payload }) => ({
        ...state,
        data: state.data.filter(it => it.user.id != payload)
    }))

export default waiters
