import { configureStore } from '@reduxjs/toolkit'
import isLoadingContentSlice from './reducers/IsLoading'

const store = configureStore({
  reducer: {
    isLoadingContentSlice
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store