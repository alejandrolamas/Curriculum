import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ReactGA from 'react-ga';

ReactGA.initialize('G-YGV4QPF6XH');
ReactGA.send('pageview');


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
