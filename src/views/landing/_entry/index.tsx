import React, {FC} from "react"
import "./style.scss"
import {Layout} from "antd"
import Header from "src/components/header"
import {Outlet} from "react-router-dom"
import Footer from "src/components/footer"

const LandingEntry: FC = () => {
    return (
        <Layout className={"ld"}>
            <Header/>
            <Layout.Content className={"ld-page ld-entry"}>
                <Outlet/>
            </Layout.Content>
            <Footer/>
        </Layout>
    )
}

export default LandingEntry
