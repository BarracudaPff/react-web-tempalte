import React, {FC} from "react";
import {Layout} from "antd";
import Header from "src/components/header";
import Footer from "src/components/footer";

const LoginView: FC = () => {
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
