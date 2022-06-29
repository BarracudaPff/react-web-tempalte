import {RecordAtI} from "./base";
import {BoolExt, Double, Int, RestaurantID, TableNumber, TipRecordID, UserID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"

export interface TipRecordI extends RecordAtI {
    id: TipRecordID
    user_id: UserID
    restaurant_id: RestaurantID
    is_group: BoolExt
    fee_amount: Double
    waiter_amount: Double
    rating: Int
    comment: Nullable<string>
    zero_fee: BoolExt

    tips_amount: Double
    restaurant_amount: Double
    full_amount: Double
    table_number: Nullable<TableNumber>
}
