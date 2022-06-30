import React, {FunctionComponent} from "react";
import {Layout, Menu, MenuProps} from "antd"
import {AppstoreOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom"

const items: MenuProps["items"] = [
    { key: "/admin/restaurants", icon: <AppstoreOutlined/>, label: "Заведения" },
    { key: "/admin/employees", icon: <AppstoreOutlined/>, label: "Сотрудники" },
    { key: "/admin/teams", icon: <AppstoreOutlined/>, label: "Команды" },
    { key: "/admin/customisation", icon: <AppstoreOutlined/>, label: "Кастомизация" },
    { key: "/admin/profile", icon: <AppstoreOutlined/>, label: "Профиль" },
    { key: "/admin/instruction", icon: <AppstoreOutlined/>, label: "Инструкция" },
    { key: "/admin/help", icon: <AppstoreOutlined/>, label: "Помогите 🙏" },
    { key: "/admin/logout", icon: <AppstoreOutlined/>, label: "Выйти" },
]

interface Props {
}

const Sider: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <Layout.Sider
            theme={"light"}
            style={{
                overflow: "auto",
                // height: "100vh",
                position: "fixed",
                left: 20,
                top: 20,
                bottom: 35,
                borderRadius: 24
            }}>
            <div className="logo"/>
            <Menu theme="light" mode="inline" onClick={({ key }) => navigate(key)} items={items}/>
        </Layout.Sider>
    );
};

export default Sider;
