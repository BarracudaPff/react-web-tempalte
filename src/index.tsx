import * as React from "react"
import {render} from "react-dom"

import "src/assets/styles/main.less"
import "src/assets/styles/main.scss"

import {ConfigProvider} from "antd"
import ru_RU from "antd/lib/locale-provider/ru_RU"

import {Provider} from "react-redux"
import store from "./redu/store"
import AppRoute from "./router"

render(
    // <React.StrictMode>
    <Provider store={store}>
        <ConfigProvider locale={ru_RU}>
            <AppRoute />
        </ConfigProvider>
    </Provider>
    // </React.StrictMode>
    ,
    document.getElementById("root")
)
