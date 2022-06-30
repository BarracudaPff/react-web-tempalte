import React, {FC} from "react";
import "./style.scss"
import Avatar from "src/components/avatar"
import {User} from "src/models/application"
import {DeleteOutlined, EditOutlined, QrcodeOutlined} from "@ant-design/icons"
import {Button, Divider, Input, Rate, Space, Typography} from "antd"
import {PayoutStatus} from "src/models/types/base"
import {rublesPresentable} from "src/utils"
import Popconfirm from "antd/es/popconfirm";
import {useNavigate} from "react-router-dom"
import {UserService} from "src/services/UserService"
import {useDispatch} from "src/redu/store"
import {deleteUser} from "src/redu/actions/waiters"
import notification from "src/utils/notification"
import Config from "src/config"

interface Props {
    user: User
}

const InfoSider: FC<Props> = ({ user }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const renderWithLabel = (label: string, children: React.ReactNode) => (
        <div>
            <div className="ant-form-item-label">
                <label>{label}</label>
            </div>
            {children}
        </div>
    )

    const payoutSum = user.payouts?.filter(payout => payout.payoutStatus == PayoutStatus.Success)
        .reduce((p, n) => p + n.amount, 0) ?? 0

    const removeUser = () => {
        UserService.delete(user.id).then(() => {
            dispatch(deleteUser(user.id))
            nav("/admin/employees")
            notification.success({ message: "Пользователь удален" })
        }).catch(e => notification.error({ message: "Не получилось удалить пользователя" }, e))
    }

    return (
        <div className={"info-sider"}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <Avatar size={72} src={user.waiterInfo?.avatar} style={{ marginBottom: 16 }}/>
                    <Typography.Title level={4}>{user.fullName()}</Typography.Title>
                    <Typography.Paragraph>{user.waiterInfo?.waiterCode}</Typography.Paragraph>
                </div>
                <Space direction={"vertical"}>
                    <a href={`https://chart.googleapis.com/chart?chs=450&chld=M|0&cht=qr&chl=${Config.domainURL}tip/${user.waiterInfo?.waiterCode}`}>
                        <Button type={"primary"} icon={<QrcodeOutlined/>}/>
                    </a>
                    <Button type={"dashed"} icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={removeUser}
                        okText="Yes"
                        cancelText="No">
                        <Button danger icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            </div>
            <Divider/>
            <Typography.Title level={5}>Общая информация</Typography.Title>
            {renderWithLabel("Рейтинг", <Rate value={user.waiterInfo?.rating} disabled allowHalf/>)}
            {renderWithLabel("Баланс", <Input value={rublesPresentable(user.waiterInfo?.balance ?? 0)} disabled/>)}
            {renderWithLabel("Сумма выплат", <Input value={rublesPresentable(payoutSum)} disabled/>)}
            {renderWithLabel("Цель чаевых", <Input value={user.waiterInfo?.goal ?? "Цели нет :("} disabled/>)}
            <Typography.Title level={5} style={{ marginTop: 24 }}>Контакты</Typography.Title>
            {renderWithLabel("Email", <Input value={user.email ?? "Не добавлен"} disabled/>)}
            {renderWithLabel("Телефон", <Input value={user.waiterInfo?.phoneLinked ? "Привязан" : "Не привязан"} disabled/>)}
            {renderWithLabel("Карта", <Input value={user.waiterInfo?.cardId ? "Привязана" : "Не привязаны"} disabled/>)}
        </div>
    );
};

export default InfoSider;
