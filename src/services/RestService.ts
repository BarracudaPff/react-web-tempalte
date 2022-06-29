import {ApiService} from "src/services"
import {RestField} from "src/services/api/ApiService"

export class RestService {
    static createNewRest(name: string, percent: number) {
        return ApiService.createNewRest(name, percent)
    }

    static listRest(id?: string) {
        return ApiService.listRest(id, [RestField.OWNER, RestField.MANAGER, RestField.WAITERS_BASE, RestField.INFO_FINANCE])
    }
}
