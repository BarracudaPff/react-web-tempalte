import React, {FunctionComponent, useEffect, useState} from "react";
import SubAdminHeader from "src/components/header/sub-admin"
import {Button, Form, Input, InputNumber, List, Modal, Result, Spin, Tabs, Typography} from "antd"
import {PlusOutlined, EditOutlined} from "@ant-design/icons"
import {capitalize, percents, randomAdjective, randomEmail, randomPassword, withTimeout} from "src/utils"
import {RestService} from "src/services/RestService"
import Config from "src/config"
import {useDispatch, useSelector} from "src/redu/store"
import {
    addAllRest, addManagerRest,
    addRest, deleteManagerRest,
    deleteRest,
    modifyAddressRest,
    modifyBasicRest,
    modifyFinanceRest,
    modifyLegalRest, updManagerRest, updRest
} from "src/redu/actions/rest"
import RestCard from "src/components/card/RestCard"
import {Restaurant} from "src/models/application/restaurants"
import PasswordInput from "src/components/input/password"
import notification from "src/utils/notification"
import AsyncButton from "src/components/buttons/AsyncButton"

interface Props {
}

interface CreationData {
    name: string
    percent: number
}

interface EditData {
    rest: Restaurant

    name?: string
    percent?: number

    country?: string
    city?: string
    street?: string
    house?: string

    ogrn?: string
    inn?: string
    kpp?: string
    organizationFullName?: string
    zipCode?: string
    russiaSubject?: string
    cityLegal?: string
    streetLegal?: string
    houseLegal?: string
    officeLegal?: string

    bik?: string
    accountNumber?: string

    phoneLinked?: boolean
    cardLinked?: boolean

    managerEmail?: string | null
    managerPhone?: string | null
}

type ActiveKeyType = "basic" | "address" | "legal" | "finance" | "payback" | "card" | "phone" | "manager"

