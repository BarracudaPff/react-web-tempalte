interface Endpoint {
    id: string
    title: string
}

export const Endpoints: Record<string, Endpoint> = {
    main: {
        id: "/",
        title: "Главная страница",
    },
}
