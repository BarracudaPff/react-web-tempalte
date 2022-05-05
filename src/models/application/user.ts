import {Email, UserID} from "src/models/types/primitive"
import {Patch, staticMappable} from "src/models/types/mapping"
import {UserInfoI} from "src/models/domain"

@staticMappable<UserInfoI, UserInfo>()
export class UserInfo implements Patch<UserInfoI, {
    myUsername: "username"
}> {
    id: UserID
    name: string
    myUsername: UserInfoI["username"]
    email: Email
    address: { street: string; suite: string; city: string; zipcode: string; geo: { lat: string; lng: string } }
    phone: string
    website: string
    company: { name: string; catchPhrase: string; bs: string }

    constructor(props: UserInfoI) {
        this.id = props.id
        this.name = props.name
        this.myUsername = props.username
        this.email = props.email
        this.address = props.address
        this.phone = props.phone
        this.website = props.website
        this.company = props.company
    }

    fullName() {
        return this.name + ", @" + this.myUsername
    }

    fullAddress() {
        const { street, suite, city, zipcode } = this.address
        return street + ", " + suite + ", " + city + ", " + zipcode
    }

    fullCompany() {
        const { name, catchPhrase, bs, } = this.company
        return name + ", " + catchPhrase + ", " + bs
    }
}
