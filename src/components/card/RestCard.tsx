import React, {FC} from "react";
import {Avatar as AvatarAnt, Button, Card, Col, Divider, notification, Popconfirm, Row, Space, Tooltip, Typography} from "antd"
import {Restaurant} from "src/models/application/restaurants"
import {GeneralCalendar} from "src/components/icons"
import {percents, rublesPresentable, toPresentableShortDate} from "src/utils"
import {DeleteOutlined, DownloadOutlined, PlusOutlined} from "@ant-design/icons"
import "./style.scss"
import {RestService} from "src/services/RestService"
import {RestaurantID} from "src/models/types/primitive"
import Avatar from "src/components/avatar"

interface Props {
    rest: Restaurant
    style?: React.CSSProperties
    onClick?: (rest: Restaurant) => void
    onDelete?: (id: RestaurantID) => void
}

const RestCard: FC<Props> = (props) => {
    const { rest } = props

    const confirm = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!e) return

        e.preventDefault();
        e.stopPropagation();

        return RestService.delete(rest.id)
            .then(_ => props.onDelete && props.onDelete(rest.id))
            .then(() => notification.success({ message: "Ресторан успешно удален" }))
            .catch((e) => {
                notification.error({ message: "Не удалось удалить ресторан" })
                console.log(e)
            })
    }

    // console.log("rest", props.rest)

    return (
        <Card style={props.style} hoverable className={"rest-card"} onClick={() => props.onClick && props.onClick(rest)}>
            <Row className={""}>
                <Col flex={1} className={"r-data-cell"}>
                    <Row wrap={false}>
                        <Col>
                            <Avatar size={48} shape={"square"}/>
                        </Col>
                        <Col flex={"auto"}
                             style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginLeft: 18 }}>
                            <Typography.Text style={{ display: "block" }}>{rest.owner?.email}</Typography.Text>
                            <Typography.Title level={5} style={{ margin: 0 }}>{rest.fullName}</Typography.Title>
                        </Col>
                    </Row>
                    <Row justify={"space-between"}>
                        <Col style={{ display: "flex", alignItems: "center", marginTop: 22 }}>
                            {rest.createdAt && <>
                                <GeneralCalendar/>
                                <Typography.Text style={{ marginLeft: 6 }}>
                                    {"Создано " + toPresentableShortDate(rest.createdAt, true, true, false)}
                                </Typography.Text>
                            </>}
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </Col>
                <Divider type={"vertical"} style={{ height: "unset" }}/>
                <Col flex={1} className={"r-data-cell"}
                     style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Row align={"middle"} justify={"space-between"}>
                        <Col>
                            <Typography.Title level={5}>
                                Данные ресторана
                            </Typography.Title>
                        </Col>
                        <Col>
                            <Space>
                                <Tooltip title="Добавить сотрудник">
                                    <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                                </Tooltip>
                                <Tooltip title="Скачать статистику">
                                    <Button type="dashed" shape="circle" icon={<DownloadOutlined/>}/>
                                </Tooltip>
                                <Popconfirm
                                    title="Удалить ресторан?"
                                    onConfirm={confirm}>
                                    <Button type="primary" shape="circle" danger icon={<DeleteOutlined/>} onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}/>
                                </Popconfirm>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Typography.Text style={{ display: "block" }}>Баланс</Typography.Text>
                            <Typography.Text>{rublesPresentable(rest?.financeInfo?.balance ?? 0)}</Typography.Text>
                        </Col>
                        <Col span={8}>
                            <Typography.Text style={{ display: "block" }}>Комиссия</Typography.Text>
                            <Typography.Text>{percents(rest.feeAmount)}</Typography.Text>
                        </Col>
                        <Col span={8}>
                            <Typography.Text style={{ display: "block" }}>Сотрудники</Typography.Text>
                            <AvatarAnt.Group
                                maxCount={2}
                                maxPopoverTrigger="click"
                                size={24}
                                maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf", cursor: "pointer" }}>
                                {rest.baseWaiters?.map(it =>
                                    <Avatar src={it.avatar}/>
                                )}
                            </AvatarAnt.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default RestCard;
