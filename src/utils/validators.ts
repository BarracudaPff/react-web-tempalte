import {Rule} from "rc-field-form/lib/interface"

export function TrueValueValidator(message: string): Rule {
    return {
        message,
        validator: (_, value) => value
            ? Promise.resolve()
            : Promise.reject(new Error(message))
    }
}

export function DefinedValueValidator(message: string): Rule {
    return {
        message,
        validator: (_, value) => value != undefined
            ? Promise.resolve()
            : Promise.reject(new Error(message)),
    }
}

export const IndexValidator: Rule = {
    message: "Введите корректный индекс",
    pattern: /^\d{6}$/g,
}
