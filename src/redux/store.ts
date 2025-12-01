import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import applicationReducer from './slices/Application';

const reducer = combineReducers({
  application: applicationReducer,
});

export function getStoreWithState(preloadedState?: RootState): any {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
}
export const store = getStoreWithState();
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
