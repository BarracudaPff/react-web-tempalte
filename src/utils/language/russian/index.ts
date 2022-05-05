export function transactions(value: number): string {
    const lastTwoNumerals = value % 100
    const lastNumeral = value % 10

    if (lastTwoNumerals >= 5 && lastTwoNumerals <= 20) {
        return "транзакций"
    }

    if (lastNumeral == 1) {
        return "транзакция"
    }

    return "транзакции"
}
