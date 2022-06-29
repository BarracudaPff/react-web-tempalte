import React, {FC} from "react"
import "./style.scss"
import {Layout} from "antd"
import {Outlet} from "react-router-dom"
import AdminHeader from "src/components/header/admin"
import Sider from "src/components/sider"

const AdminEntry: FC = () => {
    return (
        <Layout hasSider className={"admin-page admin-entry"}>
            <Sider/>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <AdminHeader/>
                <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    <Outlet/>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default AdminEntry
