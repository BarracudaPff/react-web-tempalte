import React, {FC, useState} from "react"
import "./style.scss"
import {Col, Drawer, Layout, Menu, Row, Typography} from "antd"
import Logo from "src/assets/img/icons/landing/logo-dark.svg"
import {Link} from "react-router-dom"
import {useWindowSize} from "src/utils/hooks"
import {isMobileW} from "src/utils"
import {LogoDark} from "src/components/icons"

const Header: FC = () => {
    const { width } = useWindowSize()
    const [expanded, showExpanded] = useState(false)

    const expand = () => showExpanded(true)
    const collapse = () => showExpanded(false)

    if (isMobileW(width)) {
        return (
            <Layout.Header className={"ld-page ld-h"} style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <Row className={"ld-h-m-nav"} align={"middle"} justify={"space-between"}>
                    <div className={"logo"}>
                        <LogoDark/>
                    </div>
                    <div onClick={expand}>
                        <Typography.Text>
                            Меню
                        </Typography.Text>
                    </div>
                </Row>
                <Drawer
                    closable={false}
                    placement={"left"}
                    onClose={collapse}
                    visible={expanded}
                    className={"ld-h-dr"}
                    headerStyle={{ display: "none" }}
                    key={"ld-nav-left"}>
                    <ul className={"ld-h-m-nav"}>
                        <li><Link onClick={collapse} to={"#main"} className={"ld-h-text"}>
                            Главная
                        </Link></li>
                        <li><Link onClick={collapse} to={"#us"} className={"ld-h-text"}>
                            Кто мы?
                        </Link></li>
                        <li><Link onClick={collapse} to={"#product"} className={"ld-h-text"}>
                            Продукт
                        </Link></li>
                        <li><Link onClick={collapse} to={"#contacts"} className={"ld-h-text"}>
                            Контакты
                        </Link></li>
                        <li><Link onClick={collapse} to={"/auth/signup"} className={"ld-h-text menu-auth-content"}>
                            Регистрация
                        </Link></li>
                        <li><Link onClick={collapse} to={"/auth/signin"} className={"ld-h-text menu-auth-content"}>
                            Вход
                        </Link></li>
                        {/*<li className={"ld-h-text menu-auth-content"}>Личный кабинет</li>*/}
                    </ul>
                </Drawer>
            </Layout.Header>
        )
    } else {
        return (
            <Layout.Header className={"ld-page ld-h"} style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <Row style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                    <Col span={14} style={{ backgroundColor: "black" }}/>
                    <Col span={10} style={{ backgroundColor: "white" }}/>
                </Row>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} items={[
                    { key: "1", label: <Link to={"/landing#main"}><Logo/></Link>, className: "hide-indicator" },
                    { key: "2", label: <Link to={"/landing#main"}>ГЛАВНАЯ</Link> },
                    { key: "3", label: <Link to={"/landing#us"}>КТО МЫ?</Link> },
                    { key: "4", label: <Link to={"/landing#product"}>ПРОДУКТ</Link> },
                    { key: "5", label: <Link to={"/landing#contacts"}>КОНТАКТЫ</Link> },

                    {
                        key: "6", style: { marginLeft: "auto" }, label: (
                            <Link to={"/auth/signup"}>
                                <Typography.Text className={"menu-auth-content"}>Регистрация</Typography.Text>
                            </Link>
                        )
                    },
                    {
                        key: "7", label: (
                            <Link to={"/auth/signin"}>
                                <Typography.Text className={"menu-auth-content-b"}>Войти</Typography.Text>
                            </Link>
                        )
                    },
                    // {
                    //     key: "8", label: (
                    //         <Link to={"admin"}>
                    //             <Typography.Text className={"menu-auth-content-b"}>Личный кабинет</Typography.Text>
                    //         </Link>
                    //     )
                    // },
                ]}/>
            </Layout.Header>
        )
    }
}

export default Header
