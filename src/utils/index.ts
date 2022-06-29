import {Nullable} from "src/models/types/utility"

export * from "./adaptive"
export * from "./strings"
export * from "./async"
export * from "./date"
export * from "./datetime"
export * from "./helper"
export * from "./money"
export * from "./validators"

export function toQueryArr(key: string, data: Nullable<string>): Record<string, string> {
    if (!data) return {}

    const res: Record<string, string> = {}
    data.split(",").forEach((it, id) => {
        res[`${key}[${id}]`] = it
    })
    return res
}

