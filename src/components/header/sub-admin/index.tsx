import React, {FC, useState} from "react"
import {Avatar, Button, Col, Layout, Row, Space, Typography} from "antd"
import {useWindowSize} from "src/utils/hooks"
import Search from "antd/es/input/Search"
import {GeneralNotifications} from "src/components/icons"

interface Props {
    title: string
}

const SubAdminHeader: FC<Props> = (props) => {
    const { width } = useWindowSize()
    const [expanded, showExpanded] = useState(false)

    const expand = () => showExpanded(true)
    const collapse = () => showExpanded(false)

    return (
        <Layout.Header className="site-layout-background" style={{ padding: 0, marginTop: 48 }}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Typography.Title>
                    {props.title}
                </Typography.Title>
                <div>
                    {props.children}
                </div>
            </div>
            {/*<Row>*/}
            {/*    <Col flex={"auto"}>*/}
            {/*        <Search placeholder="input search text" />*/}
            {/*    </Col>*/}
            {/*    <Col>*/}
            {/*        <Space size={"middle"}>*/}
            {/*            <Button icon={<GeneralNotifications/>}/>*/}
            {/*            <div>*/}
            {/*                <Avatar size={"small"}/>*/}
            {/*                <Typography.Text>*/}

            {/*                </Typography.Text>*/}
            {/*            </div>*/}
            {/*        </Space>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Layout.Header>
    )
}

export default SubAdminHeader
