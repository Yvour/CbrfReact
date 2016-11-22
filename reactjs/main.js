import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


import {Router, Route, browserHistory, Link} from 'react-router'


ReactDOM.render((
<Router history={browserHistory}>
  <Router path="/" component={App}/>
</Router>
)


, document.getElementById('app'));


                 
