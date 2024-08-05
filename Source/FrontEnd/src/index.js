import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from "react-toastify";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import './index.css';
import App from './App';
/**
 * page changes router
 * add browser router wrap whole app in browser router to make available history and other all app
 */
window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <NotificationContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
