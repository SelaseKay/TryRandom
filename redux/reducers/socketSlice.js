import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    chatMessages: [],
    isConnected: true
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState: INITIAL_STATE,
    reducers:{
        toggleSocketConnection(state, action){
            state.isConnected = action.payload
            console.log('isConnected :' + action.payload)
        },
        addNewMessage(state, action){
            state.chatMessages.unshift(action.payload)
        },
        subscribeSocketListeners(state, action){
            console.log('subscription done')
        },
        disconnectSocket(state, action){
            console.log('socket disconnected')
        }
    }
})

export const {toggleSocketConnection, subscribeSocketListeners, disconnectSocket, addNewMessage} = socketSlice.actions

export default socketSlice.reducer