import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, useSelector } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store, { history } from 'src/store';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
console.log("added test console");
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("testing");
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <React.Suspense>
          <App />
        </React.Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
