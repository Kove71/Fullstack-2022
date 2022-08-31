import { createSlice } from '@reduxjs/toolkit'

let timer
const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return state = action.payload
        },
        notificationReset(state, action) {
            return state = null
        }
    }
})

export const { notificationChange, notificationReset } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(notificationChange(message))
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(notificationReset())
        }, time * 1000)
    }
}
export default notificationSlice.reducer