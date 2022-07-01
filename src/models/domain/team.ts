import {BoolExt, RestaurantID, TeamCode, TeamID, UserID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"
import {WaiterInfoI} from "src/models/domain/waiter"

export interface TeamI {
    id: TeamID
    restaurant_id: RestaurantID
    lead_id: Nullable<UserID>
    team_code: TeamCode

    team_name: string

    group_tips: BoolExt
    show_list?: BoolExt
    show_waiter_list?: BoolExt

    use_team_code: BoolExt
    show_last_name: BoolExt

    show_waiter: BoolExt

    waiters?: WaiterInfoI[]
}
