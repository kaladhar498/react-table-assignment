import { put, takeEvery, call } from "redux-saga/effects";
import {
  LOAD_USERS_ERROR,
  LOAD_USERS_LOADING,
  LOAD_USERS_SUCCESS,
} from "./actions";
import axios from "axios";

function* fetchUser({start, end}) {
  try {
    let users = yield call(axios.get, `http://localhost:3000/todos/?_start=${start}&_end=${end}`);
    console.log("asga",users.data)
    yield put({ type: LOAD_USERS_SUCCESS, data: users.data });
  } catch (error) {
    yield put({ type: LOAD_USERS_ERROR, message: error.message });
  }
}
export function* usersSaga() {
  // Allows concurrent fetches of users
  yield takeEvery(LOAD_USERS_LOADING, fetchUser);

  // Does not allow concurrent fetches of users
  // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
}

export default usersSaga;
