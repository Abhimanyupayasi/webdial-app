import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import App from './App'; // Your root component
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';

// Create a root element for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
