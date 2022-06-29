import {RestaurantID, TeamCode, TeamID, UserID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"
import {Patch, staticMappable} from "src/models/types/mapping"
import {TeamI} from "src/models/domain/team"
import {PC} from "src/models/config"

@staticMappable<TeamI, Team>()
export class Team implements Patch<TeamI, PC.Team> {
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

    constructor(data: TeamI) {
        this.id = data.id
        this.restaurantId = data.restaurant_id
        this.leadId = data.lead_id
        this.groupTips = !!data.group_tips
        this.showList = !!data.show_list
        this.showLastName = !!data.show_last_name
        this.useTeamCode = !!data.use_team_code
        this.teamCode = data.team_code
        this.teamName = data.team_name
        this.showWaiter = !!data.show_waiter
    }
}
