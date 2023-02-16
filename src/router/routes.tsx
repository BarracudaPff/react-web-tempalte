import React, {ReactNode, Suspense} from "react"
import {RouteObject, useRoutes} from "react-router-dom"
import PrivateRoute from "src/components/private-route";
import NoMatch from "src/components/exception";
import LoginView from "src/views/login";

// const LandingView = React.lazy(() => import("src/views/landing"))

const IndexView = React.lazy(() => import("src/views/index"))

export function MainRoutes() {
    const _Login = <PrivateRoute element={LoginView} meta={{
        title: "Log in"
    }} />

    const sus = (element: ReactNode) => (
        <Suspense fallback={"..."}>
            {element}
        </Suspense>
    )

    return useRoutes([
        {
            path: "/",
            element: sus(<IndexView />)
        },
        {
            path: "/login",
            element: _Login
        },
        {
            path: "*",
            element: (
                <div>
                    <PrivateRoute element={NoMatch} meta={{
                        requiresAuth: false,
                        title: "404 Not Found"
                    }} />
                </div>
            )
        }
    ])
}

