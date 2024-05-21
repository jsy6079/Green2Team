import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>
);

axios.get('/api/csrf').then(res => {
  const csrf = res.data;
  axios.defaults.headers.post[csrf.headerName] = csrf.token;
  axios.defaults.headers.put[csrf.headerName] = csrf.token;
  axios.defaults.headers.delete[csrf.headerName] = csrf.token;
  // return axios.post('/api/user');
})
// .then(res => {
  // const userdata = res.data;
  // // console.log(userdata.role);
  // axios.defaults.headers.post['username'] = userdata.username;
  // axios.defaults.headers.put['username'] = userdata.username;
  // axios.defaults.headers.delete['username'] = userdata.username;
  // axios.defaults.headers.post['role'] = userdata.role;
  // axios.defaults.headers.put['role'] = userdata.role;
  // axios.defaults.headers.delete['role'] = userdata.role;
// })
.catch(error => {
    // 오류 처리
    console.error("요청 실패:", error);
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
