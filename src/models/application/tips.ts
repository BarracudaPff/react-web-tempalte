import {BoolExt, Double, Int, RestaurantID, TableNumber, TipRecordID, UserID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"
import {Patch, staticMappable} from "src/models/types/mapping"
import {TipRecordI} from "src/models/domain/tips"
import {PC} from "src/models/config"
import {RecordAt} from "src/models/application/base"

@staticMappable<TipRecordI, TipRecord>()
export class TipRecord extends RecordAt implements Patch<TipRecordI, PC.TipRecord> {
    id: TipRecordID
    userId: UserID
    restaurantId: RestaurantID
    isGroup: boolean
    feeAmount: Double
    waiterAmount: Double
    rating: Int
    comment: Nullable<string>
    zeroFee: boolean
    tipsAmount: Double
    restaurantAmount: Double
    fullAmount: Double
    tableNumber: Nullable<TableNumber>

    constructor(data: TipRecordI) {
        super(data)
        this.id = data.id
        this.userId = data.user_id
        this.restaurantId = data.restaurant_id
        this.isGroup = !!data.is_group
        this.feeAmount = data.fee_amount
        this.waiterAmount = data.waiter_amount
        this.rating = data.rating
        this.comment = data.comment
        this.zeroFee = !!data.zero_fee
        this.tipsAmount = data.tips_amount
        this.restaurantAmount = data.restaurant_amount
        this.fullAmount = data.full_amount
        this.tableNumber = data.table_number
    }
}
