const shortcuts: { [key: string]: number } = {
    "k": 1000,
    "m": 1000000,
}

function bestShortcut(amount: number): string | undefined {
    return Object.entries(shortcuts).find(([_, value]) => {
        return amount / value < 1000
    })?.["0"]
}

export function moneyPresentable(amount: number, letter: keyof typeof shortcuts | null = null): string {
    const _letter = letter ? letter : bestShortcut(amount)
    if (_letter == undefined) return rubles(amount)
    const _amount = shortcuts[_letter]
    const raw = Math.floor(amount / _amount)

    if (raw == 0) return rubles(amount)

    // return `${amount} ₽`
    return `${raw}${_letter}+`
}

export function rublesPresentable(amount: number, split: boolean = true,): string {
    const fixed = fixedTail(amount)
    return rubles(split ? splitNumber(fixed) : fixed)
}

export function percentsPresentable(amount: number): string {
    const fixed = fixedTail(amount)*100
    return percents(fixed)
}

export function splitNumber(amount: number | string): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export function fixedTail(amount: number): number {
    return Number(amount.toFixed(2))
}

export function rubles(num: number | string) {
    return num + " руб."
}

export function rub(amount: number | string): string {
    return `${amount} ₽`
}

export function percents(amount: number | string): string {
    return `${amount} %`
}
