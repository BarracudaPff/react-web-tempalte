import * as React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import LandingView from "../src/views/index"
import {Provider} from "react-redux"
import store from "../src/redu/store"
import {sleep} from "../src/utils"
// import * as ReactDOM from 'react-dom';
// import * as TestUtils from 'react-dom/test-utils';

test("renders learn react link", async () => {
    // render(<LandingView />);

    render(
        <Provider store={store}>
            <Router>
                <LandingView/>
            </Router>
        </Provider>
    );

    const linkElement = screen.getByText(/sample text/i);
    expect(linkElement).toBeInTheDocument();

    await sleep(3000)
});
