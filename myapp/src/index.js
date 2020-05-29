import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import history from './history';
import reducers from './store/reducers';
import Game from './main/Game';
import Home from './main/Home';
import Error_404 from './main/errors/Error_404';
import './styles/index.css';

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/play/:id" component={Game}></Route>
        <Route path="/error_404" component={Error_404} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
)