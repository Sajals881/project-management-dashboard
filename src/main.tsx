import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { App } from './App';
import './style.css';

const container = document.getElementById('app') as HTMLElement;
const root = ReactDOM.createRoot(container);

const basename = import.meta.env.BASE_URL.replace(/\/+$/, '');

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

