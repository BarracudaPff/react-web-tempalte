export interface AuthTokenI {
    id: number, //ID обновления
    update_version: string, //Версия обновления
    platform: string,
    update_notes: string, //Некоторые заметки по обновлению,
    is_critical: boolean, //Критичность обновления (Важный фактор для мобилок)
}
