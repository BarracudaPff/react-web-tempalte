// export function pickFile<T extends boolean>(isMultiple: T, contentType: string): T extends true ? Promise<File[]> : Promise<File>
// export function pickFile(isMultiple: boolean, contentType: string): Promise<File[]> | Promise<File> {
//     if (isMultiple) {
//         return new Promise<File[]>((resolve, reject) => {
//             let input = document.createElement('input');
//             input.type = 'file';
//             input.multiple = isMultiple;
//             input.accept = contentType;
//
//             input.onchange = _ => {
//                 if (input.files) {
//                     resolve(Array.from(input.files).map(it => it as unknown as File));
//                 } else {
//                     reject("No files was provided")
//                 }
//             };
//
//             input.click();
//         });
//     } else {
//         return new Promise<File>((resolve, reject) => {
//             let input = document.createElement('input');
//             input.type = 'file';
//             input.multiple = isMultiple;
//             input.accept = contentType;
//
//             input.onchange = _ => {
//                 if (input.files == null) return reject("No files was provided")
//                 if (input.files.item(0) == null) return reject("No files was provided")
//
//                 resolve(input.files.item(0)!! as unknown as File);
//             };
//
//             input.click();
//         });
//     }
// }
//
// export function avatarPT(path?: string) {
//     return path ? 'https://api.premiertips.org/api/avatars/' + path : '/assets/icons/avatar.png'
// }
//
// export function toFormData(obj: any) {
//     const formData = new FormData()
//     for (const idx in obj) {
//         formData.append(idx, obj[idx]);
//     }
//     return formData
// }
