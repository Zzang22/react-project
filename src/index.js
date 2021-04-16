import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import {Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';

import Reducer from './Reducer';

let alert초기값 = true;

function reducer2(state = alert초기값, 액션){
  if( 액션.type === '변경'){
    return state = false;
  }else{
  return state;
  }
}

let store = createStore(combineReducers({Reducer, reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

