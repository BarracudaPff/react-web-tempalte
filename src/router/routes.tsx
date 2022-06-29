import React, {ReactNode, Suspense} from "react"
import {Navigate, RouteObject, useRoutes} from "react-router-dom"
import PrivateRoute from "src/components/private-route";
import NoMatch from "src/components/exception";
import LoginView from "src/views/login";
import LandingEntry from "src/views/landing/_entry"
import LandingView from "src/views/landing/index"
import AuthSignInView from "src/views/auth/signin"
import AuthSignUpView from "src/views/auth/signup";
import AdminEntry from "src/views/admin/_entry"
import {NavToAdmin} from "src/components/nav"
import AdminRestaurantsView from "src/views/admin/restaurants"
import AdminProfileView from "src/views/admin/profile"

// const LandingView = React.lazy(() => import("src/views/landing"))

// const IndexView = React.lazy(() => import("src/views/index"))

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
            path: "/auth",
            element: <LandingEntry/>,
            children: [
                { path: "", element: <Navigate to="signin" replace/>, },
                { path: "signin", element: <AuthSignInView/>, },
                { path: "signup", element: <AuthSignUpView/>, },
            ]
        },
        {
            path: "/admin",
            element: <AdminEntry/>,
            children: [
                { path: "", element: <NavToAdmin/>, },
                {
                    path: "profile", element: <PrivateRoute element={AdminProfileView} meta={{
                        requiresAuth: true,
                        title: "Профиль"
                    }}/>,
                },
                {
                    path: "restaurants", element: <PrivateRoute element={AdminRestaurantsView} meta={{
                        requiresAuth: true,
                        title: "Рестораны"
                    }}/>,
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
            ]
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

