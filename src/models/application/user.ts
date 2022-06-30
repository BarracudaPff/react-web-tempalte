import {Email, Password, Phone, UserID} from "src/models/types/primitive"
import {StaffStatus, UserRank} from "src/models/types/base"
import {Nullable} from "src/models/types/utility"
import {PatchHard, staticMappable} from "src/models/types/mapping"
import {UserI} from "src/models/domain"
import {PC} from "src/models/config"
import {RecordAt} from "src/models/application/base"
import {Comment, WaiterInfo} from "src/models/application/waiter"
import {TipRecord} from "src/models/application/tips"
import {Payout} from "src/models/application/payouts"

@staticMappable<UserI, User>()
export class User extends RecordAt implements PatchHard<UserI, PC.User, {
    waiterInfo?: WaiterInfo
    tips?: TipRecord[]
    payouts?: Payout[]
    comments?: Comment[]
}> {
    id: UserID
    email: Nullable<Email>
    phone: Nullable<Phone>
    password: Password
    rank: UserRank
    isStaff: boolean
    isFinanceManager: boolean
    staffStatus: StaffStatus

    waiterInfo?: WaiterInfo
    tips?: TipRecord[]
    payouts?: Payout[]
    comments?: Comment[]

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

        this.waiterInfo = data.waiter_info && new WaiterInfo(data.waiter_info)
        this.tips = data.tips?.map(it => new TipRecord(it))
        this.payouts = data.payouts?.map(it => new Payout(it))
        this.comments = data.comments?.map(it => new Comment(it))
    }

    isWaiter() {
        return this.rank == UserRank.OWNER
    }

    isManagerOrStronger() {
        return this.rank >= UserRank.MANAGER
    }

    isManager() {
        return this.rank == UserRank.MANAGER
    }

    isOwner() {
        return this.rank == UserRank.OWNER
    }

    fullName = () => {
        if (!this.waiterInfo) return ""
        return this.waiterInfo.firstName + " " + (this.waiterInfo.lastName ?? "")
    }

    adminInitUri() {
        return this.rank <= UserRank.WAITER ? "/admin/profile" : "/admin/restaurants"
    }
}
