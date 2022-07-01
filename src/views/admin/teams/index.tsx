import React, {FC, useEffect, useState} from "react";
import SubAdminHeader from "src/components/header/sub-admin"
import {Button, Card, Checkbox, Form, Input, InputNumber, List, Modal, Row, Select, Space, Spin} from "antd"
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import RestCard from "src/components/card/RestCard"
import {RestService} from "src/services/RestService"
import {addAllRest, deleteRest, modifyBasicRest, updRest} from "src/redu/actions/rest"
import notification from "src/utils/notification"
import Config from "src/config"
import {capitalize, percents, randomAdjective} from "src/utils"
import {Team} from "src/models/application/team"
import {useDispatch, useSelector} from "src/redu/store"
import {UserService} from "src/services/UserService"
import {addAllUsers} from "src/redu/actions/waiters"
import {RestField} from "src/services/api/ApiService"
import {useSearchParam} from "src/utils/hooks"
import {NumberParam} from "serialize-query-params"
import {TeamService} from "src/services/TeamService"
import Col from "antd/es/grid/col";
import {TeamID, UserID} from "src/models/types/primitive"
import UserCard from "src/components/card/UserCard"
import Popconfirm from "antd/es/popconfirm"

interface Props {
}

interface CreationData {
    name?: string
    showLastName?: boolean
    useTeamCode?: boolean
    groupTips?: boolean
    showWaiterList?: boolean

    leadId?: UserID
    //TODO: remove showList or showWaiterList from api
    showList?: boolean
    showWaiter?: boolean
}

