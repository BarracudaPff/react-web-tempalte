export function removePrefix(line: string, prefix: string) {
    const has = line.indexOf(prefix) === 0
    return has ? line.substr(prefix.length) : line.toString()
}

export function removeSuffix(line: string, suffix: string) {
    const d = line.length - suffix.length
    const has = line.lastIndexOf(suffix) === d
    return has ? line.substr(0, d) : line.toString()
}
