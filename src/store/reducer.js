import { combineReducers } from 'redux';
import AuthReducer from 'src/modules/auth/store/authReducer';
import AppReducer from 'src/modules/app/store/appReducer';

const createRootReducer = (routerReducer) =>
  combineReducers({
    router: routerReducer,
    app: AppReducer,
    auth: AuthReducer,
  });

export default createRootReducer;