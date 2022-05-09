// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"
// jest doesn't run in a browser we don't have fetch 🤡
import "isomorphic-unfetch"

process.env.VITE_HASURA_ADMIN_PASSWORD = "JEST_HASURA_ADMIN_PASSWORD"
process.env.VITE_HASURA_ENDPOINT = "JEST_HASURA_ENDPOINT"
process.env.VITE_API_HTTP_BASE = "https://my-json-server.typicode.com/BarracudaPff/jsonplaceholder"
process.env.VITE_API_IMG_HTTP_BASE = "https://my-json-server.typicode.com/BarracudaPff/jsonplaceholder"
process.env.VITE_API_HTTP_TEST_TOKEN = "123123"
process.env.VITE_DEV = "true"
