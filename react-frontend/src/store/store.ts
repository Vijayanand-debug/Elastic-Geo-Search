import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/features/location/locationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "location",
    storage,
}

const persistedReducer = persistReducer(persistConfig, locationReducer);

export const store = configureStore({
    reducer: {
        location: persistedReducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);