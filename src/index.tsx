import React, { Reducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './components/App/App'
import thunkMiddleware from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, Store } from "redux";
import combinedReducer, { ReduxState } from "./redux/combindedReducer";
import { Provider } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<ReduxState, any> = combinedReducer;

// @ts-ignore
const store: Store = createStore(reducer, applyMiddleware(thunkMiddleware));

const render = (Component: any): void => {
  return ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
