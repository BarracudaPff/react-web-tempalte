import * as React from "react"

import "src/assets/styles/main.scss"

import {ConfigProvider} from "antd"
import ru_RU from 'antd/locale/ru_RU'

import {Provider} from "react-redux"
import store from "./redu/store"
import AppRoute from "./router"
import {createRoot} from "react-dom/client"

createRoot(document.getElementById("root")!!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={ru_RU}>
        <AppRoute/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
