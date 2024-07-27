import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers'; // Adjust the import according to your project structure

const persistConfig = {
  key: 'root',
  storage,
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    // Add any middleware here, if necessary
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  });
  // @ts-ignore
  const persistor: Persistor = persistStore(store);
  return { store, persistor };
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>['store'];
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
