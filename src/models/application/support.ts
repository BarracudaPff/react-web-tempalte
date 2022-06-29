import {TicketI, TicketMessageI, TicketNewDataI} from "src/models/domain/support"
import {Patch, PatchHard, staticMappable} from "src/models/types/mapping"
import {Nullable} from "src/models/types/utility"
import {Email, TicketID, TicketMessageID, UserID} from "src/models/types/primitive"
import {TicketStatus} from "src/models/types/base"
import {PC} from "src/models/config"

@staticMappable<TicketNewDataI, TicketNewData>()
export class TicketNewData implements Patch<TicketNewDataI> {
    topic: string
    message: string
    attachment: string[]

    constructor(data: TicketNewDataI) {
        this.topic = data.topic
        this.message = data.message
        this.attachment = data.attachment
    }
}

@staticMappable<TicketI, Ticket>()
export class Ticket implements PatchHard<TicketI, PC.Ticket, {
    lastMessage: Nullable<TicketMessage>,
    messages: Nullable<TicketMessage[]>
}> {
    id: TicketID
    email: Nullable<Email>
    ticketToken: Nullable<string>
    userId: Nullable<UserID>
    ticketTopic: string
    ticketStatus: TicketStatus
    lastMessage: Nullable<TicketMessage>
    messages: Nullable<TicketMessage[]>

    constructor(data: TicketI) {
        this.id = data.id
        this.email = data.email
        this.ticketToken = data.ticket_token
        this.userId = data.user_id
        this.ticketTopic = data.ticket_topic
        this.ticketStatus = data.ticket_status
        this.lastMessage = data.last_message ? new TicketMessage(data.last_message) : data.last_message
        this.messages = data.messages ? data.messages.map(it => new TicketMessage(it)) : data.messages
    }
}

@staticMappable<TicketMessageI, TicketMessage>()
export class TicketMessage implements Patch<TicketMessageI, PC.TicketMessage> {
    id: TicketMessageID
    userId: Nullable<UserID>
    ticketId: TicketID
    attachments: string[]
    message: string

    constructor(data: TicketMessageI) {
        this.id = data.id
        this.userId = data.user_id
        this.ticketId = data.ticket_id
        this.attachments = data.attachments
        this.message = data.message
    }
}
