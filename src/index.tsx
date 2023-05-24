import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom"
import store  from "./redux/store"
import { Provider } from "react-redux"
import App from './App';
import AppTest from './AppTest';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
     {/* <AppTest/> */}
     <App/>
    </BrowserRouter>
  </Provider>
);
