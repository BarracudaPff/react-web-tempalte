import {RecordAtI} from "./base";
import {PayoutStatus} from "src/models/types/base"
import {Best2PayID, BoolExt, Double, RestaurantID, UserID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"

export interface PayoutI extends RecordAtI {
    id: UserID
    payout_status: PayoutStatus
    payout_txid: Best2PayID
    amount: Double
}

export interface WaiterPayoutI extends PayoutI {
    user_id: UserID
    fee_amount: Double
}

export interface RestaurantPayoutI extends PayoutI {
    restaurant_id: RestaurantID
    bik: Nullable<string>
    account_number: Nullable<string>
    card_user: BoolExt
}
