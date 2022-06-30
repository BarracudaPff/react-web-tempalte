import React, {FC} from "react";
import {Card, Col, Row, Typography} from "antd"
import "./style.scss"
import {UserID} from "src/models/types/primitive"
import {User} from "src/models/application"
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Avatar from "src/components/avatar"
import {useNavigate} from "react-router-dom"

interface Props {
    user: User
    style?: React.CSSProperties
    onClick?: (rest: User) => void
    onDelete?: (id: UserID) => void
}

const UserCard: FC<Props> = (props) => {
    const { user } = props
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
                !!user && <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 180,
                    borderRadius: 24,
                    backgroundColor: "#F4F9FD"
                }}>
                    <Avatar size={58} src={user.waiterInfo?.avatar}/>
                    <Typography.Title level={5}>{user.fullName()}</Typography.Title>
                    {user.waiterInfo && <Typography.Text>{user.waiterInfo.waiterCode}</Typography.Text>}
                </div>
            }
            onClick={() => props.onClick ? props.onClick(user) : user.waiterInfo && nav(user.waiterInfo.waiterCode)}>
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