const AdminRestaurantsView: FunctionComponent<Props> = (props) => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showRest, setShowRest] = useState<Restaurant>()
    const [editManager, setEditManager] = useState(false)

    const [activeKey, setActiveKey] = useState<ActiveKeyType>("basic")

    const [form] = Form.useForm<CreationData>()
    const [editForm] = Form.useForm<EditData>()

    const me = useSelector(it => it.user.user)
    const rests = useSelector(it => it.rest.data)
    const dispatch = useDispatch()

    const toggleCreateModal = () => setShowCreateModal(it => !it)
    const toggleEditModal = () => setShowEditModal(it => !it)

    useEffect(() => {
        RestService.listRest().then(rests => {
            dispatch(addAllRest(rests))
        }).catch(e => notification.error({ message: "Не получилось получить список ресторанов" }, e))
    }, [])

    const createRest = () => {
        const data = form.getFieldsValue()
        return RestService.createNew(data.name, data.percent).then(rest => {
            toggleCreateModal()
            notification.success({ message: "Ресторан создан!" })
            dispatch(addRest(rest))
        }).catch(e => notification.error({ message: "Не получилось создать ресторан" }, e))
    }

    const linkCard = () => {
        if (!showRest) return

        return RestService.linkCard(showRest.id).then(rest => {
            window.location.href = rest
        }).catch(e => notification.error({ message: "Не получилось привязать карту" }, e))
    }

    const linkPhone = () => {
        if (!showRest) return

        return RestService.linkPhone(showRest.id).then(rest => {
            window.location.href = rest
        }).catch(e => notification.error({ message: "Не получилось привязать телефон" }, e))
    }

    const deleteManager = () => {
        if (!showRest) return

        return RestService.deleteManager(showRest.id).then(_ => {
            dispatch(deleteManagerRest(showRest.id))
            notification.success({ message: "Менеджер успешно удален!" })
        }).catch(e => notification.error({ message: "Не получилось привязать телефон" }, e))
    }

    const requestPayout = () => {
        if (!showRest) return

        return RestService.requestPayout(showRest.id)
            .then(_ => notification.success({ message: "Средства успешно выведены!" }))
            .catch(e => notification.error({ message: "Не получилось вывести средства" }, e))
    }

    const editRest = async () => {
        const data = editForm.getFieldsValue()

        switch (activeKey) {
            case "basic":
                RestService.updateBaseInfo(data.rest.id, {
                    fullName: data.name!!,
                    feeAmount: data.percent!!,
                }).then(rest => {
                    notification.success({ message: "Ресторан изменен!" })
                    dispatch(modifyBasicRest(rest))
                }).catch(e => notification.error({ message: "Не получилось изменить ресторан" }, e))
                break;
            case "address":
                RestService.updateAddress(data.rest.id, {
                    country: data.country!!,
                    city: data.city!!,
                    street: data.street!!,
                    building: data.house!!,
                }).then(address => {
                    notification.success({ message: "Ресторан изменен!" })
                    dispatch(modifyAddressRest({ id: data.rest.id, address }))
                }).catch(e => notification.error({ message: "Не получилось изменить ресторан" }, e))
                break;
            case "legal":
                RestService.updateLegalInfo(data.rest.id, {
                    ogrn: data.ogrn!!,
                    inn: data.inn!!,
                    kpp: data.kpp!!,
                    organizationFullName: data.organizationFullName!!,
                    zipCode: data.zipCode!!,
                    russiaSubject: data.russiaSubject!!,
                    city: data.cityLegal!!,
                    street: data.streetLegal!!,
                    building: data.houseLegal!!,
                    office: data.officeLegal!!,
                }).then(legalInfo => {
                    notification.success({ message: "Ресторан изменен!" })
                    dispatch(modifyLegalRest({ id: data.rest.id, legalInfo }))
                }).catch(e => notification.error({ message: "Не получилось изменить ресторан" }, e))
                break;
            case "finance":
                RestService.updateFinanceInfo(data.rest.id, {
                    bik: data.bik!!,
                    accountNumber: data.accountNumber!!,
                    useCard: true,// data.useCard!!,
                }).then(financeInfo => {
                    notification.success({ message: "Ресторан изменен!" })
                    dispatch(modifyFinanceRest({ id: data.rest.id, financeInfo }))
                }).catch(e => notification.error({ message: "Не получилось изменить ресторан" }, e))
                break;
            case "payback":
            case "card":
            case "phone":
                break;
            case "manager":
                const isNewManager = !data.rest.managerId
                const req = isNewManager ? RestService.newManager : RestService.updateManager
                const dis = isNewManager ? addManagerRest : updManagerRest

                req(data.rest.id, data.managerEmail!!, data.managerPhone!!).then(manager => {
                    notification.success({ message: `Менеджер ${isNewManager ? "добавлен" : "изменен"}!` })
                    dispatch(dis({ id: data.rest.id, manager }))
                }).catch(e => notification.error({ message: `Не получилось ${isNewManager ? "добавить" : "изменить"} менеджера` }, e))
                break;
        }
    }

    return (
        <>
            <SubAdminHeader title={"Заведения"}>
                <Button type="primary" icon={<PlusOutlined/>} shape={"round"} size={"large"} onClick={toggleCreateModal}>
                    Добавить ресторан
                </Button>
            </SubAdminHeader>
            <List
                dataSource={rests}
                split={false}
                renderItem={(it) => (
                    <List.Item>
                        <RestCard
                            rest={it.rest}
                            style={{ flex: 1 }}
                            onClick={({ id }) => {
                                setShowEditModal(true)
                                RestService.getFullInfo(id).then(fullRest => {
                                    const rest = fullRest[0]
                                    dispatch(updRest(rest))
                                    editForm.setFieldsValue({
                                        rest,

                                        name: rest.fullName,
                                        percent: rest.feeAmount,

                                        country: rest.address?.country,
                                        city: rest.address?.city,
                                        street: rest.address?.street,
                                        house: rest.address?.building,

                                        ogrn: rest.legalInfo?.ogrn,
                                        inn: rest.legalInfo?.inn,
                                        kpp: rest.legalInfo?.kpp,
                                        organizationFullName: rest.legalInfo?.organizationFullName,
                                        zipCode: rest.legalInfo?.zipCode,
                                        russiaSubject: rest.legalInfo?.russiaSubject,
                                        cityLegal: rest.legalInfo?.city,
                                        streetLegal: rest.legalInfo?.street,
                                        houseLegal: rest.legalInfo?.building,
                                        officeLegal: rest.legalInfo?.office,

                                        bik: rest.financeInfo?.bik,
                                        accountNumber: rest.financeInfo?.accountNumber,
                                        phoneLinked: rest.financeInfo?.phoneLinked,
                                        cardLinked: rest.financeInfo?.cardLinked,

                                        managerEmail: rest.manager?.email,
                                        managerPhone: rest.manager?.phone,
                                    })
                                    setShowRest(rest)
                                }).catch(e => {
                                    notification.error({ message: "Не получилось получить все данные о ресторане" }, e)
                                    setShowEditModal(false)
                                })
                            }}
                            onDelete={(id) => {
                                dispatch(deleteRest(id))
                            }}
                        />
                    </List.Item>
                )}
            />
            <Modal
                okText={"Создать"}
                onOk={() => form.submit()}
                onCancel={toggleCreateModal}
                visible={showCreateModal}>
                <Form layout={"vertical"} form={form} onFinish={createRest} initialValues={Config.mockForms ? {
                    name: capitalize(randomAdjective()) + " ресторан",
                    percent: 5
                } : undefined}>
                    <Form.Item name={"name"} label={"Название ресторана"}>
                        <Input placeholder={capitalize(randomAdjective()) + " ресторан"}/>
                    </Form.Item>
                    <Form.Item name={"percent"} label={"Размер комиссии, %"}>
                        <InputNumber placeholder={percents(0)}/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                width={"50%"}
                okText={"Изменить"}
                onOk={() => editForm.submit()}
                onCancel={toggleEditModal}
                visible={showEditModal}>
                {!showRest && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
                    <Spin/>
                </div>}
                {showRest && <Tabs tabPosition={"left"} activeKey={activeKey} onChange={it => {
                    setActiveKey(it as ActiveKeyType)
                    if (editManager) setEditManager(false)
                }}>
                    <Tabs.TabPane tab={"Базовая информация"} key={"basic"}>
                        <Form layout={"vertical"} form={editForm} onFinish={editRest}>
                            <Typography.Title level={3}>
                                Базовая информация
                            </Typography.Title>
                            <Form.Item name={"rest"} noStyle/>
                            <Form.Item name={"name"} label={"Название ресторана"}>
                                <Input placeholder={capitalize(randomAdjective()) + " ресторан"}/>
                            </Form.Item>
                            <Form.Item name={"percent"} label={"Размер комиссии, %"}>
                                <InputNumber placeholder={percents(0)}/>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={"Адрес"} key={"address"}>
                        <Form layout={"vertical"} form={editForm} onFinish={editRest}>
                            <Typography.Title level={3}>
                                Адрес
                            </Typography.Title>
                            <Form.Item name={"rest"} noStyle/>
                            <Form.Item name={"country"} label={"Страна"}>
                                <Input placeholder={"Страна"}/>
                            </Form.Item>
                            <Form.Item name={"city"} label={"Город"}>
                                <Input placeholder={"Город"}/>
                            </Form.Item>
                            <Form.Item name={"street"} label={"Улица"}>
                                <Input placeholder={"Улица"}/>
                            </Form.Item>
                            <Form.Item name={"house"} label={"Дом"}>
                                <Input placeholder={"Номер дома"}/>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={"Юридические данные"} key={"legal"}>
                        <Form layout={"vertical"} form={editForm} onFinish={editRest}>
                            <Typography.Title level={3}>
                                Юридические данные
                            </Typography.Title>
                            <Form.Item name={"rest"} noStyle/>
                            <Form.Item name={"ogrn"} label={"ОГРН"}>
                                <Input placeholder={"ОГРН"}/>
                            </Form.Item>
                            <Form.Item name={"inn"} label={"ИНН"}>
                                <Input placeholder={"ИНН"}/>
                            </Form.Item>
                            <Form.Item name={"kpp"} label={"КПП"}>
                                <Input placeholder={"КПП"}/>
                            </Form.Item>
                            <Form.Item name={"organizationFullName"} label={"Название организации"}>
                                <Input placeholder={"Название организации"}/>
                            </Form.Item>
                            <Form.Item name={"zipCode"} label={"Почтовый индекс"}>
                                <Input placeholder={"Почтовые индекс"}/>
                            </Form.Item>
                            <Form.Item name={"russiaSubject"} label={"Субъект"}>
                                <Input placeholder={"Субъект"}/>
                            </Form.Item>
                            <Form.Item name={"cityLegal"} label={"Город"}>
                                <Input placeholder={"Город"}/>
                            </Form.Item>
                            <Form.Item name={"streetLegal"} label={"Улица"}>
                                <Input placeholder={"Улица"}/>
                            </Form.Item>
                            <Form.Item name={"houseLegal"} label={"Дом"}>
                                <Input placeholder={"Дом"}/>
                            </Form.Item>
                            <Form.Item name={"officeLegal"} label={"Квартира/Офис"}>
                                <Input placeholder={"Квартира/Офис"}/>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={"Финансовые данные"} key={"finance"}>
                        <Form layout={"vertical"} form={editForm} onFinish={editRest}>
                            <Typography.Title level={3}>
                                Финансовые данные
                            </Typography.Title>
                            <Form.Item name={"rest"} noStyle/>
                            <Form.Item name={"bik"} label={"БИК"}>
                                <Input placeholder={"БИК"}/>
                            </Form.Item>
                            <Form.Item name={"accountNumber"} label={"Расчетный счет"}>
                                <Input placeholder={"Расчетный счет"}/>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>

                    {me?.isOwner() && <>
                        <Tabs.TabPane tab={"Карта"} key={"card"}>
                            {/*TODO: add expired status*/}
                            {showRest?.financeInfo?.cardLinked && <Result
                                status="success"
                                title="Карта успешна привязана"
                                subTitle="Отображение карты может занять от 1 до 5 минут, пожалуйста, подождите."/>}
                            {(!showRest?.financeInfo?.cardLinked && true) && <Result
                                status="warning"
                                title="Карта не привязана"
                                subTitle="Пожалуйста, привяжите карту. Без неё, вы не сможете получать чаевые."
                                extra={
                                    <Button type={"primary"} onClick={linkCard}>
                                        Привязать
                                    </Button>
                                }
                            />}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={"Телефон"} key={"phone"}>
                            {/*TODO: add expired status*/}
                            {showRest?.financeInfo?.phoneLinked && <Result
                                status="success"
                                title="Телефон успешно привязан"
                                subTitle="Отображение карты может занять от 1 до 5 минут, пожалуйста, подождите."/>}
                            {(!showRest?.financeInfo?.phoneLinked && true) && <Result
                                status="warning"
                                title="Телефон не привязан"
                                subTitle="Пожалуйста, привяжите телефон. Так вы сможете получать уведомление о чаевых и привязывать более одной карты."
                                extra={
                                    <Button type={"primary"} onClick={linkPhone}>
                                        Привязать
                                    </Button>
                                }
                            />}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={"Менеджер ресторана"} key={"manager"}>
                            <Typography.Title level={3}>
                                Менеджер ресторана
                            </Typography.Title>
                            {showRest?.managerId && <Result
                                status="success"
                                title="Менеджер создан и функционирует"
                                subTitle="Пожалуйста, добавьте номер телефона менеджера."
                                extra={
                                    <>
                                        {!editManager && <>
                                            <Button type={"primary"} onClick={() => setEditManager(true)}>
                                                Изменить данные
                                            </Button>
                                            <Button danger onClick={deleteManager}>
                                                Удалить
                                            </Button>
                                        </>}
                                        {editManager && <Form layout={"vertical"} form={editForm} onFinish={editRest}>
                                            <Form.Item name={"rest"} noStyle/>
                                            <Form.Item name={"managerEmail"} label={"Email"}>
                                                <Input placeholder={randomEmail()}/>
                                            </Form.Item>
                                            <Form.Item name={"managerPhone"} label={"Телефон"}>
                                                <Input/>
                                            </Form.Item>
                                            {Config.isDevelopment &&
                                                <Button onClick={() => editForm.setFieldsValue({
                                                    managerEmail: randomEmail(),
                                                    managerPhone: randomPassword(),
                                                })}>
                                                    Сгенерировать данные
                                                </Button>}
                                        </Form>}
                                    </>
                                }/>}
                            {!showRest?.managerId && <Result
                                status="warning"
                                title="Менеджер не добавлен"
                                subTitle="Пожалуйста, добавьте номер телефона менеджера."
                                extra={
                                    <Form layout={"vertical"} form={editForm} onFinish={editRest}>
                                        <Form.Item name={"rest"} noStyle/>
                                        <Form.Item name={"managerEmail"} label={"Email"}>
                                            <Input placeholder={randomEmail()}/>
                                        </Form.Item>
                                        <Form.Item name={"managerPhone"} label={"Телефон"}>
                                            <Input/>
                                        </Form.Item>
                                        {Config.isDevelopment &&
                                            <Button
                                                icon={<EditOutlined/>}
                                                onClick={() => editForm.setFieldsValue({
                                                    managerEmail: randomEmail(),
                                                    managerPhone: Config.debugPhoneNumber
                                                })}/>}
                                    </Form>
                                }
                            />}

                            {/*<Form layout={"vertical"} form={editForm} onFinish={editRest}>*/}
                            {/*    <Typography.Title level={3}>*/}
                            {/*        Менеджер ресторана*/}
                            {/*    </Typography.Title>*/}
                            {/*    <Form.Item name={"rest"} noStyle/>*/}
                            {/*    <Form.Item name={"manager_phone"} label={"Телефон"}>*/}
                            {/*        <Input/>*/}
                            {/*    </Form.Item>*/}
                            {/*    {Config.isDevelopment && <Button onClick={() => editForm.setFieldsValue({*/}
                            {/*        manager_phone: randomPassword(),*/}
                            {/*    })}>*/}
                            {/*        Сгенерировать данные*/}
                            {/*    </Button>}*/}
                            {/*</Form>*/}
                        </Tabs.TabPane>
                    </>}


                    {me?.isManagerOrStronger() && <Tabs.TabPane tab={`Вывод средств на счет`} key={"payback"}>
                        <Typography.Title level={3}>
                            Базовая информация
                        </Typography.Title>
                        <AsyncButton type={"primary"} block size={"large"} onClick={requestPayout}>
                            Вывести все средства
                        </AsyncButton>
                    </Tabs.TabPane>}
                </Tabs>}
            </Modal>
        </>
    );
};

export default AdminRestaurantsView;
