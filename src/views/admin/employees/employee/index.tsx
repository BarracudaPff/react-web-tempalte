import React, {FunctionComponent, useEffect, useState} from "react";
import {Col, List, Result, Row, Segmented, Spin} from "antd"
import SubAdminHeader from "src/components/header/sub-admin"
import {User} from "src/models/application"
import {useNavigate, useParams} from "react-router-dom"
import {UserService} from "src/services/UserService"
import notification from "src/utils/notification"
import InfoSider from "src/components/sider/InfoSider"
import {useSearchParam} from "src/utils/hooks"
import {NumberParam, StringParam, withDefault} from "serialize-query-params"

interface Props {
}

const AdminEmployeeProfileView: FunctionComponent<Props> = (props) => {
    const nav = useNavigate()
    const params = useParams()
    const [user, setUser] = useState<User>();

    const [infoMode, setInfoMode] = useSearchParam("info", withDefault(StringParam, "tips"));

    useEffect(() => {
        if (!params.id) return

        UserService.getFullUser(params.id)
            .then(data => setUser(data))
            .catch(e => {
                notification.error({ message: "Не получилось получить данные пользователя" }, e)
                nav("/admin/employees")
            })
    }, []);

    if (!user) {
        return (
            <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Spin size={"large"}/>
            </div>
        )
    }

    if (!user.waiterInfo) {
        return (
            <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Result
                    status="error"
                    title="Не получилось найти все данные"
                    subTitle="Перезагрузите страницу или напишите в службу поддержки."/>
            </div>
        )
    }

    return (
        <>
            <SubAdminHeader title={"Профиль - " + user.waiterInfo.firstName}>
            </SubAdminHeader>
            <Row gutter={16}>
                <Col>
                    <InfoSider user={user}/>
                </Col>
                <Col flex={"auto"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Segmented
                        block
                        style={{ width: "100%" }}
                        defaultValue={infoMode}
                        onChange={(it) => setInfoMode(it as string)}
                        options={[
                            { value: "tips", label: "Чаевые" },
                            { value: "payouts", label: "Выплаты" },
                        ]}/>
                    {infoMode == "tips" && <List dataSource={user.tips} renderItem={(item) => (
                        <List.Item>
                        {/*TODO: show tips*/}
                        </List.Item>
                    )}/>}
                    {infoMode == "payouts" && <List dataSource={user.tips} renderItem={(item) => (
                        <List.Item>
                            {/*TODO: show payouts*/}
                        </List.Item>
                    )}/>}
                </Col>
            </Row>
        </>
    );
};

export default AdminEmployeeProfileView;
