import React, {FC, useState} from "react"
import {Avatar, Button, Col, Layout, Row, Space, Typography} from "antd"
import {useWindowSize} from "src/utils/hooks"
import Search from "antd/es/input/Search"
import {GeneralNotifications} from "src/components/icons"
import {AppstoreOutlined} from "@ant-design/icons"
import {DownloadOutlined} from "@ant-design/icons";


const AdminHeader: FC = () => {
    const { width } = useWindowSize()
    const [expanded, showExpanded] = useState(false)

    const expand = () => showExpanded(true)
    const collapse = () => showExpanded(false)

    return (
        <Layout.Header className="site-layout-background" style={{ padding: 0, height: 48 }}>
            {/*<Button icon={GeneralNotifications}/>*/}
            <Row justify={"space-between"}>
                <Col span={8}>
                    <Search placeholder="Search" enterButton/>
                </Col>
                <Col>
                    {/*<Space size={"middle"}>*/}
                    {/*    <Button type="primary" shape="circle" icon={<AppstoreOutlined />} />*/}
                    {/*    <div>*/}
                    {/*        <Avatar size={"small"}/>*/}
                    {/*        <Typography.Text>*/}

                    {/*        </Typography.Text>*/}
                    {/*    </div>*/}
                    {/*</Space>*/}
                </Col>
            </Row>

            {/*<Row>*/}
            {/*    <Col flex={"auto"}>*/}
            {/*        <Search placeholder="input search text" enterButton />*/}
            {/*        /!*<Search placeholder="input search text" onSearch={onSearch} enterButton />*!/*/}
            {/*        /!*<Search*!/*/}
            {/*        /!*    placeholder="input search text"*!/*/}
            {/*        /!*    allowClear*!/*/}
            {/*        /!*    enterButton="Search"*!/*/}
            {/*        /!*    size="large"*!/*/}
            {/*        /!*    onSearch={onSearch}*!/*/}
            {/*/>*/}
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

export default AdminHeader
