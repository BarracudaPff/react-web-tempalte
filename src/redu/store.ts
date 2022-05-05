import {combineReducers, createStore} from "redux";
import {AppState} from ".";
import user, {UserActionType} from "./reducers/user";
import {Dispatch} from "react"
import {TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux} from "react-redux"


/**
 * navigation must always be last reducer
 */
const rootReducer = combineReducers<AppState>({
    user: user,
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
export type AppDispatch = UserActionType


export const useDispatch: () => Dispatch<AppDispatch> = useDispatchRedux
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux

export default store;
