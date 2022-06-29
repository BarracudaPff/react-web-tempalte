import {ApiService} from "src/services"
import {Platform} from "src/utils/platform"
import {StorageService} from "src/services/StorageService"
import {AuthPhoneRequest, AuthPhoneSIDRequest} from "src/models/domain"

export class UserService {
    static login(email: string, password: string) {
        return ApiService.loginEmail({
            email,
            password,
            os: Platform.OS,
            browser: Platform.browser
        }).then(StorageService.setAuthToken)
            .then(_ => UserService.getMe())
            .then(user => {
                // noinspection JSIgnoredPromiseFromCall
                StorageService.setLocalUser(user)
                StorageService.getLocalUser().then(a=>console.log({a}))
                return user
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
