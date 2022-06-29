import {PayoutStatus} from "src/models/types/base"
import {Best2PayID, Double, RestaurantID, UserID} from "src/models/types/primitive"
import {Patch, staticMappable} from "src/models/types/mapping"
import {PayoutI, RestaurantPayoutI, WaiterPayoutI} from "src/models/domain/payouts"
import {PC} from "src/models/config"
import {RecordAt} from "src/models/application/base"
import {Nullable} from "src/models/types/utility"

@staticMappable<PayoutI, Payout>()
export class Payout extends RecordAt implements Patch<PayoutI, PC.Payout> {
    id: UserID
    payoutStatus: PayoutStatus
    payoutTxid: Best2PayID
    amount: Double

    constructor(data: PayoutI) {
        super(data)
        this.id = data.id
        this.payoutStatus = data.payout_status
        this.payoutTxid = data.payout_txid
        this.amount = data.amount
    }
}

@staticMappable<WaiterPayoutI, WaiterPayout>()
export class WaiterPayout extends Payout implements Patch<WaiterPayoutI, PC.WaiterPayout> {
    userId: UserID
    feeAmount: Double

    constructor(data: WaiterPayoutI) {
        super(data)
        this.userId = data.user_id
        this.feeAmount = data.fee_amount
    }
}

@staticMappable<RestaurantPayoutI, RestaurantPayout>()
export class RestaurantPayout extends Payout implements Patch<RestaurantPayoutI, PC.RestaurantPayout> {
    bik: Nullable<string>
    restaurantId: RestaurantID
    accountNumber: Nullable<string>
    cardUser: boolean

    constructor(data: RestaurantPayoutI) {
        super(data)
        this.bik = data.bik
        this.restaurantId = data.restaurant_id
        this.accountNumber = data.account_number
        this.cardUser = !!data.card_user
    }
}
