import {Email, UserID} from "src/models/types/primitive"

export interface UserInfoI {
    id: UserID,
    name: string,
    username: string,
    email: Email,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
