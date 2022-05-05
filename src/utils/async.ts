export function runBlocking<T>(block: () => T): Promise<T> {
    return (async () => block())()
}

export function later<T>(delay: number): Promise<T> {
    return new Promise(resolve => setTimeout(resolve, delay))
}

// export function withTimeout<T>(
//     timeout: number,
//     callback: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
// ): Promise<T> {
//     return new Promise<T>((resolve, reject) => {
//         const timer = setTimeout(() => {
//             reject(new Error(`Promise timed out after ${timeout} ms`))
//         }, timeout)
//
//         callback(
//             (value) => {
//                 clearTimeout(timer)
//                 resolve(value)
//             },
//             (error) => {
//                 clearTimeout(timer)
//                 reject(error)
//             }
//         )
//     })
// }

export function toFormData(obj: { [key: string]: any }) {
    const formData = new FormData()
    for (const idx in obj) {
        if (obj[idx] || obj[idx] === 0) {
            formData.append(idx, obj[idx])
        }
    }
    return formData
}


// export function withMinimalExecTime<T>(
//     timeout: number,
//     callback: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
// ): Promise<T> {
//     return new Promise<T>((resolve, reject) => {
//         const timer = new Promise<T>((resolve) => setTimeout(() => resolve(), timeout))
//
//         callback(
//             (value) => {
//                 timer.then(() => {
//                     console.log("Timer!")
//                 })
//             },
//             (error) => timer.then(() => reject(error))
//         )
//     })
// }

