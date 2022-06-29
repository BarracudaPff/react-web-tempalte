import React, {FC, useState} from "react"
import {Avatar, Button, Col, Layout, Row, Space, Typography} from "antd"
import {useWindowSize} from "src/utils/hooks"
import Search from "antd/es/input/Search"
import {GeneralNotifications} from "src/components/icons"


const SubAdminHeader: FC = () => {
    const { width } = useWindowSize()
    const [expanded, showExpanded] = useState(false)

    const expand = () => showExpanded(true)
    const collapse = () => showExpanded(false)

    return (
        <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
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
