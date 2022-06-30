import {
    Restaurant,
    RestaurantAddress,
    RestaurantFinanceInfo,
    RestaurantLegalInfo,
    RestaurantPaymentSettings
} from "src/models/application/restaurants"
import {TipRecord} from "src/models/application/tips"
import {Payout} from "src/models/application/payouts"
import {User} from "src/models/application"
import {WaiterInfo} from "src/models/application/waiter"
import {UserI} from "src/models/domain"
import {UserID} from "src/models/types/primitive"
import {Team} from "src/models/application/team"

export namespace PCH {
    export type Rec = {
        createdAt?: Date
        updatedAt?: Date
    }

    export type WD = {
        restaurant: Restaurant
        tips: TipRecord[]
        payouts: Payout[]
    }

    export type Rest = {
        owner?: User
        manager?: User
        managerId?: UserID
        address?: RestaurantAddress
        legalInfo?: RestaurantLegalInfo
        financeInfo?: RestaurantFinanceInfo
        baseWaiters?: WaiterInfo[]
        paymentSettings?: RestaurantPaymentSettings
        teams?: Team[]
    }
}

export namespace PC {
    export type RestaurantAddress = {
        restaurantId:"restaurant_id"
    }

    export type RestaurantLegalInfo = {
        restaurantId: "restaurant_id"
        organizationFullName: "organization_full_name"
        zipCode: "zip_code"
        russiaSubject: "russia_subject"
    }

    export type RestaurantFinanceInfo = {
        restaurantId: "restaurant_id"
        accountNumber: "account_number"
        cardLinked: "card_linked"
        cardExpire: "card_expire"
        phoneLinked: "phone_linked"
        useCard: "use_card"
        cardBalance: "card_balance"
        lastPayoutRequest: "last_payout_request"
    }

    export type RestaurantPaymentSettings = {
        restaurantId: "restaurant_id"
        hideZeroFeeMark: "hide_zero_fee_mark"
        saveReceiptAmount: "save_receipt_amount"
    }

    export type RestaurantParticularData = {
        financeInfo: "finance_info"
        legalInfo: "legal_info"
        baseWaiters: "base_waiters"
        paymentSettings: "payment_settings"
    } & Restaurant

    export type RestaurantExpanded = {
        ourFee: "our_fee"
    } & Restaurant

    export type Restaurant = {
        ownerId: "owner_id"
        feeAmount: "fee_amount"
        managerId: "manager_id"
        fullName: "full_name"
        verifyStatus: "verify_status"

        financeInfo: "finance_info"
        legalInfo: "finance_info"
        baseWaiters: "finance_info"
        paymentSettings: "finance_info"
    }

    export type WaiterInfo = {
        userId: "user_id"
        restaurantId: "restaurant_id"
        teamId: "team_id"
        cardId: "card_id"
        isFake: "is_fake"
        firstName: "first_name"
        lastName: "last_name"
        phoneLinked: "phone_linked"
        autoPayout: "auto_payout"
        customFee: "custom_fee"
        waiterVerified: "waiter_verified"
        waiterType: "waiter_type"
        waiterCode: "waiter_code"
    }

    export type UserExtended = {
        waiterInfo: "waiter_info"
    } & User

    export type User = {
        isStaff: "is_staff"
        isFinanceManager: "is_finance_manager"
        staffStatus: "staff_status"
    }

    export type TipRecord = {
        userId: "user_id"
        restaurantId: "restaurant_id"
        isGroup: "is_group"
        feeAmount: "fee_amount"
        waiterAmount: "waiter_amount"
        zeroFee: "zero_fee"
        tipsAmount: "tips_amount"
        restaurantAmount: "restaurant_amount"
        fullAmount: "full_amount"
        tableNumber: "table_number"
    }

    export type Team = {
        restaurantId: "restaurant_id"
        leadId: "lead_id"
        teamCode: "team_code"
        teamName: "team_name"
        groupTips: "group_tips"
        showList: "show_list"
        useTeamCode: "use_team_code"
        showLastName: "show_last_name"
        showWaiter: "show_waiter"
    }

    export type TicketMessage = {
        userId: "user_id"
        ticketId: "ticket_id"
    }

    export type Ticket = {
        ticketToken: "ticket_token"
        userId: "user_id"
        ticketTopic: "ticket_topic"
        ticketStatus: "ticket_status"
        lastMessage: "last_message"
    }
    export type TgBotSettings = {
        userId: "user_id"
        tgToken: "tg_token"
        isActive: "is_active"
        tipsNotify: "tips_notify"
        payoutNotify: "payout_notify"
        payoutsNotify: "payouts_notify"
    }

    export type RestaurantPayout = {
        restaurantId: "restaurant_id"
        accountNumber: "account_number"
        cardUser: "card_user"
    } & Payout

    export type WaiterPayout = {
        userId: "user_id"
        feeAmount: "fee_amount"
    } & Payout

    export type Payout = {
        payoutStatus: "payout_status"
        payoutTxid: "payout_txid"
    }

    export type RecordAt = {
        createdAt: "created_at"
        updatedAt: "updated_at"
    }

    export type AuthToken = {
        expireIn: "expire_in"
    }

    export type PageRequest = {
        currentPage: "current_page"
        firstPageUrl: "first_page_url"
        lastPage: "last_page"
        lastPageUrl: "last_page_url"
        nextPageUrl: "next_page_url"
        perPage: "per_page"
        prevPageUrl: "prev_page_url"
    }

    export type RestaurantDesign = RecordAt & {
        restaurantId: "restaurant_id"
        hideOurLogo: "hide_our_logo"
        bgGrad: "bg_grad"
        fgGrad: "fg_grad"
        commentFrame: "comment_frame"
        bigLogo: "big_logo"
        smallLogo: "small_logo"
        additionalFields: "additional_fields"
    }
}
