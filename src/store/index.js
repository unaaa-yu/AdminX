import { configureStore } from '@reduxjs/toolkit'
import TabReducer from './reducer/tab'
import AuthReducer from './reducer/auth'

const store = configureStore({
    reducer: {
        tab: TabReducer,
        auth: AuthReducer
    }
})

export default store