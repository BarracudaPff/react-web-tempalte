import {BoolExt, CardID, Double, RestaurantID, TeamID, UserID, WaiterCode, WaiterType} from "src/models/types/primitive"
import {RecordAtI} from "src/models/domain/base"
import {Nullable} from "src/models/types/utility"
import {TipRecordI} from "src/models/domain/tips"
import {PayoutI} from "src/models/domain/payouts"
import {RestaurantI} from "src/models/domain/restaurants"

export interface WaiterInfoI extends RecordAtI {
    user_id: UserID, //ID пользователя
    restaurant_id: RestaurantID, //ID ресторана (к которому он прикреплен)
    team_id: Nullable<TeamID>, //ID команды (к которой он прикреплен)
    card_id: Nullable<CardID>, //ID основной карты

    is_fake: BoolExt, //Флаг (0-1) - является ли официант фековым (пока не используется)

    avatar: string, //Ссылка на аватар (имя файла)

    first_name: string, //Имя
    last_name: Nullable<string>, //Фамилия

    phone_linked: BoolExt, //Привязан ли телефон в системе best2pay

    auto_payout: BoolExt, //Флаг, отвечающий за то, выводить ли деньги автоматически на карту или нет

    custom_fee: Nullable<Double>, //Кастомная комиссия в процентах (Если 0, то берется комиссия ресторана)

    waiter_verified: BoolExt, //Официант верифицирован

    rating: Double, //Рейтинг официанта
    balance: Double, //Баланс официанта

    waiter_type: WaiterType, //Тип официанта (пока не используется)

    waiter_code: WaiterCode, //Личный код официанта (Требуется для отправки чаевых)
    goal: Nullable<string>, //На что пойдут чаевые
}

export interface WaiterInfoExtendedI extends WaiterInfoI {
    restaurant: RestaurantI
    tips: TipRecordI[]
    payouts: PayoutI[]
}
