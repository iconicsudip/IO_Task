import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import mainReducers from './reducers/index'
import {Provider} from 'react-redux'

const data = JSON.parse(localStorage.getItem("demoData"))
const demoData = {
  users : data?data.users:[],
  movies : data?data.movies:[],
  actors : data?data.actors:[],
  producers : data?data.producers:[],
  userid:data?data.userid:null
}
localStorage.setItem("demoData",JSON.stringify(demoData))
let mystore = createStore(
  mainReducers,demoData,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//ACTION

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={mystore}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

