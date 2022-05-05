import {UserInfo} from "src/models/application"
import {ResponseI, UserInfoI} from "src/models/domain"

export default interface ApiServiceI {
    listUsers(): Promise<UserInfo[]>

    getUser(id: number): Promise<UserInfo>

    addUser(info: UserInfoI): Promise<UserInfo>
}
