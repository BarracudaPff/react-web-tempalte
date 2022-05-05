export type EnsureCorrectEnum<T extends { [K in Exclude<keyof T, number>]: K }> = true;

export type OmitTS<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type Nullable<T> = T | null | undefined

export type StringMap<V> = { [key: string]: V }

export type NumberMap<V> = { [key: number]: V }

export type Modify<T, R> = Omit<T, keyof R> & R;
