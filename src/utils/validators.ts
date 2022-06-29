import {Rule} from "rc-field-form/lib/interface"

const tf = (cond: boolean, msg: string) => cond ? Promise.resolve() : Promise.reject(new Error(msg))

export function TrueValueValidator(message: string): Rule {
    return {
        message,
        validator: async (_, value) => tf(value, message)
    }
}

export function RequiredValidator(field: string = "данные"): Rule {
    return {
        required: true, message: "Пожалуйста, введите " + field
    }
}

export function DefinedValueValidator(message: string): Rule {
    return {
        message,
        validator: async (_, value) => tf(value != undefined, message)
    }
}

export function PasswordValidator(level: number, minLevel: number): Rule {
    const message = "Введите корректный пароль"
    return {
        message,
        validator: async (_, value) => tf(level >= minLevel, message)
    }
}

export const IndexValidator: Rule = {
    message: "Введите корректный индекс",
    pattern: /^\d{6}$/g,
}

export const EmailValidator: Rule = {
    message: "Введите корректный email",
    pattern: /^[a-zA-Z\d_.+-]+@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/g,
}
