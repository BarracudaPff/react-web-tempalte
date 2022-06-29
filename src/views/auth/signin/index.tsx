import React, {FC, useState} from "react"
import "../style.scss"
import {Button, Checkbox, Col, Form, Input, Row, Typography} from "antd"
import {Link, useNavigate} from "react-router-dom"
import {InputViewPassword, InputViewPasswordHide} from "src/components/icons"
import {EmailValidator, RequiredValidator} from "src/utils"
import {UserService} from "src/services/UserService"
import Config from "src/config"
import {Email, Password} from "src/models/types/primitive"
import {useDispatch} from "src/redu/store"
import {logIn} from "src/redu/actions/user"
import {useSearchParam} from "src/utils/hooks"
import {StringParam, createEnumParam} from "serialize-query-params"

// import AuthPhoneSignInView from "src/views/auth/signin/phone"

interface SignInData {
    email: Email
    password: Password
}

const AuthSignInView: FC = () => {
    const [type] = useSearchParam("type", createEnumParam(["email", "phone"]))

    // if (type == "phone") return <AuthPhoneSignInView/>

    const dispatch = useDispatch()
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data] = Form.useForm<SignInData>()

    const onFinish = (values: SignInData) => {
        setLoading(true)

        UserService.login(values.email, values.password).then(user => {
            dispatch(logIn(user))
            setLoading(false)
            nav("/admin")
        }).catch(err => {
            setLoading(false)
            console.log({ err })
        })
    };

    return (
        <Row className={"auth mt-header w100"}>
            <Typography.Title level={1}>
                Войти в аккаунт
            </Typography.Title>
            <Col span={24} className={"w100 mt24"}>
                <Form
                    form={data}
                    name="f_login"
                    layout="vertical"
                    className="login-form"
                    initialValues={Config.mockForms ? {
                        email: "test@test.test",
                        password: "12345678",
                    } : undefined}
                    onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label={"Email"}
                        rules={[RequiredValidator("email"), EmailValidator]}>
                        <Input placeholder="youremail@gmail.com"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={"Password"}
                        rules={[RequiredValidator("пароль")]}>
                        {/*PasswordValidator(level, 1)*/}
                        {/*<PasswordInput*/}
                        {/*    placeholder="••••••••"*/}
                        {/*    onLevelChange={setLevel}*/}
                        {/*    iconRender={visible => <Button icon={visible ? <InputViewPassword/> : <InputViewPasswordHide/>}/>}*/}
                        {/*/>*/}
                        <Input.Password
                            placeholder="••••••••"
                            iconRender={visible => <Button icon={visible ? <InputViewPassword/> : <InputViewPasswordHide/>}/>}/>
                    </Form.Item>
                    <Form.Item required={false}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className={"bb"}>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Link to={""} className="login-form-forgot">
                            Забыли пароль?
                        </Link>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" className="w100">
                            Войти
                        </Button>
                        <Row justify={"space-between"}>
                            <Link to={"/auth/signup"}>
                                Нету аккаунта?
                            </Link>
                            <Link to={"/auth/signin?type=phone"}>
                                Зайти через почту?
                            </Link>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default AuthSignInView
