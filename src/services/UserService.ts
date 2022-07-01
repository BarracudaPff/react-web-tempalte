import {ApiService} from "src/services"
import {Platform} from "src/utils/platform"
import {StorageService} from "src/services/StorageService"
import {AuthPhoneRequest, AuthPhoneSIDRequest, UserI} from "src/models/domain"
import {User} from "src/models/application"
import {Email, Password, Phone, RestaurantID, TeamID, UserID, WaiterCode} from "src/models/types/primitive"
import {UserField} from "src/services/api/ApiService"
import {RestService} from "src/services/RestService"

export class UserService {
    static login(email: string, password: string) {
        return ApiService.loginEmailSimple({
            email,
            password,
            os: Platform.OS,
            browser: Platform.browser
        }).then(StorageService.setAuthToken)
            .then(_ => ApiService.getMeSimple())
            .then(user => {
                // noinspection JSIgnoredPromiseFromCall
                StorageService.setLocalUser(user)
                return new User(user)
            })
    }

    static listWithFieldsRest(restId?: RestaurantID, userId?: UserID, fields?: UserField[]) {
        return ApiService.listUsers(restId, userId, fields)
    }

    static list(restId?: RestaurantID, userId?: UserID) {
        return ApiService.listUsers(restId, userId, [UserField.WAITER_INFO])
    }

    static fullList(restId?: RestaurantID, userId?: UserID) {
        return ApiService.listUsers(restId, userId, [UserField.WAITER_INFO, UserField.TIPS, UserField.PAYOUTS, UserField.COMMENTS])
    }

    static getPhoneSID(req: AuthPhoneSIDRequest) {
        return ApiService.getPhoneSID(req)
    }

    static loginPhone(req: AuthPhoneRequest) {
        return ApiService.loginPhone(req)
    }

    static getMe() {
        return ApiService.getMe()
    }

    static logout() {
        return ApiService.logout()
    }

    static createNew(
        restaurantId: RestaurantID,
        teamId: TeamID,
        firstName: string,
        // cropS: number,
        customFeeUse: boolean,
        customFee?: number,
        avatar?: File,
        lastName?: string,
        goal?: string,
        email?: Email,
        password?: Password,
        phone?: Phone,
    ) {
        return ApiService.createNewUser({
            avatar: avatar,
            restaurantId: restaurantId,
            teamId: teamId,
            firstName: firstName,
            lastName: lastName,
            goal: goal,
            customFee: customFee ?? 0,
            customFeeUse: customFeeUse,

            email: email,
            password: password,
            phone: phone,

            cropX: 0,
            cropY: 0,
            cropS: 100, //TODO: remove hardcoded int
        })
    }

    //TODO: rewrite when method will be added
    static getFullUser(code: WaiterCode) {
        const restsPr = RestService.listWithFieldsRest(undefined, [])

        return ApiService.getNarrowUserInfo(code).then(async data => {
            const rests = await restsPr
            const rest = rests.find(it => it.fullName == data.restaurant.fullName)
            if (!rest) throw Error("Can't find rest with name " + data.restaurant.fullName)

            const users = await UserService.listWithFieldsRest(rest.id, undefined, [UserField.WAITER_INFO])
            const user = users.find(it => it.waiterInfo?.waiterCode == data.waiter?.waiterCode)
            if (!user || !user.waiterInfo?.waiterCode) throw Error("Can't find user with code " + data.waiter?.waiterCode)

            return UserService.fullList(rest.id, user.id).then(it => it[0])
        })
    }

    static delete(id: UserID) {
        return ApiService.deleteUser(id)
    }
}
