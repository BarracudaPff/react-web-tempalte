import {RecordAtI} from "./base";
import {BoolExt, UserID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"

export interface TgBotSettingsI extends RecordAtI {
    user_id: UserID
    tg_token: string
    is_active: BoolExt
    tips_notify: BoolExt
    payout_notify: BoolExt
    payouts_notify: Nullable<BoolExt>
}
