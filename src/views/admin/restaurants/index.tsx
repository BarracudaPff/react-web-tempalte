import React, {FunctionComponent} from "react";
import SubAdminHeader from "src/components/header/sub-admin"
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons"

interface Props {
}

const AdminRestaurantsView: FunctionComponent<Props> = (props) => {
    return (
        <>
            <SubAdminHeader title={"Заведения"}>
                <Button type="primary" icon={<PlusOutlined />} shape={"round"} size={"large"}>
                    Добавить ресторан
                </Button>
            </SubAdminHeader>
        </>
    );
};

export default AdminRestaurantsView;
