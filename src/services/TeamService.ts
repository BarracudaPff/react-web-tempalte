import {ApiService} from "src/services"
import {RestaurantID, TeamID, UserID} from "src/models/types/primitive"
import {RestField} from "src/services/api/ApiService"

export class TeamService {
    static list(restId?: RestaurantID) {
        return ApiService.listRest(restId, [RestField.TEAMS])
            .then(rests => rests[0].teams!!)
    }

    static add(restId: RestaurantID, data: {
        name: string,
        showLastName: boolean,
        useTeamCode: boolean,
        groupTips: boolean,
        showList: boolean,
    }) {
        return ApiService.addTeam(restId, data)
    }

    static update(teamId: TeamID, data: {
        leadId: UserID,
        name: string,
        showLastName: boolean,
        useTeamCode: boolean,
        groupTips: boolean,
        showList: boolean,
        showWaiter: boolean,
    }) {
        return ApiService.updateTeam(teamId, data)
    }

    static delete(id: TeamID) {
        return ApiService.deleteTeam(id)
    }
}
