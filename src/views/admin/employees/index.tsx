import React, {FunctionComponent, useEffect, useState} from "react";
import SubAdminHeader from "src/components/header/sub-admin"
import {Button, Checkbox, Form, Input, InputNumber, List, Modal, Row, Select, Upload, UploadProps} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import {capitalize, convertModelToFormData, randomEmail, randomName, randomPassword, randomPhone, randomSurname} from "src/utils"
import {RestService} from "src/services/RestService"
import Config from "src/config"
import {useDispatch, useSelector} from "src/redu/store"
import {addAllRest, deleteRest} from "src/redu/actions/rest"
import notification from "src/utils/notification"
import {UserService} from "src/services/UserService"
import {addAllUsers} from "src/redu/actions/waiters"
import UserCard from "src/components/card/UserCard"
import {RestaurantID, TeamID} from "src/models/types/primitive"
import {RestField} from "src/services/api/ApiService"
import {ApiService} from "src/services"
import ImgCrop from "antd-img-crop";
import {UploadFile} from "antd/es/upload/interface"
import {RcFile} from "antd/lib/upload"
import PasswordInput from "src/components/input/password"
import AsyncButton from "src/components/buttons/AsyncButton"

interface Props {
}

interface CreationData {
    restId: RestaurantID
    avatar?: UploadFile[]
    name: string
    surname?: string
    goal?: string
    teamId: TeamID
    feeDefault: boolean
    fee?: number
    email?: string
    phone?: string
    password?: string
}

type ActiveKeyType = "basic" | "address" | "legal" | "finance" | "payback" | "card" | "phone" | "manager"

