import AsyncStorage from "@barracudapff/async-storage";
import {AuthToken, User} from "src/models/application"

const prefix = "@pt"

const LOCAL_STORAGE = {
    AUTH: "@AUTH",
    USER: "@USER",
    LOGIN_NAME: "@LOGIN_NAME",
}

function getArray(key: string): Promise<any[]> {
    return AsyncStorage.getItem(key).then(data => data ? JSON.parse(data) : []);
}

function setArray(key: string, array: []): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(array));
}

function addToArray(key: string, item: any): Promise<void> {
    return getArray(key).then(data => {
        data.push(item);
        return setArray(key, data as []);
    });
}

function removeFromArrayByValue(key: string, item: any) {
    return getArray(key).then(data => {
        let newData = data.filter((value) => item.key !== value.key);

        if (newData.length === 0) {
            newData = [];
        }

        return setArray(key, newData as [])
    });
}

function removeFromArrayByIndex(key: string, index: number) {
    return getArray(key).then(data => {
        data.splice(index, 1)
        return setArray(key, data as [])
    });
}

class StorageService {
    // userData?: UserNarrowFull

    // storeNewAuthCredential(data: Object): Promise<void> {
    //     return addToArray(keys.AUTH, data)
    // }
    //
    // setCurrentCredential(data: Object): Promise<void> {
    //     return setValue(keys.CURRENT_AUTH, data)
    // }
    //
    // getCurrentCredential(): Promise<auth.AuthCredential> {
    //     return getValue(keys.CURRENT_AUTH)
    // }
    //

    // Auth data
    static getAuthToken(): Promise<AuthToken | null> {
        return StorageService.getObject(LOCAL_STORAGE.AUTH)
    }

    static setAuthToken(token: AuthToken): Promise<void> {
        return StorageService.setObject(LOCAL_STORAGE.AUTH, token)
    }

    static removeAuthToken(): Promise<void> {
        return StorageService.setObject(LOCAL_STORAGE.AUTH, null)
    }

    static getLocalUser(): Promise<User | null> {
        return StorageService.getObject(LOCAL_STORAGE.USER)
    }

    static setLocalUser(user: User): Promise<void> {
        return StorageService.setObject(LOCAL_STORAGE.USER, user)
    }

    static removeLocalUser(): Promise<void> {
        return StorageService.setObject(LOCAL_STORAGE.USER, null)
    }

    // User info
    // getUserInfo(): Promise<UserNarrowFull | null> {
    //     return new Promise(resolve => resolve(this.userData))
    //     // return StorageService.getObject(keys.USER_INFO)
    // }
    //
    // setUserInfo(token: UserNarrowFull): Promise<void> {
    //     return new Promise(resolve => {
    //         this.userData = token
    //         resolve()
    //     })
    //     // return StorageService.setObject(keys.USER_INFO, token)
    // }
    //
    // removeUserInfo(): Promise<void> {
    //     return new Promise(resolve => {
    //         this.userData = undefined
    //         resolve()
    //     })
    //     // return StorageService.setObject(keys.USER_INFO, null)
    // }

    // // QR image
    // getQRImage(): Promise<any | null> {
    //     return StorageService.getObject(keys.QR_IMAGE)
    // }
    //
    // setQRImage(token: any): Promise<void> {
    //     return StorageService.setObject(keys.QR_IMAGE, token)
    // }
    //
    // removeQRImage(): Promise<void> {
    //     return StorageService.setObject(keys.QR_IMAGE, null)
    // }

    private static setObject<T>(key: string, value: T): Promise<void> {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    private static getObject<T>(key: string): Promise<T | null> {
        return AsyncStorage.getItem(key)
            .then(value => {
                if (value != null) {
                    return JSON.parse(value) as T
                } else {
                    return null
                }
            })
    }

    //
    // removeAuthCredentials(cred: Object): Promise<void> {
    //     return removeFromArrayByValue(keys.AUTH, cred)
    // }
    //
    // getPaymentCards(): Promise<any> {
    //     return getArray(keys.PAY_CARDS)
    // }
    //
    // storePaymentCard(card: IPaymentCard): Promise<void> {
    //     return addToArray(keys.PAY_CARDS, card)
    // }
    //
    // removePaymentCard(card: IPaymentCard): Promise<void> {
    //     return removeFromArrayByValue(keys.PAY_CARDS, card)
    // }
    //
    // Settings
    // storeSettings(settings: ISettings): Promise<void> {
    //     if (typeof settings.user != "string") {
    //         throw Error("passed wrong user type to settings")
    //     }
    //
    //     return setObject(keys.SETTINGS, settings)
    // }
    //
    // getSettings(): Promise<ISettings | null> {
    //     return getObject<ISettings>(keys.SETTINGS);
    // }
    //
    //
    //
    // /**
    //  * DO NOT USE IT IN APP, ONLY FOR TESTS
    //  * and be sure that you know what you are doing :)
    //  * @returns {Promise<void[]>}
    //  */
    // clearStorage(): Promise<void[]> {
    //     return Promise.all(Object.values(keys).map(key => AsyncStorage.removeItem(key)))
    // }
    //
    // /**
    //  * DO NOT USE IT IN APP, ONLY FOR TESTS
    //  * and be sure that you know what you are doing :)
    //  * @returns {Promise<any[]>}
    //  */
    // getStorage(): Promise<any[]> {
    //     return Promise.all(Object.values(keys).map(value => StorageService.getObject<any>(value)))
    // }
}

export {StorageService, LOCAL_STORAGE};
