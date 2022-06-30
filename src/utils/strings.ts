import randomWords from "random-words";
import {ru_adjectives, ru_nouns, ru_verbs} from "src/utils/language/russian"

const chars = "abcdefghijklmnopqrstuvwxyz1234567890";

export const randomNoun = () => ru_nouns[Math.floor(Math.random() * ru_nouns.length)]
export const randomAdjective = () => ru_adjectives[Math.floor(Math.random() * ru_adjectives.length)]
export const randomVerb = () => ru_verbs[Math.floor(Math.random() * ru_verbs.length)]
export const randomEmail = () => randomWords(2).join("@") + ".com"
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
