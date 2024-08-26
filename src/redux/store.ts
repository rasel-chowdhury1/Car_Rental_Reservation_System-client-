import { configureStore } from '@reduxjs/toolkit'
import CarListingReducer from './features/CarListing/CarListingSlice'

export const store = configureStore({
  reducer: {
    CarListingReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch