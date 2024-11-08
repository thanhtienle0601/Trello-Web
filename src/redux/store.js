//Redux: State management tool
import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from '~/redux/activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import { activeCardReducer } from './activeCard/activeCardSlice'

//Redux persist: To persist the state of the redux store
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { act } from 'react'

const rootPersistConfig = {
  key: 'root',
  storage: storage, // storage is the local storage
  whitelist: ['user'] // activeBoard is the only reducer that we want to persist
}

const Reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
}) // combine all the reducers

const persistedReducers = persistReducer(rootPersistConfig, Reducers) // create a persisted reducer

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
