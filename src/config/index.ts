const { VITE_API_HTTP_BASE, VITE_API_IMG_HTTP_BASE, VITE_DEV, VITE_API_HTTP_TEST_TOKEN } = import.meta.env

const IS_DEV = VITE_DEV === "true"

// noinspection UnnecessaryLocalVariableJS,PointlessBooleanExpressionJS
export default {
    isProduction: !IS_DEV,
    isDevelopment: IS_DEV,

    logHttp: true && IS_DEV,
    logInput: true && IS_DEV,
    mockForms: true && IS_DEV,

    baseURL: "/",
    domainURL: IS_DEV ? "http://localhost:8080/" : null,

    title: "react-vite-typescript-starter",
    http: {
        testModeToken: VITE_API_HTTP_TEST_TOKEN,
        apiURL: VITE_API_HTTP_BASE,
        imgURL: VITE_API_IMG_HTTP_BASE ?? VITE_API_HTTP_BASE,
    }
};
