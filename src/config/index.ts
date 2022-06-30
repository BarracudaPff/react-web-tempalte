const { VITE_API_HTTP_BASE, VITE_API_IMG_HTTP_BASE, VITE_DEV, VITE_API_HTTP_TEST_TOKEN } = import.meta.env

const IS_DEV = VITE_DEV === "true"
const IS_PROD = !IS_DEV

// noinspection UnnecessaryLocalVariableJS,PointlessBooleanExpressionJS
export default {
    isProduction: IS_PROD,
    isDevelopment: IS_DEV,

    uiDebug: false || IS_PROD,

    logHttp: true && IS_DEV,
    logInput: true && IS_DEV,
    mockForms: true && IS_DEV,

    baseURL: "/",
    domainURL: IS_DEV ? "http://localhost:8080/" : "https://premiertips.org/",

    title: "Premier Tips",
    http: {
        testModeToken: VITE_API_HTTP_TEST_TOKEN,
        apiURL: VITE_API_HTTP_BASE,
        imgURL: VITE_API_IMG_HTTP_BASE ?? VITE_API_HTTP_BASE,
    },
    debugPhoneNumber: IS_DEV ? "+79112256565" : undefined,
    debugPhoneCode: IS_DEV ? "123456" : undefined
};
