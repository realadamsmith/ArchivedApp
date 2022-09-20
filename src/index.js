import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store, persistor} from './Redux/createStore';
import { PersistGate } from 'redux-persist/integration/react';
// import {initialState, reducer} from './Redux/rootReducer'; //Remove initialState from Search
// import {StateProvider} from "./Redux/StateProvider"

ReactDOM.hydrate(
<React.StrictMode>
  <Provider store={store}>
    {/* <StateProvider reducer = {reducer}> */}
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    {/* </StateProvider> */}
  </Provider>

</React.StrictMode>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
