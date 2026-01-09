import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import * as authApi from "../api/authApi";
import * as authTypes from "./authTypes";
import storage from "src/utils/storageUtils";
import { push } from "redux-first-history";

/**
 * LOGIN
 */
function* handleLogin({ data, resolve, reject }) {
  try {
    const response = yield call(authApi.loginUser, data);
    const accessToken = response?.data?.accessToken;

    if (!accessToken) throw new Error("Token missing");

    storage.set("TOKEN", accessToken);
    storage.set("ROLE", "nurse");

    yield put(push("/nurse/dashboard"));
  } catch (err) {
    storage.del("TOKEN");
    storage.del("ROLE");
  }
}

/**
 * LOGOUT — ✅ CORRECT PLACE FOR REDIRECT
 */
function* handleLogout() {
  storage.del("TOKEN");
  storage.del("ROLE");
  storage.del("TENANT_HASH");

  // 🔥 EXACT ROUTE YOU WANT
  yield put(push("/auth/nurse/login"));
}

function* watchAuth() {
  yield takeLatest(authTypes.LOGIN, handleLogin);
  yield takeLatest(authTypes.LOGOUT, handleLogout);
}

export default function* authSaga() {
  yield all([fork(watchAuth)]);
}
