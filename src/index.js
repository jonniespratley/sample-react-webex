import React from 'react';
import ReactDOM from 'react-dom';

//import '@webex/components/dist/css/webex-components.css';
import './index.css';

import AppSandbox from './AppSandbox';

const AppRoot = () => {
    return (<div>App ROot</div>)
}

ReactDOM.render(
  <React.StrictMode>
    <AppSandbox />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
