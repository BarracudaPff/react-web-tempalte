import React, {FC, useEffect, useState} from "react"
import "./style.scss"
import {Button, Card, Form, Input, Layout, List, Modal, Typography} from "antd"
import Header from "src/components/header"
import Footer from "src/components/footer"
import {UserService} from "src/services/ProductService";
import {UserInfoI} from "src/models/domain";
import {NumberParam} from "serialize-query-params";
import {useSearchParam} from "src/utils/hooks";
import {useDispatch, useSelector} from "src/redu/store";
import {addUser, loadUsers} from "src/redu/actions/user";

const LandingView: FC = () => {
    const [id, setId] = useSearchParam("id", NumberParam);
    const [addNewUser, setAddNewUser] = useState(false);
    const [loadingFormReq, setLoadingFormReq] = useState(false);

    const dispatch = useDispatch()
    const [form] = Form.useForm<UserInfoI>();

    const {users} = useSelector(it => it.user)

    useEffect(() => {
        UserService.listUsers()
            .then(it => dispatch(loadUsers(it)))
    }, [])

    const fillValues = () => {
        const rS = () => (Math.random() + 1).toString(36).substring(7);
        const rN = () => Math.random();

        form.setFieldsValue({
            id: rN(),
            name: rS(),
            username: rS(),
            email: rS(),
            address: {
                street: rS(),
                suite: rS(),
                city: rS(),
                zipcode: rS(),
                geo: {
                    lat: rS(),
                    lng: rS()
                }
            },
            phone: rS(),
            website: rS(),
            company: {
                name: rS(),
                catchPhrase: rS(),
                bs: rS()
            }
        })
    }

    const handleSubmit = (values: UserInfoI) => {
        const info = {...values, id: Math.random()}
        setLoadingFormReq(true)
        UserService.addUser(info)
            .then(it => dispatch(addUser(it)))
            .then(() => handleCancel())
            .catch(err => {
                Modal.error({
                    title: "Error happened :(",
                    content: err.toString(),
                });
            })
            .finally(() => setLoadingFormReq(false))
    }

    const handleCancel = () => {
        setAddNewUser(false)
        form.resetFields()
    };

    const formInput = (key: string) => (
        <Form.Item name={key} label={key}>
            <Input placeholder={key}/>
        </Form.Item>
    )

    const formInputComplex = (key: string[]) => (
        <Form.Item name={key} label={key.join("-")}>
            <Input placeholder={key[0]}/>
        </Form.Item>
    )

    return (
        <Layout>
            <Header/>
            <Layout.Content className={"page landing"}>
                <Typography.Text>sample text</Typography.Text>
                <Button type={"primary"} onClick={() => setAddNewUser(true)}>Add new one</Button>
                <Input.Search
                    placeholder="input search text"
                    allowClear
                    onSearch={it => setId(Number(it))}
                    style={{width: 200}}/>
                <List
                    style={{padding: 16}}
                    grid={{column: 2, gutter: 32}}
                    dataSource={id ? users?.filter(it => it.id == id) : users}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Card title={item.fullName()}>
                                    <Typography.Title level={4}>{"Id: " + item.id}</Typography.Title>
                                    <Typography.Paragraph>{item.email}</Typography.Paragraph>
                                    <Typography.Paragraph>{item.phone}</Typography.Paragraph>
                                    <Typography.Paragraph>{item.website}</Typography.Paragraph>
                                    <Typography.Paragraph>{item.fullAddress()}</Typography.Paragraph>
                                    <Typography.Paragraph>{item.fullCompany()}</Typography.Paragraph>
                                </Card>
                            </List.Item>
                        )
                    }}
                />
            </Layout.Content>
            <Footer/>
            <Modal
                title={"Create new user"}
                visible={addNewUser}
                onOk={form.submit}
                okButtonProps={{loading: loadingFormReq}}
                onCancel={handleCancel}>
                <Button onClick={fillValues}>Fill values</Button>
                <Form form={form} onFinish={handleSubmit}>
                    {formInput("name")}
                    {formInput("username")}
                    {formInput("email")}
                    {formInput("phone")}
                    {formInput("website")}

                    {formInputComplex(["address", "street"])}
                    {formInputComplex(["address", "suite"])}
                    {formInputComplex(["address", "city"])}
                    {formInputComplex(["address", "zipcode"])}
                    {formInputComplex(["address", "geo", "lat"])}
                    {formInputComplex(["address", "geo", "lng"])}

                    {formInputComplex(["company", "name"])}
                    {formInputComplex(["company", "catchPhrase"])}
                    {formInputComplex(["company", "bs"])}
                </Form>
            </Modal>
        </Layout>
    )
}

export default LandingView
