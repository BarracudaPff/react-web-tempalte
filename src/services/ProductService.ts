import {ApiService} from "src/services"
import {UserInfoI} from "src/models/domain"

export class UserService {
    static listUsers() {
        return ApiService.listUsers()
    }

    static getUser(id: number) {
        return ApiService.getUser(id)
    }

    static addUser(info: UserInfoI) {
        return ApiService.addUser(info)
    }
}
