export enum ResponseStatus {
    OK = "OK", ERROR = "ERROR"
}

export enum AuthTokenType {
    BEARER = "Bearer"
}

export enum PayoutStatus {
    Success = 1,
    Failed = 2,
    Pending = 3,
}

export enum StaffStatus {
    NONE, SUPPORT, ADMIN,
}

export enum UserRank {
    NONE, WAITER, MANAGER, OWNER
}

export enum VerifyStatus {
    NONE, PENDING, VERIFIED
}

export enum TicketStatus {
    CREATED, PENDING, CLOSED
}
