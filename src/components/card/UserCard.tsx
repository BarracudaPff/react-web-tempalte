import React, {FC} from "react";
import {Card} from "antd"
import "./style.scss"
import {UserID} from "src/models/types/primitive"
import {User} from "src/models/application"

interface Props {
    user: User
    style?: React.CSSProperties
    onClick?: (rest: User) => void
    onDelete?: (id: UserID) => void
}

const UserCard: FC<Props> = (props) => {
    const { user } = props

    const confirm = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!e) return

        e.preventDefault();
        e.stopPropagation();

        // return RestService.delete(user.id)
        //     .then(_ => props.onDelete && props.onDelete(user.id))
        //     .then(() => notification.success({ message: "Ресторан успешно удален" }))
        //     .catch((e) => {
        //         notification.error({ message: "Не удалось удалить ресторан" })
        //         console.log(e)
        //     })
    }

    // console.log("rest", props.rest)

    return (
        <Card
            hoverable
            style={props.style}
            className={"rest-card"}
            onClick={() => props.onClick && props.onClick(user)}>

        </Card>
    );
};

export default UserCard;
