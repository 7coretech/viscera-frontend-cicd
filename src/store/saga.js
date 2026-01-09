import { all } from 'redux-saga/effects';
import AuthSagas from 'src/modules/auth/store/authSaga';
import AppSagas from 'src/modules/app/store/appSaga';

function* rootSaga() {
  yield all([
    AuthSagas(),
    AppSagas(),
  ]);
}

export default rootSaga;

