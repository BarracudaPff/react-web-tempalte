export namespace PatchConfHard {

}

export namespace PatchConf {
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
}
