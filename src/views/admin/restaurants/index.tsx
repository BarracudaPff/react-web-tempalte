import React, {FunctionComponent, useEffect, useState} from "react";
import SubAdminHeader from "src/components/header/sub-admin"
import {Button, Form, Input, InputNumber, List, Modal, notification, Row} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import {capitalize, percents, randomAdjective, randomNoun} from "src/utils"
import {RestService} from "src/services/RestService"
import Config from "src/config"
import {useDispatch, useSelector} from "src/redu/store"
import {addAllRest, addRest} from "src/redu/actions/rest"
import RestCard from "src/components/card/RestCard"

interface Props {
}

interface CreationData {
    name: string
    percent: number
}

const AdminRestaurantsView: FunctionComponent<Props> = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [form] = Form.useForm<CreationData>()

    const rests = useSelector(it => it.rest.data)

    const dispatch = useDispatch()

    const toggleModal = () => setShowModal(it => !it)

    useEffect(() => {
        RestService.listRest().then(rests => {
            dispatch(addAllRest(rests))
        }).catch(err => {
            notification.error({ message: "Не получилось получить список ресторанов" })
            console.log(err)
        })
    }, [])

    const createRest = () => {
        const data = form.getFieldsValue()
        RestService.createNewRest(data.name, data.percent).then(rest => {
            notification.success({ message: "Ресторан создан!" })
            dispatch(addRest(rest))
            console.log(rest)
        }).catch(err => {
            notification.error({ message: "Не получилось создать ресторан" })
            console.log(err)
        })
    }

    return (
        <>
            <SubAdminHeader title={"Заведения"}>
                <Button type="primary" icon={<PlusOutlined/>} shape={"round"} size={"large"} onClick={toggleModal}>
                    Добавить ресторан
                </Button>
            </SubAdminHeader>
            <List
                dataSource={rests}
                split={false}
                renderItem={(it) => (
                    <List.Item>
                        <RestCard rest={it.rest} style={{flex: 1}}/>
                    </List.Item>
                )}
            />
            <Modal
                okText={"Создать"}
                onOk={() => form.submit()}
                onCancel={toggleModal}
                visible={showModal}>
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
        </>
    );
};

export default AdminRestaurantsView;
