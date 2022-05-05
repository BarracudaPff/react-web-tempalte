import React, {FC, useState} from "react";
import {Layout} from "antd";
import Header from "src/components/header";
import Footer from "src/components/footer";
import {UserInfo} from "src/models/application/user";


const LoginView: FC = () => {
    const [data, setData] = useState<UserInfo[]>();

    return (
        <Layout>
            <Header />
            <Layout.Content className={"page"}>

            </Layout.Content>
            <Footer />
        </Layout>
    )
}

export default LoginView
