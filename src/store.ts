// @ts-ignore
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {IEventState} from './events/event_types';
import {eventReducer} from './events/event_reducer';
import {eventSaga} from './events/event_saga';
// import {configureStore} from '@reduxjs/toolkit';

export interface IAppState {
  eventReducer: IEventState;
}

const rootReducer = combineReducers<IAppState>({
  eventReducer: eventReducer,
});

// @ts-ignore
// const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
// const middlewares = [thunk, sagaMiddleware, logger];
// const middlewareEnchancer = applyMiddleware(...middlewares);
// const enhancers = [middlewareEnchancer];
// const composedEnhancers = compose();
// const store: Store<IAppState, any> = createStore(
//   rootReducer,
//   withDevTools(applyMiddleware(...middleware)),
// );

// sagaMiddleware.run(eventSage);

// const store = configureStore({reducer: rootReducer});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(eventSaga);

export default store;
