import {staticImplements} from "src/models/types/mapping";
import ApiServiceI from "src/services/api/base"
import {UserInfo} from "src/models/application"
import {UserInfoI} from "src/models/domain"
import {parseRequest, parseRequestArr} from "src/services"
import {API} from "src/services/Endpoints"
import {BaseApiService} from "src/services/BaseApiService"

@staticImplements<ApiServiceI>()
export default class {
    static listUsers(): Promise<UserInfo[]> {
        return parseRequestArr(BaseApiService.get(API.ListUsers), UserInfo)
    }

    static getUser(id: number): Promise<UserInfo> {
        return parseRequest(BaseApiService.get(API.ListUsers, { id: id.toString() }), UserInfo)
    }

    static addUser(info: UserInfoI): Promise<UserInfo> {
        return parseRequest(BaseApiService.post(API.AddUser, info), UserInfo)
    }
}
