import {ApiService} from "src/services"
import {Platform} from "src/utils/platform"
import {StorageService} from "src/services/StorageService"
import {AuthPhoneRequest, AuthPhoneSIDRequest} from "src/models/domain"
import {User} from "src/models/application"

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
}
