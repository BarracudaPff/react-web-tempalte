import {Dispatch, SetStateAction} from "react"

export default function <T>(part: Partial<T>, dispatch: Dispatch<SetStateAction<T>>) {
    return dispatch(it => ({ ...it, ...part }))
}
