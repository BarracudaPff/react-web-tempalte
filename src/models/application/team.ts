import {RestaurantID, TeamCode, TeamID, UserID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"
import {PatchHard, staticMappable} from "src/models/types/mapping"
import {TeamI} from "src/models/domain/team"
import {PC} from "src/models/config"
import {WaiterInfo} from "src/models/application/waiter"

@staticMappable<TeamI, Team>()
export class Team implements PatchHard<TeamI, PC.Team, {
    waiters?: WaiterInfo[]
}> {
    id: TeamID
    restaurantId: RestaurantID
    leadId: Nullable<UserID>
    teamCode: TeamCode

    teamName: string

    groupTips: boolean
    showList: boolean

    useTeamCode: boolean
    showLastName: boolean

    showWaiter: boolean

    waiters?: WaiterInfo[]

    constructor(data: TeamI) {
        this.id = data.id
        this.restaurantId = data.restaurant_id
        this.leadId = data.lead_id
        this.groupTips = !!data.group_tips
        this.showList = !!(data.show_list ?? data.show_waiter_list) // TODO: remove hardcode
        this.showLastName = !!data.show_last_name
        this.useTeamCode = !!data.use_team_code
        this.teamCode = data.team_code
        this.teamName = data.team_name
        this.showWaiter = !!data.show_waiter

        this.waiters = data.waiters?.map(it => new WaiterInfo(it))
    }
}
