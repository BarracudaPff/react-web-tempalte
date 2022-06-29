import {BoolExt} from "src/models/types/primitive"

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const monthsTemp = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря",]
const monthNamesShorten = ["янв", "фев", "мар", "апр", "мая", "июня", "июля", "авг", "сен", "окт", "ноя", "дек"];
const daysOfWeekShort = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export function toTimeDateYear(date: number | Date) {
    const _date = ensureDate(date)
    return `${twoDigits(_date.getHours())}:${twoDigits(_date.getMinutes())}, ${_date.getDate()} ${monthNamesShorten[_date.getMonth()]} ${_date.getFullYear()}`
}

export function toTime(date: number | Date) {
    const _date = ensureDate(date)
    return `${twoDigits(_date.getHours())}:${twoDigits(_date.getMinutes())}`
}

export function toPresentableShortDate(date: number | Date, showMonth: boolean = true, showYear: boolean = true, showDayOfWeek: boolean = true) {
    const _date = ensureDate(date)

    const day = _date.getDate()
    const dayOfWeek = showDayOfWeek ? ", " + daysOfWeekShort[_date.getDay()] : ""
    const month = showMonth ? " " + monthsTemp[_date.getMonth()] : ""
    const year = showYear ? " " + _date.getFullYear() : ""

    return day + month + year + dayOfWeek
}

export function toUpdatedDate() {
    return new Date().toISOString()
}

export function toCardExpireDate(date: number | Date) {
    const _date = ensureDate(date)

    const month = _date.getMonth() + 1
    const year = _date.getFullYear() % 100

    return month.toString().padStart(2, "0") + "/" + year
}

export function ensureDate(date: number | string | Date | BoolExt): Date {
    switch (typeof date) {
        case "number":
            return new Date(date)
        case "string":
            return new Date(date)
        case "object":
            return date
        default:
            throw new Error("Unsupported date type");
    }
}

export function dateWithOffset(init: Date, days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0, months: number = 0, years: number = 0): Date {
    const date = new Date(init)
    date.setDate(date.getDate() + days)
    date.setHours(date.getHours() + hours)
    date.setMinutes(date.getMinutes() + minutes)
    date.setSeconds(date.getSeconds() + seconds)
    date.setFullYear(date.getFullYear() + years)
    date.setMonth(date.getMonth() + months)

    return date
}

export function borderTimeOfDay(date: Date, first: boolean): Date {
    const borderDay = new Date(date);
    if (first) {
        borderDay.setHours(0, 0, 0, 0);
    } else {
        borderDay.setHours(23, 59, 59, 999);
    }
    return borderDay
}

export function borderDayOfWeek(date: Date, first: boolean): Date {
    const dayOfTheWeek = date.getDay()
    const borderDay = new Date(date);
    //TODO: check if it's correct - added +1 here for monday
    borderDay.setDate(date.getDate() - dayOfTheWeek + 1 + (first ? 0 : 7 - 1))


    if (first) {
        borderDay.setHours(0, 0, 0, 0);
    } else {
        borderDay.setHours(23, 59, 59, 999);
    }
    return borderDay
}

export function borderDayOfMonth(date: Date, first: boolean): Date {
    const borderDay = new Date(date);

    if (first) {
        borderDay.setDate(1)
        borderDay.setHours(0, 0, 0, 0);
    } else {
        const month = date.getMonth() + 1
        borderDay.setDate(new Date(date.getFullYear() + month > 11 ? 1 : 0, month % 11, 0).getDate())
        borderDay.setHours(23, 59, 59, 999);
    }
    return borderDay
}

export function borderDayOfYear(date: Date, first: boolean): Date {
    if (first) {
        return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0)
    } else {
        return new Date(date.getFullYear(), 11, 31, 0, 0, 0, 0)
    }
}

export function shiftDay(date: Date, multiplier: number): Date {
    return new Date(date.getTime() + multiplier * 24 * 60 * 60 * 1000)
}

export function shiftWeek(date: Date, multiplier: number): Date {
    return new Date(date.getTime() + multiplier * 7 * 24 * 60 * 60 * 1000)
}

export function shiftMonth(date: Date, multiplier: number): Date {
    const shifted = new Date(date)
    const month = date.getMonth() + multiplier
    if (month > 11 || month < 0) {
        shifted.setFullYear(date.getFullYear() + Math.ceil(multiplier / 12))
        shifted.setMonth(month % 12)
    } else {
        shifted.setMonth(month)
    }
    return shifted
}

export function shiftYear(date: Date, multiplier: number) {
    const shifted = new Date(date)
    shifted.setFullYear(date.getFullYear() + multiplier)
    return shifted
}

export function rotate<T>(arr: T[], n: number) {
    n = n % arr.length;
    return arr.slice(n, arr.length).concat(arr.slice(0, n));
}

function twoDigits(num: number) {
    return (num < 10 ? '0' : '') + num
}
