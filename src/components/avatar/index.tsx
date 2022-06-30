import React, {FC} from "react"
import {Avatar as AvatarAnt, AvatarProps} from "antd"
import {img} from "src/services/Endpoints"

interface Props extends AvatarProps {
    src?: string
    // placeholderSrc: string
}

const Avatar: FC<Props> = (props) => {
    const src = img(props.src)
    return <AvatarAnt {...props} src={src}/>
}

export default Avatar
