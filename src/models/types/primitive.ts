export type Int = number
export type Double = number
export type Color = string
export type Email = string
export type Phone = string
export type Password = string

export type TokenID = number
export type UserID = number
export type TipRecordID = number
export type RestaurantID = number
export type CardID = number
export type TeamID = number
export type TicketID = number
export type TicketMessageID = number
export type Best2PayID = string

export type TableNumber = string // string
export type WaiterCode = string // [6]string
export type TeamCode = string // [10]string

export type WaiterType = string

export type DateExt = Date | number | string
export type BoolExt = boolean | number
export type SupportedPlatform = "android" | "ios"

export function toBoolExt(value: any): BoolExt {
    return !!value ? 1 : 0
}
