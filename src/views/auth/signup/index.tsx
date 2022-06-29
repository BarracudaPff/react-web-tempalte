import React, {FC, useState} from "react"
import "../style.scss"
import {Button, Col, Form, Input, notification, Row, Typography} from "antd"
import {Link} from "react-router-dom"
import {RequiredValidator} from "src/utils"
import {ApiService, DomainError} from "src/services"
import {Email, Phone} from "src/models/types/primitive"
import Config from "src/config"

interface SignInData {
    email: Email
    phone: Phone
    company: string
    info: string
}

const AuthSignUpView: FC = () => {
    const [loading, setLoading] = useState(false)
    const [data] = Form.useForm<SignInData>()

    const onFinish = (values: SignInData) => {
        console.log("Received values of form: ", values);
        setLoading(true)
        ApiService.sendApplication(values.phone, values.email, values.company, values.info)
            .then(() => notification.success({ message: "Ваша заявка отправлена, мы ответим вам как можно раньше!" }))
            .catch(err => DomainError.notifyError(err, "Не получилось войти в профиль"))
            .finally(() => setLoading(false))
    }

    return (
        <Row className={"auth mt-header w100"}>
            <Typography.Title level={1}>
                Зарегистрировать новый аккаунт
            </Typography.Title>
            <Col span={24} className={"w100 mt24"}>
                <Form
                    form={data}
                    name="f_login"
                    layout="vertical"
                    className="login-form"
                    initialValues={Config.mockForms ? {
                        email: "email@email.com",
                        phone: "+71234567890",
                        company: "Simple company",
                    } : undefined}
                    onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label={"Email"}
                        rules={[RequiredValidator("email")]}>
                        <Input type={"email"} placeholder="youremail@gmail.com"/>
                    </Form.Item>
                    <Form.Item
                        name="company"
                        label={"Компания"}
                        rules={[RequiredValidator()]}>
                        <Input placeholder="Ваша компания"/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={"Телефон"}
                        rules={[RequiredValidator("телефон")]}>
                        <Input placeholder="+7 (XXX) XXX-XX-XX"/>
                    </Form.Item>
                    <Form.Item
                        name="info"
                        label={"Дополнительная информация"}>
                        <Input/>
                    </Form.Item>

                    <Button loading={loading} type="primary" htmlType="submit" className="w100">
                        Оформить заявку
                    </Button>
                    <Link to={"/auth/signin"}>
                        Уже есть аккаунт?
                    </Link>
                </Form>
            </Col>
        </Row>
    )
}

export default AuthSignUpView
