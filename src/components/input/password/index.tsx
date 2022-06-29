import {FC} from "react"
import {PasswordInput as PasswordInputAnt, PasswordInputProps} from "antd-password-input-strength"
import {PasswordProps} from "antd/lib/input/Password"

type Props = PasswordInputProps | PasswordProps

const PasswordInput: FC<Props> = (props) => <PasswordInputAnt {...props}/>

export default PasswordInput
