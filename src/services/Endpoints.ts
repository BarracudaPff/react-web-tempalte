import Config from "../config"

const API_ROOT: string = Config.http.apiURL

export function url(url: string): string {
    return `${API_ROOT}${url}`
}

export const API = {
    // requests
    // ListReviews: url("/goods/reviews/list"),

    // json placeholder
    ListUsers: url("/users"),
    GetUser: (id: string) => url(`/users/${id}`),
    AddUser: url("/users"),
} as const;
