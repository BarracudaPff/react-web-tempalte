import {BoolExt, Email, Password, Phone, UserID} from "src/models/types/primitive"
import {StaffStatus, UserRank} from "src/models/types/base"
import {RecordAtI} from "src/models/domain/base"
import {CommentI, WaiterInfoI} from "src/models/domain/waiter"
import {Nullable} from "src/models/types/utility"
import {TipRecordI} from "src/models/domain/tips"
import {PayoutI} from "src/models/domain/payouts"

export interface UserI extends RecordAtI {
    id: UserID
    email: Nullable<Email>
    phone: Nullable<Phone>
    password: Password
    rank: UserRank
    is_staff: BoolExt
    is_finance_manager: BoolExt
    staff_status: StaffStatus

    waiter_info?: WaiterInfoI
    tips?: TipRecordI[]
    payouts?: PayoutI[]
    comments?: CommentI[]
}
