
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import NotFoundPage from "./components/NotFoundPage.tsx";
import MainTemplate from "./components/page-templates/MainTemplate.tsx";
import Dashboard from "./components/Dashboard.tsx";
import AccordionRoot from "./components/AccordionRoot/AccordionRoot.tsx";

import Chart from "./components/Chart.tsx";
import Swiper from "./components/swiper/Swiper.tsx";

import './index.css'
import React from "react";
// import App from './App.tsx'

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";

// this json object for routing:
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainTemplate />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/accordion",
        element: <AccordionRoot />
      },
      {
        path: "/chart",
        element: <Chart />
      },
      {
        path: "/swiper",
        element: <Swiper />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  },

])

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)

