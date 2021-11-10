import { io } from "socket.io-client";
import { serverUrl } from "../../constants";
import { toggleSocketConnection, addNewMessage } from "../reducers/socketSlice";


const socket = io(serverUrl)

export default socketMiddleware = storeApi => next => action => {

    const onNewMessage = (msg) => {
        next(addNewMessage(msg))
    }

    const connectSocket = () => {
        next(toggleSocketConnection(true))
    }

    const disconnectSocket = () => {
        next(toggleSocketConnection(false))
    }



    if (action.type === "socket/subscribeSocketListeners") {
        connectSocket()
        socket.on('new message', onNewMessage)
        socket.connect()
    }


    if (action.type === "socket/disconnectSocket") {
        disconnectSocket()
        socket.disconnect()
        socket.removeListener('new message')
    }

    if (action.type === "socket/addNewMessage") {
        socket.emit('new message', action.payload)
    }

}