import Config from "../config"

const API_ROOT: string = Config.http.apiURL

export function url(url: string): string {
    return `${API_ROOT}${url}`
}

export const API = {
    // requests
    // ListReviews: url("/goods/reviews/list"),

    // Отправка-заявки-на-подключение
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B0-%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D0%B8-%D0%BD%D0%B0-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5
    SendApplication: url("/send_application"),
    // Получение-аватара
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%B0
    Avatars: (avatar: string) => url(`/avatars/${avatar}`),
    // Проверка-обновлений
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0-%D0%BE%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9
    Updates: url("/updates"),

    ////
    // Authentication
    ////
    // Авторизация
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%90%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F
    Login: url("/login"),
    // Деавторизация
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%94%D0%B5%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F
    Logout: url("/logout"),
    // Вывод-списка-ресторанов
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%92%D1%8B%D0%B2%D0%BE%D0%B4-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%BE%D0%B2
    TEMP: url("/restaurants/list"),

    ////
    // Restaurants
    ////
    // Создание-ресторана
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B0
    RestaurantNew: url("/restaurants/new"),
    // Обновление-базовой-информации-о-ресторане
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B1%D0%B0%D0%B7%D0%BE%D0%B2%D0%BE%D0%B9-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8-%D0%BE-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B5
    RestaurantUpdateBaseInfo: url("/restaurants/update/base_info"),
    // Обновление-адреса-ресторана
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B0%D0%B4%D1%80%D0%B5%D1%81%D0%B0-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B0
    RestaurantUpdateAddress: url("/restaurants/update/address"),
    // Обновление-юридических-данных-ресторана
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%8E%D1%80%D0%B8%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B0
    RestaurantUpdateLegalInfo: url("/restaurants/update/legal_info"),
    // Обновление-банковских-данных-ресторана
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B1%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D1%85-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B0
    RestaurantUpdateFinanceInfo: url("/restaurants/update/finance_info"),
    // Обновление-дизайна-для-страницы-чаевых
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D0%B0-%D0%B4%D0%BB%D1%8F-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D1%8B-%D1%87%D0%B0%D0%B5%D0%B2%D1%8B%D1%85
    RestaurantUpdateTipsDesign: url("/restaurants/update/tips_design"),
    // Обновление-платежных-настроек-ресторана
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%B6%D0%BD%D1%8B%D1%85-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BA-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B0
    RestaurantUpdatePaymentSettings: url("/restaurants/update/payment_settings"),
    // Привязка-карты-к-ресторану
    // // https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0-%D0%BA%D0%B0%D1%80%D1%82%D1%8B-%D0%BA-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D1%83
    RestaurantLinkCard: url("/restaurants/link_card"),
    // Привязка-телефона-для-ресторана
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B0
    RestaurantLinkPhone: url("/restaurants/link_phone"),
    // Запрос-на-вывод-средств
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81-%D0%BD%D0%B0-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2
    RestaurantRequestPayout: url("/restaurants/request_payout"),
    // Удаление-ресторана
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A3%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B0
    RestaurantDelete: url("/restaurants/delete"),
    // Создание-менеджера
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%D0%B0
    RestaurantManagerNew: url("/restaurants/manager/new"),
    // Изменение-менеджера
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%D0%B0
    RestaurantManagerUpdate: url("/restaurants/manager/update"),
    // Удаление-менеджера
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A3%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%D0%B0
    RestaurantsManagerDelete: url("/restaurants/manager/delete"),

    ////
    // Waiters
    ////
    // Получение-ограниченной-информации-об-официанте
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8-%D0%BE%D0%B1-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%B5
    WaitersInfo: url("/waiters/info"),
    // Получение-ограниченной-информации-об-официантах-команды
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8-%D0%BE%D0%B1-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%B0%D1%85-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B
    WaitersTeamInfo: url("/waiters/team_info"),
    // Получение-информации-о-себе
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8-%D0%BE-%D1%81%D0%B5%D0%B1%D0%B5
    WaitersMe: url("/user/me"),
    // Обновление-информации-о-себе
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8-%D0%BE-%D1%81%D0%B5%D0%B1%D0%B5
    WaitersUpdateMe: url("/waiters/update_me"),
    // Список-официантов
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%BE%D0%B2
    WaitersList: url("/waiters/list"),
    // Создание-официанта
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%B0
    WaitersNew: url("/waiters/new"),
    // Изменение-официанта
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%B0
    WaitersUpdate: url("/waiters/update"),
    // Удаление-официанта
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A3%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%B0
    WaitersDelete: url("/waiters/delete"),
    // Привязка-карты-к-официанту
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0-%D0%BA%D0%B0%D1%80%D1%82%D1%8B-%D0%BA-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D1%83
    WaitersLinkCard: url("/waiters/link_card"),
    // Привязка-телефона-для-официанта
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0-%D0%B4%D0%BB%D1%8F-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%B0
    WaitersLinkPhone: url("/waiters/link_phone"),
    // Выгрузка-списка-официантов
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%92%D1%8B%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BD%D1%82%D0%BE%D0%B2
    WaitersDownloadList: url("/waiters/download_list"),
    // Запрос-на-вывод-средств
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81-%D0%BD%D0%B0-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2
    WaitersRequestPayout: url("/waiters/request_payout"),
    // Запрос-на-верификацию
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81-%D0%BD%D0%B0-%D0%B2%D0%B5%D1%80%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8E
    WaitersSendVerification: url("/waiters/send_verification"),
    // Изменение-основной-карты-на-вывод
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%BE%D0%B9-%D0%BA%D0%B0%D1%80%D1%82%D1%8B-%D0%BD%D0%B0-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4
    WaitersSetPayoutCard: url("/waiters/set_payout_card"),
    // Создание-новой-команды
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BD%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B
    WaitersTeamsNew: url("/waiters/teams/new"),
    // Обновление-команды
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B
    WaitersTeamsUpdate: url("/waiters/teams/update"),
    // Удаление-команды
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A3%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B
    WaitersTeamsDelete: url("/waiters/teams/delete"),
    // Список-непрочитанных-уведомлений
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%BD%D0%B5%D0%BF%D1%80%D0%BE%D1%87%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9
    WaitersNotificationsList: url("/waiters/notifications/list"),
    // Отметка-уведомления,-как-прочитанного
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D1%82%D0%BC%D0%B5%D1%82%D0%BA%D0%B0-%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%2C-%D0%BA%D0%B0%D0%BA-%D0%BF%D1%80%D0%BE%D1%87%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE
    WaiterNotificationsRead: url("/waiter/notifications/read"),
    // Получение-списка-токенов
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%BE%D0%B2
    WaitersSecurityAuthTokens: url("/waiters/security/auth_tokens"),
    // Инвалидация-токена
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%98%D0%BD%D0%B2%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%B0
    WaitersSecurityInvalidate: url("/waiters/security/invalidate"),

    ////
    // Payments
    ////
    // Подготовка-запроса
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B0
    PaymentPrepare: url("/payment/prepare"),
    // Получение-комиссии
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BC%D0%B8%D1%81%D1%81%D0%B8%D0%B8
    PaymentGetFee: url("/payment/get_fee"),

    ////
    // Telegram
    ////
    // Генерация-токена
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%B0
    TelegramNewToken: url("/telegram/new_token"),
    // Обновление-настроек-TG-бота
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BA-TG-%D0%B1%D0%BE%D1%82%D0%B0
    TelegramUpdateSettings: url("/telegram/update_settings"),
    // Список-обращений
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B9
    SupportTicketsList: url("/support/tickets/list"),

    ////
    // Support
    ////
    // Получить-сообщения-обращения
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F
    SupportTicketsGet: url("/support/tickets/get"),
    // Новое-обращение
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9D%D0%BE%D0%B2%D0%BE%D0%B5-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5
    SupportTicketsNew: url("/support/tickets/new"),
    // Отправка-ответа-на-обращение
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B0-%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D0%B0-%D0%BD%D0%B0-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5
    SupportTicketsAnswer: url("/support/tickets/answer"),
    // Закрытие-обращения
    // POST https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%97%D0%B0%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5-%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F
    SupportTicketsClose: url("/support/tickets/close"),
    // Получение-изображения-вложения
    // GET https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F
    SupportTicketsAttachmentAttachment: (attachment: string) => url(`/support/tickets/attachment/{attachment}`),


    // json placeholder
    ListUsers: url("/users"),
    GetUser: (id: string) => url(`/users/${id}`),
    AddUser: url("/users"),
} as const;
