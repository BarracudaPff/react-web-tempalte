export type HttpMethod = "get" | "post"
export type HttpHeaders = Record<string, string>
export type UrlParams =
    // string[][] | Record<string, string> | Record<string, string | undefined> | string | URLSearchParams
    string[][] | Record<string, string> | string | URLSearchParams
    // Record<string, string>

export type BodyInit =
// | _SourceUri
    | Blob
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array
    | DataView
    | ArrayBuffer
    | FormData
    | string
    | null;

