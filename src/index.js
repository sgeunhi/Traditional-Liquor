import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import {BallTriangle} from "react-loader-spinner";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <React.Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}><BallTriangle
        heigth="100"
        width="100"
        color="black"
        ariaLabel="loading-indicator"
      /></div>
    }>
      <App/>
    </React.Suspense>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


