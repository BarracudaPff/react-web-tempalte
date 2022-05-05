const month = ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"]

// 21 Сент’ 2020
export function dateToLine(date: Date) {
    return `${date.getDate()} ${month[date.getMonth()]}\` ${date.getFullYear()}`
}
