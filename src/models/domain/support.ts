import {Nullable} from "src/models/types/utility"
import {Email, TicketID, TicketMessageID, UserID} from "src/models/types/primitive"
import {TicketStatus} from "src/models/types/base"

export interface TicketNewDataI {
    topic: string,
    message: string,
    attachment: string[]
}

export interface TicketI {
    id: TicketID
    email: Nullable<Email>
    ticket_token: Nullable<string>
    user_id: Nullable<UserID>
    ticket_topic: string
    ticket_status: TicketStatus
    last_message: Nullable<TicketMessageI>
    messages: Nullable<TicketMessageI[]>
}

export interface TicketMessageI {
    id: TicketMessageID
    user_id: Nullable<UserID>
    ticket_id: TicketID
    message: string
    attachments: string[]
    // user?: UserExtendedI
}
