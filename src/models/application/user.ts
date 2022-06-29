import {Email, Password, Phone, UserID} from "src/models/types/primitive"
import {StaffStatus, UserRank} from "src/models/types/base"
import {Nullable} from "src/models/types/utility"
import {Patch, PatchHard, staticMappable} from "src/models/types/mapping"
import {UserExtendedI, UserI} from "src/models/domain"
import {PC} from "src/models/config"
import {RecordAt} from "src/models/application/base"
import {WaiterInfoExtended} from "src/models/application/waiter"

@staticMappable<UserI, User>()
export class User extends RecordAt implements Patch<UserI, PC.User> {
    id: UserID
    email: Nullable<Email>
    phone: Nullable<Phone>
    password: Password
    rank: UserRank
    isStaff: boolean
    isFinanceManager: boolean
    staffStatus: StaffStatus

    constructor(data: UserI) {
        super(data)
        this.id = data.id
        this.email = data.email
        this.phone = data.phone
        this.password = data.password
        this.rank = data.rank
        this.isStaff = !!data.is_staff
        this.isFinanceManager = !!data.is_finance_manager
        this.staffStatus = data.staff_status
    }

    adminInitUri() {
        return this.rank <= UserRank.WAITER ? '/admin/profile' : '/admin/restaurants'
    }
}

@staticMappable<UserExtendedI, UserExtended>()
export class UserExtended extends User implements PatchHard<UserExtendedI, PC.UserExtended, {
    waiterInfo: WaiterInfoExtended
}> {
    waiterInfo: WaiterInfoExtended

    constructor(data: UserExtendedI) {
        super(data)
        this.waiterInfo = new WaiterInfoExtended(data.waiter_info)
    }
}
