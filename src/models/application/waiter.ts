import {CardID, CommentID, Double, RestaurantID, TeamID, UserID, WaiterCode, WaiterType} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"
import {Patch, PatchHard, staticMappable} from "src/models/types/mapping"
import {CommentI, WaiterInfoExtendedI, WaiterInfoI, WaiterInfoNarrowI} from "src/models/domain/waiter"
import {PC, PCH} from "src/models/config"
import {RecordAt} from "src/models/application/base"
import {TipRecord} from "src/models/application/tips"
import {Payout} from "src/models/application/payouts"
import {Restaurant} from "src/models/application/restaurants"

@staticMappable<WaiterInfoI, WaiterInfo>()
export class WaiterInfo extends RecordAt implements Patch<WaiterInfoI, PC.WaiterInfo> {
    userId: UserID
    restaurantId: RestaurantID
    teamId: Nullable<TeamID>
    cardId: Nullable<CardID>
    isFake: boolean
    avatar: string
    firstName: string
    lastName: Nullable<string>
    phoneLinked: boolean
    autoPayout: boolean
    customFee: Nullable<Double>
    waiterVerified: boolean
    rating: Double
    balance: Double
    waiterType: WaiterType
    waiterCode: WaiterCode
    goal: Nullable<string>

    constructor(data: WaiterInfoI) {
        super(data)
        this.userId = data.user_id
        this.restaurantId = data.restaurant_id
        this.teamId = data.team_id
        this.cardId = data.card_id
        this.isFake = !!data.is_fake
        this.avatar = data.avatar
        this.firstName = data.first_name
        this.lastName = data.last_name
        this.phoneLinked = !!data.phone_linked
        this.autoPayout = !!data.auto_payout
        this.customFee = data.custom_fee
        this.waiterVerified = !!data.waiter_verified
        this.rating = data.rating
        this.balance = data.balance
        this.waiterType = data.waiter_type
        this.waiterCode = data.waiter_code
        this.goal = data.goal
    }
}

@staticMappable<WaiterInfoExtendedI, WaiterInfoExtended>()
export class WaiterInfoExtended extends WaiterInfo implements PatchHard<WaiterInfoExtendedI, PC.WaiterInfo, PCH.WD> {
    restaurant: Restaurant
    tips: TipRecord[]
    payouts: Payout[]

    constructor(data: WaiterInfoExtendedI) {
        super(data);
        this.restaurant = new Restaurant(data.restaurant)
        this.tips = data.tips.map(it => new TipRecord(it))
        this.payouts = data.payouts.map(it => new Payout(it))
    }
}

@staticMappable<WaiterInfoNarrowI, WaiterInfoNarrow>()
export class WaiterInfoNarrow implements PatchHard<WaiterInfoNarrowI, PC.WaiterInfoNarrow, PCH.WIN> {
    isTeam: boolean
    waiter?: WaiterInfo
    restaurant: Restaurant
    teamList: WaiterInfo[]
    content: undefined

    constructor(data: WaiterInfoNarrowI) {
        this.isTeam = data.is_team
        this.waiter = data.content.waiter && new WaiterInfo(data.content.waiter)
        this.restaurant = new Restaurant(data.content.restaurant)
        this.teamList = data.content.team_list.map(it => new WaiterInfo(it))
    }
}

@staticMappable<CommentI, Comment>()
export class Comment implements Patch<CommentI, PC.Comment> {
    id: CommentID
    waiterId: UserID
    restaurantId: RestaurantID
    rating: number
    comment: string
    remarks: any[]
    table: string

    constructor(data: CommentI) {
        this.id = data.id
        this.waiterId = data.waiter_id
        this.restaurantId = data.restaurant_id
        this.rating = data.rating
        this.comment = data.comment
        this.remarks = data.remarks
        this.table = data.table
    }
}
