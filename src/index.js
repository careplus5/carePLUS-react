import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// BroswerRouter : 
import {BrowserRouter} from 'react-router-dom';
// // Provider : 리덕스 스토어를 리액트에 제공하기 위해 필요함
// import {Provider} from 'react-redux';
// // PersistGate : 리덕스 스토어 상태 유지시킴
// import{PersistGate} from 'redux-persist/integration/react';
// import {persistStore} from 'redux-persist';
// import store from './store';
// Provider : 리덕스 스토어를 리액트에 제공하기 위해 필요함
// PersistGate : 리덕스 스토어 상태 유지시킴
import './firebase-messaging-sw'; // firebase 설정 임포트

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Service Worker Registered with scope:', registration.scope);
  }).catch(function(err) {
    console.log('Service Worker registration failed:', err);
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
<App/>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();