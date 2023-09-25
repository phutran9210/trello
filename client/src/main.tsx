import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./components/redux/store/store.ts";
import { Provider } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/locale/vi_VN';
import theme from "./helper/theme.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
  <CssVarsProvider theme={theme} >
  <CssBaseline />
    <Provider store={store}>
      <ConfigProvider locale={vi_VN}>
      <App />
      </ConfigProvider>
    </Provider>
    </CssVarsProvider>
  </BrowserRouter>
);
