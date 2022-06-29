export function staticImplements<T>() {
    return <U extends T>(constructor: U) => constructor
}

export function staticMappable<Domain, Application>() {
    return staticImplements<Mappable<Domain, Application>>()
}

export interface Mappable<Domain, Application> {
    new(data: Domain, ...map: Mappable<any, any>[]): Application
}

// export interface MappableEx<Domain, Application> extends Mappable<Domain, Application>{
export interface Mappable2<Domain, Application> {
    new(data: Domain, map: Mappable<any, any>): Application
}

/**
 * Patch property names for type T.
 *
 * **T** - is base class to be patched. Config must be obj of string consisting of {<new_name>: <old_name>}
 */
export type Patch<T, Config extends { [key: string]: keyof T } = {}> =
    Pick<T, Exclude<keyof T, Config[keyof Config]>>
    & { [Key in keyof Config]: T[Config[Key]] }
/**
 * Same as {@link Patch}, but also able to hard override prop's type (for ex, in case of nesting)
 *
 * **T** - is base class to be patched. Config must be obj of string consisting of {<new_name>: <old_name>}
 * **Hard** - is obj with keys as patched properties and values as new types, based on patched types {<new_name>: <new_type>}
 */
export type PatchHard<T,
    Config extends { [key: string]: keyof T },
    Hard extends { [Key in keyof Patch<T, Config>]?: any }> = //Partial<Patch<T, Config>[Key]> }> =
    Omit<Patch<T, Config>, keyof Hard> & Hard


export type ToDomain<T extends object> = { toDomain: () => T }

// function map<Domain, Application>(obj: Mappable<Domain, Application>, data: Domain, ...other: Mappable<Domain, Application>): Application {
//     return new obj(data, other)
// }
