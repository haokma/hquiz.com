// scroll bar
import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/src/simplebar.css';
//
import App from './App';
import store from './app/store';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { history } from './utils/history';
// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
        <ToastContainer />
      </ConnectedRouter>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