const AdminTeamsView: FC<Props> = (props) => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [loadingTeams, setLoadingTeams] = useState(false);

    const [teams, setTeams] = useState<Team[]>();
    const [editTeam, setEditTeam] = useState<Team>();

    const [createForm] = Form.useForm<CreationData>()
    const [editForm] = Form.useForm<CreationData>()
    const me = useSelector(it => it.user.user)
    const rests = useSelector(it => it.rest.data)
    const dispatch = useDispatch()

    const [rest, setRest] = useSearchParam("rest", NumberParam);

    const toggleCreateModal = () => setShowCreateModal(it => !it)
    const toggleEditModal = () => setShowEditModal(it => !it)

    useEffect(() => {
        if (!rest) return

        setLoadingTeams(true)
        TeamService.list(rest)
            .then(setTeams)
            .catch(e => notification.error({ message: "Не получилось получить список команд" }, e))
            .then(() => setLoadingTeams(false))
    }, [rest])

    useEffect(() => {
        if (rests.length) return

        RestService.listWithFieldsRest(undefined, [RestField.TEAMS])
            .then(rests => dispatch(addAllRest(rests)))
            .catch(e => notification.error({ message: "Не получилось получить список ресторанов" }, e))
    }, [])

    const createTeam = () => {
        const data = createForm.getFieldsValue()

        if (!rest) {
            notification.error({ message: "Выберите ресторан" })
            return
        }

        console.log({ data })

        TeamService.add(rest, {
            groupTips: data.groupTips!!,
            showLastName: data.showLastName!!,
            showList: data.showList ?? data.showWaiterList!!,
            name: data.name!!,
            useTeamCode: data.useTeamCode!!,
        }).then(team => {
            toggleCreateModal()
            setTeams(it => it ? [...it, team] : undefined)
            notification.success({ message: "Команда добавлена!" })
        }).catch(e => notification.error({ message: "Не получилось изменить ресторан" }, e))
    }

    const editCurTeam = () => {
        const data = editForm.getFieldsValue()

        if (!editTeam) {
            notification.error({ message: "Выберите команду" })
            return
        }

        TeamService.update(editTeam.id, {
            leadId: data.leadId!!,
            showWaiter: data.showWaiter!!,
            groupTips: data.groupTips!!,
            showLastName: data.showLastName!!,
            showList: data.showList ?? data.showWaiterList!!,
            name: data.name!!,
            useTeamCode: data.useTeamCode!!
        }).then(team => {
            setTeams(it => it?.map(it => {
                if (it.id == editTeam.id) {
                    it = team
                }

                return it
            }))
            setShowEditModal(false)
            notification.success({ message: "Команда добавлена!" })
        }).catch(e => notification.error({ message: "Не получилось изменить команду" }, e))
    }

    const deleteTeam = (id: TeamID) => () => {
        TeamService.delete(id).then(() => {
            setTeams(it => it?.filter(it => it.id != id))
            notification.success({ message: "Команда удалена!" })
        }).catch(e => notification.error({ message: "Не получилось удалить команду" }, e))
    }

    return (
        <>
            <SubAdminHeader title={"Команды"}>
                {rests && <Select placeholder="Выберете ресторан" onChange={key => setRest(key)} value={rest}>
                    {rests.map(({ rest }) => <Select.Option key={rest.id} value={rest.id}>{rest.fullName}</Select.Option>)}
                </Select>}
                <Button type="primary" icon={<PlusOutlined/>} shape={"round"} size={"large"} onClick={toggleCreateModal}>
                    Добавить команду
                </Button>
            </SubAdminHeader>
            <List
                dataSource={teams}
                split={false}
                loading={loadingTeams}
                renderItem={(it) => (
                    <List.Item style={{ flexDirection: "column" }}>
                        {/*TODO: add edit team func*/}
                        <Card style={{ flex: 1, width: "100%", marginBottom: 8 }}>
                            <Row justify={"space-between"} align={"middle"}>
                                <Col>
                                    {it.teamName}
                                </Col>
                                <Col>
                                    <Space size={"middle"}>
                                        <Button type={"primary"} icon={<EditOutlined/>} onClick={() => {
                                            console.log({ it })
                                            setEditTeam(it)
                                            editForm.setFieldsValue({
                                                name: it.teamName,
                                                showLastName: it.showLastName,
                                                useTeamCode: it.useTeamCode,
                                                groupTips: it.groupTips,
                                                showWaiterList: it.showList,
                                                showList: it.showList,
                                                leadId: it.leadId!!,
                                                showWaiter: it.showWaiter,
                                            })
                                            toggleEditModal()
                                        }}/>
                                        <Popconfirm
                                            title="Удалить команду?"
                                            onConfirm={deleteTeam(it.id)}
                                            okText="Да"
                                            cancelText="Нет">
                                            <Button danger icon={<DeleteOutlined/>}/>
                                        </Popconfirm>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                        {it.waiters && <List
                            grid={{
                                gutter: 24,
                                column: 3
                            }}
                            dataSource={it.waiters}
                            split={false}
                            className={"no-render-empty"}
                            renderItem={waiterInfo => (
                                <List.Item>
                                    <UserCard
                                        waiterInfo={waiterInfo}
                                        onDelete={(id) => dispatch(deleteRest(id))}/>
                                </List.Item>
                            )}
                        />}
                    </List.Item>
                )}
            />
            <Modal
                okText={"Создать"}
                onOk={() => createForm.submit()}
                onCancel={toggleCreateModal}
                visible={showCreateModal}>
                <Form layout={"vertical"} form={createForm} onFinish={createTeam} initialValues={Config.mockForms ? {
                    name: capitalize(randomAdjective()) + " команд(а)",
                    showLastName: Math.random() > 0.5,
                    useTeamCode: Math.random() > 0.5,
                    groupTips: Math.random() > 0.5,
                    showWaiterList: Math.random() > 0.5,
                } : undefined}>
                    <Form.Item name={"name"} label={"Название команды"}>
                        <Input placeholder={capitalize(randomAdjective()) + " команд(а)"}/>
                    </Form.Item>
                    <Form.Item name={"showLastName"} valuePropName={"checked"} label={"Показывать фамилию официантов"}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item name={"useTeamCode"} valuePropName={"checked"} label={"Использовать код команды для списка"}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item name={"groupTips"} valuePropName={"checked"} label={"Включить групповые чаевые"}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item name={"showWaiterList"} valuePropName={"checked"} label={"Отображать список официантов"}>
                        <Checkbox/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                okText={"Изменить"}
                onOk={() => editForm.submit()}
                onCancel={toggleEditModal}
                visible={showEditModal}>
                <Form layout={"vertical"} form={editForm} onFinish={editCurTeam}>
                    <Form.Item name={"name"} label={"Название команды"}>
                        <Input placeholder={capitalize(randomAdjective()) + " команд(а)"}/>
                    </Form.Item>
                    <Form.Item name="leadId" label="Главный официант">
                        <Select placeholder="Официант" allowClear>
                            {editTeam?.waiters?.map((waiter) => {
                                return <Select.Option key={waiter.userId} value={waiter.userId}>{waiter.fullName()}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name={"showLastName"} valuePropName={"checked"} label={"Показывать фамилию официантов"}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item name={"useTeamCode"} valuePropName={"checked"} label={"Использовать код команды для списка"}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item name={"groupTips"} valuePropName={"checked"} label={"Включить групповые чаевые"}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item name={"showWaiterList"} valuePropName={"checked"} label={"Отображать список официантов"}>
                        <Checkbox/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};
export default AdminTeamsView;
