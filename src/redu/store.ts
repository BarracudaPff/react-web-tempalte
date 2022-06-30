import {combineReducers, createStore} from "redux";
import {AppState} from ".";
import user, {UserActionType} from "./reducers/user";
import rest, {RestActionType} from "./reducers/rest";
import {Dispatch} from "react"
import {TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux} from "react-redux"
import waiters, {WaiterActionType} from "src/redu/reducers/waiters"


/**
 * navigation must always be last reducer
 */
const rootReducer = combineReducers<AppState>({
    user: user,
    rest: rest,
    waiters: waiters,
    // goods: goods,
    // user: user
});

// const actionTypeEnumToString = (action: any): any => typeof action.type === "number" && ReduxType[action.type]
//     ? ({ ...action, type: ReduxType[action.type] }) : action;
//
// const logger = createLogger({ actionTransformer: actionTypeEnumToString, logger: console, colors: false });
// const composeEnhancers = composeWithDevTools({ actionSanitizer: actionTypeEnumToString });
const store = createStore(rootReducer,
    // Config.logRedux ? composeEnhancers(applyMiddleware(logger)) : composeEnhancers()
);


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = UserActionType | RestActionType | WaiterActionType


export const useDispatch: () => Dispatch<AppDispatch> = useDispatchRedux
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux

export default store;
