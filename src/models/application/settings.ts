import {UserID} from "src/models/types/primitive"
import {Patch, staticMappable} from "src/models/types/mapping"
import {PC} from "src/models/config"
import {RecordAt} from "src/models/application/base"
import {TgBotSettingsI} from "src/models/domain/settings"

@staticMappable<TgBotSettingsI, TgBotSettings>()
export class TgBotSettings extends RecordAt implements Patch<TgBotSettingsI, PC.TgBotSettings> {
    userId: UserID
    tgToken: string
    isActive: boolean
    payoutNotify: boolean
    payoutsNotify: boolean
    tipsNotify: boolean

    constructor(data: TgBotSettingsI) {
        super(data)
        this.userId = data.user_id
        this.tgToken = data.tg_token
        this.isActive = !!data.is_active
        this.payoutNotify = !!data.payout_notify
        this.payoutsNotify = !!data.payouts_notify
        this.tipsNotify = !!data.tips_notify
    }
}
