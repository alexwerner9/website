import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Homepage } from './Homepage/Homepage';
import { Games } from './Games/Games';
import 'semantic-ui-css/semantic.min.css'
import "./index.css";
import { Wordstreak } from './Games/Wordstreak';
import { Geodistance } from './Games/Geodistance';
import { About } from './About/About';

const router = createHashRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/games",
    element: <Games />
  },
  {
    path: "/games/wordstreak",
    element: <Wordstreak />
  },
  {
    path: "/games/geodistance",
    element: <Geodistance />
  },
  {
    path: "/about",
    element: <About />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
