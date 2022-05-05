import {PickerErrorCode} from "react-native-image-crop-picker";
import Toast from "react-native-toast-message";
import {ToastShowParams} from "react-native-toast-message/lib/src/types";

export function msgFromPickerCode(code: PickerErrorCode): string | undefined {
    switch (code) {
        case "E_PICKER_CANCELLED":
        case "E_NO_LIBRARY_PERMISSION":
        case "E_NO_CAMERA_PERMISSION":
            return undefined
        case "E_NO_IMAGE_DATA_FOUND":
        case "E_ERROR_WHILE_CLEANING_FILES":
        case "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR":
        case "E_CROPPER_IMAGE_NOT_FOUND":
        case "E_CANNOT_SAVE_IMAGE":
        case "E_CANNOT_PROCESS_VIDEO":
        case "E_ACTIVITY_DOES_NOT_EXIST":
        case "E_CALLBACK_ERROR":
        case "E_FAILED_TO_SHOW_PICKER":
        case "E_FAILED_TO_OPEN_CAMERA":
        case "E_CAMERA_IS_NOT_AVAILABLE":
        case "E_CANNOT_LAUNCH_CAMERA":
            console.error(new Error(code))
            return "Что-то пошло не так"
    }
}

export function showError(text1?: string, text2?: string) {
    showToast({
        type: 'error',
        text1,
        text2,
    })
}

export function showSuccess(text1?: string, text2?: string) {
    showToast({
        type: 'success',
        visibilityTime: 2000,
        text1,
        text2,
    })
}

function showToast(props: ToastShowParams) {
    Toast.show(props)
}
