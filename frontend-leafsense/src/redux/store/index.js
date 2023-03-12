import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from '../reducers';
// redux persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistconfig = {
  key: 'root',
  storage,
  whitelist: ['search', 'user'],
};

const persistedReducer = persistReducer(persistconfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

const persistor = persistStore(store);

export { store, persistor };
