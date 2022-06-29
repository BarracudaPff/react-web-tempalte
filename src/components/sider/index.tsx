import React, {FunctionComponent} from "react";
import {Layout, Menu, MenuProps} from "antd"
import {AppstoreOutlined} from "@ant-design/icons"

const items: MenuProps["items"] = [
    { key: "restaurants", icon: <AppstoreOutlined/>, label: "Заведения" },
    { key: "employees", icon: <AppstoreOutlined/>, label: "Сотрудники" },
    { key: "teams", icon: <AppstoreOutlined/>, label: "Команды" },
    { key: "customisation", icon: <AppstoreOutlined/>, label: "Кастомизация" },
    { key: "profile", icon: <AppstoreOutlined/>, label: "Профиль" },
    { key: "instruction", icon: <AppstoreOutlined/>, label: "Инструкция" },
    { key: "help", icon: <AppstoreOutlined/>, label: "Помогите 🙏" },
    { key: "logout", icon: <AppstoreOutlined/>, label: "Выйти" },
]

interface Props {
}

const Sider: FunctionComponent<Props> = (props) => {

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
            <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]} items={items}/>
        </Layout.Sider>
    );
};

export default Sider;
