import React, {ReactNode, Suspense} from "react"
import {Navigate, RouteObject, useRoutes} from "react-router-dom"
import PrivateRoute from "src/components/private-route";
import NoMatch from "src/components/exception";
import LoginView from "src/views/login";
import LandingEntry from "src/views/landing/_entry"
import LandingView from "src/views/landing/index"

// const LandingView = React.lazy(() => import("src/views/landing"))

const IndexView = React.lazy(() => import("src/views/index"))

export function MainRoutes() {
    const _Login = <PrivateRoute element={LoginView} meta={{
        title: "Log in"
    }}/>

    const sus = (element: ReactNode) => (
        <Suspense fallback={"..."}>
            {element}
        </Suspense>
    )

    const withIndex = (index: ReactNode, other: RouteObject[]): RouteObject[] => [
        { path: "index", element: sus(index) },
        { path: "", element: sus(index) },
        ...other
    ]

    return useRoutes([
        { path: "/", element: <Navigate to="/landing" replace/> },
        {
            path: "/landing",
            element: <LandingEntry/>,
            children: [
                { path: "", element: <LandingView/>, },
            ]
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
                    }}/>
                </div>
            )
        }
    ])
}

