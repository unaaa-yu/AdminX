import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || '',
        menu: JSON.parse(localStorage.getItem('menu') || '[]')
    },
    reducers: {
        setUserInfo: (state, { payload }) => {
            state.token = payload.token
            state.username = payload.username
            state.menu = payload.menu
            localStorage.setItem('token', payload.token)
            localStorage.setItem('username', payload.username)
            localStorage.setItem('menu', JSON.stringify(payload.menu))
        },
        clearUserInfo: (state) => {
            state.token = ''
            state.username = ''
            state.menu = []
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('menu')
        }
    }
})

export const { setUserInfo, clearUserInfo } = authSlice.actions
export default authSlice.reducer
