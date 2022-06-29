// import {Email, Password} from "src/models/types/primitive"
// import React, {FC, useState} from "react"
// import {useDispatch} from "src/redu/store"
// import {Link, useNavigate} from "react-router-dom"
// import {MAX_COUNTER, RegState} from "src/views/auth/types"
// import {Button, Checkbox, Col, Form, Input, Row, Spin, Typography} from "antd"
// import {LoadingOutlined} from "@ant-design/icons"
// import InputVerificationCode from "src/components/input/verification"
// import Config from "src/config"
// import {EmailValidator, RequiredValidator} from "src/utils"
// import {InputViewPassword, InputViewPasswordHide} from "src/components/icons"
//
// interface SignInData {
//     phone: Email
//     phone_country: Password
//     need_call: Password
// }
//
// const AuthPhoneSignInView: FC = () => {
//     const dispatch = useDispatch()
//     const nav = useNavigate()
//     const [regState, setRegState] = useState(RegState.INFO)
//     const [loading, setLoading] = useState(false)
//     const [data] = Form.useForm<SignInData>()
//     const [errorCode, setErrorCode] = useState(false)
//     const [counter, setCounter] = useState<number>(0)
//
//     const onFinish = (values: SignInData) => {
//         setLoading(true)
//
//         // UserService.login(values.email, values.password).then(_ => UserService.getMe().then(user => {
//         //         dispatch(logIn(user))
//         //         setLoading(false)
//         //         nav("/admin")
//         //     }).catch(err => {
//         //         setLoading(false)
//         //         console.log({ err })
//         //     })
//         // ).catch(err => {
//         //     setLoading(false)
//         //     console.log({ err })
//         // })
//     };
//
//     function checkCode(code: string) {
//         setErrorCode(false)
//         setLoading(true)
//         // ApiService.logIntoAcc(code)
//         //     .then(it => {
//         //         setErrorCode(true)
//         //         // TODO: implement
//         //         // dispatch(logIn(info.getFieldsValue()))
//         //         // defOnClick()
//         //     })
//         //     .catch(it => {
//         //         console.log("catch", it)
//         //         setErrorCode(true)
//         //     })
//         //     .then(() => setLoading(false))
//     }
//
//     const renderVerification = () => {
//         return (
//             <>
//                 <div>
//                     <Typography.Text className={"b-title"}>
//                         Введите код подтверждения
//                     </Typography.Text>
//                 </div>
//                 <div className={"mtss"}>
//                     <Typography.Text className={"b-text"}>
//                         {"Мы отправили вам четырехзначный код на номер телефона который вы указали " + (data.getFieldsValue().phone ?? "")}
//                     </Typography.Text>
//                 </div>
//                 <div className={"mtmss"}>
//                     <Spin
//                         spinning={loading}
//                         indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
//                         <InputVerificationCode
//                             autoFocus={true}
//                             className={errorCode ? "wrong-code" : undefined}
//                             onCompleted={code => checkCode(code)}
//                             placeholder={<div className={"el"} />}
//                         />
//                     </Spin>
//                     <Typography.Text className={"wrong-code-text"} style={{ marginTop: 14, display: errorCode ? "block" : "none" }}>
//                         Неверный код подтверждения!
//                     </Typography.Text>
//                     <Button
//                         block
//                         type={"default"}
//                         disabled={counter > 0}
//                         onClick={() => setCounter(MAX_COUNTER)}
//                         className={"resend-code-b mtms"}>
//                         {counter ? `Вы можете отправить еще один код \n(${counter} секунд)` : "Отправить код еще раз"}
//                     </Button>
//                     <Button
//                         type={"text"}
//                         onClick={() => setRegState(RegState.INFO)}
//                         className={"change-phone-b mtms"}>
//                         Изменить номер телефона
//                     </Button>
//                 </div>
//             </>
//         )
//     }
//
//
//     return (
//         <Row className={"auth mt-header w100"}>
//             <Typography.Title level={1}>
//                 Войти в аккаунт
//             </Typography.Title>
//             <Col span={24} className={"w100 mt24"}>
//                 <Form
//                     form={data}
//                     name="f_login"
//                     layout="vertical"
//                     className="login-form"
//                     initialValues={Config.mockForms ? {
//                         email: "test@test.test",
//                         password: "133713371337",
//                     } : undefined}
//                     onFinish={onFinish}>
//                     <Form.Item
//                         name="email"
//                         label={"Email"}
//                         rules={[RequiredValidator("email"), EmailValidator]}>
//                         <Input placeholder="youremail@gmail.com"/>
//                     </Form.Item>
//                     <Form.Item
//                         name="password"
//                         label={"Password"}
//                         rules={[RequiredValidator("пароль")]}>
//                         {/*PasswordValidator(level, 1)*/}
//                         {/*<PasswordInput*/}
//                         {/*    placeholder="••••••••"*/}
//                         {/*    onLevelChange={setLevel}*/}
//                         {/*    iconRender={visible => <Button icon={visible ? <InputViewPassword/> : <InputViewPasswordHide/>}/>}*/}
//                         {/*/>*/}
//                         <Input.Password
//                             placeholder="••••••••"
//                             iconRender={visible => <Button icon={visible ? <InputViewPassword/> : <InputViewPasswordHide/>}/>}/>
//                     </Form.Item>
//                     <Form.Item required={false}>
//                         <Form.Item name="remember" valuePropName="checked" noStyle>
//                             <Checkbox className={"bb"}>Запомнить меня</Checkbox>
//                         </Form.Item>
//
//                         <Link to={""} className="login-form-forgot">
//                             Забыли пароль?
//                         </Link>
//                     </Form.Item>
//                     <Form.Item>
//                         <Button loading={loading} type="primary" htmlType="submit" className="w100">
//                             Войти
//                         </Button>
//                         <Link to={"/auth/signup"}>
//                             Нету аккаунта?
//                         </Link>
//                     </Form.Item>
//                 </Form>
//             </Col>
//         </Row>
//     )
// }
//
// export default AuthPhoneSignInView
