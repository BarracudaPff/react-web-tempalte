export type Int = number
export type Double = number

export type Email = string

export type UserID = number

export type DateExt = Date | number | string
export type BoolExt = boolean | number
export type SupportedPlatform = "android" | "ios"

export function toBoolExt(value: any): BoolExt {
    return !!value ? 1 : 0
}