const EmployeesRestaurantsView: FunctionComponent<Props> = (props) => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [formRequesting, setFormRequesting] = useState(false);

    const [form] = Form.useForm<CreationData>()
    const selectedRestId = Form.useWatch("restId", form)
    const feeDefault = Form.useWatch("feeDefault", form)
    const avatar = Form.useWatch("avatar", form)

    const me = useSelector(it => it.user.user)
    const rests = useSelector(it => it.rest.data)
    const users = useSelector(it => it.waiters.data)
    const dispatch = useDispatch()

    const toggleCreateModal = () => setShowCreateModal(it => !it)

    useEffect(() => {
        UserService.list().then(users => {
            dispatch(addAllUsers(users))
        }).catch(e => notification.error({ message: "Не получилось получить список пользователей" }, e))
    }, [])

    useEffect(() => {
        if (rests.length) return

        RestService.listWithFieldsRest(undefined, [RestField.TEAMS])
            .then(rests => dispatch(addAllRest(rests))).catch(e => notification.error({ message: "Не получилось получить список ресторанов" }, e))
    }, [])

    const createUser = () => {
        const data = form.getFieldsValue()

        console.log(data)
        setFormRequesting(true)
        return UserService.createNew(
            data.restId,
            data.teamId,
            data.name,
            data.feeDefault,
            data.fee,
            undefined, //data.avatar && data.avatar[0].originFileObj,
            data.surname,
            data.goal,
            data.email,
            data.password,
            data.phone,
        )
            .then(toggleCreateModal)
            .catch(e => notification.error({ message: "Не получилось создать пользователя" }, e))
            .then(() => setFormRequesting(false))
    }

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>
            <SubAdminHeader title={"Сотрудники"}>
                <Button type="primary" icon={<PlusOutlined/>} shape={"round"} size={"large"} onClick={toggleCreateModal}>
                    Добавить сотрудника
                </Button>
            </SubAdminHeader>
            <List
                dataSource={users}
                split={false}
                renderItem={({ user }) => (
                    <List.Item>
                        <UserCard
                            user={user}
                            style={{ flex: 1 }}
                            onClick={({ id }) => {
                            }}
                            onDelete={(id) => dispatch(deleteRest(id))}
                        />
                    </List.Item>
                )}
            />
            <Modal
                okText={"Создать"}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: formRequesting
                }}
                onCancel={toggleCreateModal}
                visible={showCreateModal}>
                <Form layout={"vertical"} form={form} onFinish={createUser} initialValues={Config.mockForms ? {
                    restId: undefined,
                    name: capitalize(randomName()),
                    surname: capitalize(randomSurname()),
                    team: undefined,
                    feeDefault: true,
                    fee: Math.floor(Math.random() * 10),
                    email: randomEmail(),
                    phone: randomPhone(),
                    password: randomPassword(),
                } : {
                    feeDefault: true
                }}>
                    <Form.Item name={"avatar"} label={"Аватар"} valuePropName="fileList">
                        <ImgCrop rotate>
                            <Upload
                                listType="picture-card"
                                onChange={({ fileList }) => form.setFieldsValue({ avatar: fileList })}
                                onPreview={onPreview}
                                fileList={avatar}
                                maxCount={1}
                                customRequest={(req) => req.onSuccess && req.onSuccess("OK")}>
                                {!avatar?.length && "Загрузить"}
                            </Upload>
                        </ImgCrop>
                        {/*<ImgCrop rotate modalTitle={"Изменить изображение"} onModalOk={()=>{*/}
                        {/*    console.log("!")*/}
                        {/*}}>*/}
                        {/*    <Upload*/}
                        {/*        maxCount={1}*/}
                        {/*        onChange={c => {*/}
                        {/*            console.log({ c })*/}
                        {/*            form.setFieldsValue({ avatar: c.file })*/}
                        {/*        }}*/}
                        {/*        onRemove={() => {*/}
                        {/*            form.setFieldsValue({ avatar: undefined })*/}
                        {/*        }}*/}
                        {/*        onDownload={f => console.log({ f })}*/}
                        {/*        // onPreview={p => console.log({ p })}*/}
                        {/*        beforeUpload={() => false} listType="picture-card">*/}
                        {/*        {!avatar && "Загрузить"}*/}
                        {/*    </Upload>*/}
                        {/*</ImgCrop>*/}
                    </Form.Item>
                    <Form.Item name="restId" label="Ресторан" required>
                        <Select placeholder="Ресторан сотрудника">
                            {rests.map(({ rest }) => <Select.Option key={rest.id} value={rest.id}>{rest.fullName}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name={"name"} label={"Имя"} required>
                        <Input placeholder={capitalize(randomName())}/>
                    </Form.Item>
                    <Form.Item name={"surname"} label={"Фамилия"}>
                        <Input placeholder={capitalize(randomSurname())}/>
                    </Form.Item>
                    <Form.Item name={"goal"} label={"Цель"}>
                        <Input placeholder={"На новую жизнь!"}/>
                    </Form.Item>
                    <Form.Item name="teamId" label="Команда" required>
                        <Select placeholder="Ресторан сотрудника" disabled={!selectedRestId}>
                            {rests.find(it => it.rest.id == selectedRestId)?.rest?.teams
                                ?.map((it) => <Select.Option key={it.id} value={it.id}>{it.teamName}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name={"feeDefault"} valuePropName="checked" label={"Использовать комиссию ресторана по умолчанию"}>
                        <Checkbox/>
                    </Form.Item>
                    {!feeDefault && <Form.Item name={"fee"} label={"Комиссия официанта"}>
                        <InputNumber placeholder={"Комиссия официанта"} addonAfter="%"/>
                    </Form.Item>}
                    <Form.Item name={"email"} label={"Email"}>
                        <Input placeholder={randomEmail()}/>
                    </Form.Item>
                    <Form.Item name={"password"} label={"Пароль"}>
                        <Input.Password placeholder="••••••••"/>
                    </Form.Item>
                    <Form.Item name={"phone"} label={"Телефон"}>
                        <Input placeholder={randomPhone()}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EmployeesRestaurantsView;
