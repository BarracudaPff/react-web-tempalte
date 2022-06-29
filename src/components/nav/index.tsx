import React, {FunctionComponent} from "react";
import {Navigate, useLocation} from "react-router-dom"
import {useSelector} from "src/redu/store"

interface Props {
}

export const NavToAdmin: FunctionComponent = (props) => {
    const { pathname, search } = useLocation()
    const { isLogin, user } = useSelector(it => it.user)

    if (!isLogin || !user) {
        return (
            <Navigate to={`/auth/signin/?redirectUrl=${pathname}${search}`} replace/>
        );
    } else {
        return (
            <Navigate to={user.adminInitUri()} replace/>
        );
    }
};
