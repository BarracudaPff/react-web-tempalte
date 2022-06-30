import randomWords from "random-words";
import {ru_adjectives, ru_nouns, ru_verbs, ru_names, ru_surnames} from "src/utils/language/russian"

const chars = "abcdefghijklmnopqrstuvwxyz1234567890";

const randFromArr = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

export const randomNoun = () => randFromArr(ru_nouns)
export const randomAdjective = () => randFromArr(ru_adjectives)
export const randomVerb = () => randFromArr(ru_verbs)
export const randomName = () => randFromArr(ru_names)
export const randomSurname = () => randFromArr(ru_surnames)
export const randomEmail = () => randomWords(2).join("@") + ".com"
export const randomPhone = () => "+7911" + Math.floor(1000000 + Math.random() * 9000000);
export const randomPassword = () => randomWords(2).join("$") + Math.floor(Math.random() * 10000)

export function removePrefix(line: string, prefix: string) {
    const has = line.indexOf(prefix) === 0
    return has ? line.substr(prefix.length) : line.toString()
}

export function removeSuffix(line: string, suffix: string) {
    const d = line.length - suffix.length
    const has = line.lastIndexOf(suffix) === d
    return has ? line.substr(0, d) : line.toString()
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
