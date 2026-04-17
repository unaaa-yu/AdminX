import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false,
    },
    reducers: {
        collapsePanel: state => {
            state.isCollapse = !state.isCollapse
        }
    }
})

export const { collapsePanel } = tabSlice.actions
export default tabSlice.reducer