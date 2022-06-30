import {notification} from "antd"
import {ArgsProps} from "antd/lib/notification"

export default {
    success: notification.success,
    error: (args: ArgsProps, error?: any) => {
        notification.error(args)
        console.error(error)
    }
}
