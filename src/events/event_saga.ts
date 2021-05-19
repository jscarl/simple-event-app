import {put, takeEvery, call, all} from 'redux-saga/effects';
import {getEvents} from './event_service';
import {EventActionTypes} from './event_types';

function* fetchingEvents() {
  try {
    const {data} = yield call(getEvents);
    yield put({type: EventActionTypes.FETCH_EVENT_SUCCESS, payload: data});
  } catch (error) {
    yield put({
      type: EventActionTypes.FETCH_EVENT_FAILED,
      payload: error.message,
    });
  }
}

function* watchFetchingEvents() {
  yield takeEvery(EventActionTypes.FETCH_EVENT_REQUEST, fetchingEvents);
}

export function* eventSaga() {
  yield all([watchFetchingEvents()]);
}
