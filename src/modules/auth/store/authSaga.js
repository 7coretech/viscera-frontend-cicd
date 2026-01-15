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
    const body = response || {};
    const accessToken = body?.accessToken || body?.data?.accessToken;
    const role = body?.user?.role || body?.role || data?.role || "nurse";

    if (!accessToken) throw new Error("Token missing");

    storage.set("TOKEN", accessToken);
    storage.set("ROLE", role);

    if (resolve) resolve(body);

    const target = role === "recruiter" ? "/recruiter/dashboard" : "/nurse/dashboard";
    yield put(push(target));
  } catch (err) {
    storage.del("TOKEN");
    storage.del("ROLE");
    if (reject) reject(err);
  }
}

/**
 * LOGOUT — ✅ CORRECT PLACE FOR REDIRECT
 */
function* handleLogout() {
  storage.del("TOKEN");
  const lastRole = storage.get?.("ROLE");
  storage.del("ROLE");
  storage.del("TENANT_HASH");

  const target = lastRole === "recruiter" ? "/auth/recruiter/login" : "/auth/nurse/login";
  yield put(push(target));
}

function* watchAuth() {
  yield takeLatest(authTypes.LOGIN, handleLogin);
  yield takeLatest(authTypes.LOGOUT, handleLogout);
}

export default function* authSaga() {
  yield all([fork(watchAuth)]);
}
