import React, {FunctionComponent, useEffect, useState} from "react";
import {Result, Spin, Typography} from "antd"
import SubAdminHeader from "src/components/header/sub-admin"
import {User} from "src/models/application"
import {useNavigate, useParams} from "react-router-dom"
import {UserService} from "src/services/UserService"
import notification from "src/utils/notification"
import InfoSider from "src/components/sider/InfoSider"

interface Props {
}

const AdminEmployeeProfileView: FunctionComponent<Props> = (props) => {
    const nav = useNavigate()
    const params = useParams()
    const [user, setUser] = useState<User>();

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
            <div>
                <InfoSider user={user}/>
            </div>
        </>
    );
};

export default AdminEmployeeProfileView;
