import {ApiService} from "src/services"
import {Platform} from "src/utils/platform"
import {StorageService} from "src/services/StorageService"
import {AuthPhoneRequest, AuthPhoneSIDRequest} from "src/models/domain"
import {User} from "src/models/application"
import {Email, Password, Phone, RestaurantID, TeamID, UserID} from "src/models/types/primitive"
import {UserField} from "src/services/api/ApiService"

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

    static list(restId?: RestaurantID, userId?: UserID) {
        return ApiService.listUsers(restId, userId, [UserField.WAITER_INFO])
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
            cropS: 100,
        })
    }
}
