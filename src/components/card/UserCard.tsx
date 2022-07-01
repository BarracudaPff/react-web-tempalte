import React, {FC} from "react";
import {Card, Col, Row, Typography} from "antd"
import "./style.scss"
import {UserID} from "src/models/types/primitive"
import {User} from "src/models/application"
import Avatar from "src/components/avatar"
import {useNavigate} from "react-router-dom"
import {WaiterInfo} from "src/models/application/waiter"

interface Props {
    user?: User // TODO: deprecated, remove
    waiterInfo?: WaiterInfo
    style?: React.CSSProperties
    onClick?: (rest: User) => void
    onDelete?: (id: UserID) => void
}

const UserCard: FC<Props> = (props) => {
    const waiterInfo = props.user?.waiterInfo ?? props.waiterInfo
    const nav = useNavigate()

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

    return (
        <Card
            hoverable
            style={props.style}
            className={"user-card"}
            cover={
                !!waiterInfo && <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 180,
                    borderRadius: 24,
                    backgroundColor: "#F4F9FD"
                }}>
                    <Avatar size={58} src={waiterInfo?.avatar}/>
                    <Typography.Title level={5}>{waiterInfo.fullName()}</Typography.Title>
                    {waiterInfo && <Typography.Text>{waiterInfo.waiterCode}</Typography.Text>}
                </div>
            }
            onClick={() => props.onClick
                ? props.onClick(props.user!!)
                : waiterInfo && nav("/admin/employees/" + waiterInfo.waiterCode, { replace: true })
            }>
            <Row>
                <Col span={8}>
                    <Typography.Paragraph strong className={"user-cell-data"}>0</Typography.Paragraph>
                    <Typography.Paragraph className={"user-cell-text"}>Чаевые</Typography.Paragraph>
                </Col>
                <Col span={8}>
                    <Typography.Paragraph strong className={"user-cell-data"}>0</Typography.Paragraph>
                    <Typography.Paragraph className={"user-cell-text"}>Рейтинг</Typography.Paragraph>
                </Col>
                <Col span={8}>
                    <Typography.Paragraph strong className={"user-cell-data"}>0</Typography.Paragraph>
                    <Typography.Paragraph className={"user-cell-text"}>Баланс</Typography.Paragraph>
                </Col>
            </Row>
        </Card>
    );
};

export default UserCard;
