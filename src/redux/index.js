import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/user.reducer';

const middleware = [thunk];

const store = createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
