export function runBlocking<T>(block: () => T): Promise<T> {
    return (async () => block())()
}

export function later<T>(delay: number): Promise<T> {
    return new Promise(resolve => setTimeout(resolve, delay))
}

export function sleep(delay?: number) {
    return new Promise(resolve => setTimeout(resolve, delay))
}

export function withTimeout<T>(
    timeout: number,
    callback: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Promise timed out after ${timeout} ms`))
        }, timeout)

        callback(
            (value) => {
                clearTimeout(timer)
                resolve(value)
            },
            (error) => {
                clearTimeout(timer)
                reject(error)
            }
        )
    })
}

export function toFormData(obj: { [key: string]: any }) {
    const formData = new FormData()
    for (const idx in obj) {
        if (obj[idx] || obj[idx] === 0) {
            formData.append(idx, obj[idx])
        }
    }
    return formData
}

export function convertModelToFormData(model: any, form?: FormData, namespace = ''): FormData {
    let formData = form || new FormData();
    if (model instanceof File || typeof model === "string") {
        formData.append(namespace, model)
        return formData
    }
    if (typeof model === "number") {
        formData.append(namespace, "" + model)
        return formData
    }
    if (typeof model === "boolean") {
        formData.append(namespace, model ? "1" : "0")
        return formData
    }

    for (let propertyName in model) {
        if (!model.hasOwnProperty(propertyName) || (!model[propertyName] && model[propertyName] != 0)) continue;
        let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
        if (model[propertyName] instanceof Date)
            formData.append(formKey, model[propertyName].toISOString());
        else if (model[propertyName] instanceof Array) {
            model[propertyName].forEach((element: any, index: any) => {
                const tempFormKey = `${formKey}[${index}]`;
                convertModelToFormData(element, formData, tempFormKey);
            });
        } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File))
            convertModelToFormData(model[propertyName], formData, formKey);
        else if (model[propertyName] instanceof File) {
            formData.append(formKey, (model[propertyName] as File));
        } else {
            formData.append(formKey, model[propertyName].toString());
        }
    }
    return formData;
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

