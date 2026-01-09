import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducer';
import { createLogger } from 'redux-logger';
import rootSaga from './saga';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const rootReducer = createRootReducer(routerReducer);

const logger = createLogger({
  collapsed: true,
});

let middlewares;
const sagaMiddleware = createSagaMiddleware();
if (process.env.NODE_ENV === 'development') {
  middlewares = [sagaMiddleware, routerMiddleware, logger];
} else {
  middlewares = [sagaMiddleware, routerMiddleware];
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
});

sagaMiddleware.run(rootSaga);


export const history = createReduxHistory(store);
export default store;

