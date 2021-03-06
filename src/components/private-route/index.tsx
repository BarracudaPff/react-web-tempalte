import React, {FC} from "react"
import qs from "query-string"
import {Navigate, useLocation} from "react-router-dom"
import config from "src/config"
import {useSelector} from "src/redu/store";

type Props = {
    element: FC | React.ComponentClass
    meta?: Record<string, any>
}

const PrivateRoute: FC<Props> = ({element: Component, meta = {}, ...rest}) => {
    const {pathname, search} = useLocation()
    const {isLogin} = useSelector(it => it.user)
    const isLoginPage = pathname === "/" || pathname === "/signin"

    console.log({isLogin})

    React.useEffect(() => {
        if (meta.requiresAuth && !isLogin && !isLoginPage) return

        if (meta.title) {
            document.title = `${meta.title} - ${config.title}`
        } else {
            document.title = config.title
        }
    }, [meta])

    if (isLoginPage && isLogin) {
        const redirectUrl = qs.parse(search).redirectUrl as string
        const url = redirectUrl || ("/home/index" + search)
        return <Navigate to={url} replace/>
    }

    if (meta.requiresAuth) {
        if (isLogin) {
            // @ts-ignore
            return <Component {...rest} />
        } else {
            if (!isLoginPage) {
                return <Navigate to={`/auth/signin/?redirectUrl=${pathname}${search}`} replace/>
            }
        }
    }

    // @ts-ignore
    return <Component {...rest} />
}

export default PrivateRoute
