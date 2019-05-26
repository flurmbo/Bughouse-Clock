import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

declare let window: any;

const startApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}