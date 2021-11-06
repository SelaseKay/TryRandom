import { FlatList, SafeAreaView, StyleSheet, View, ToastAndroid } from "react-native";
import { Appbar, FAB, TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux"
import { disconnectSocket, subscribeSocketListeners, addNewMessage } from "../redux/reducers/socketSlice";
import SentMessageCard from "./components/SentMessageCard";
import ReceivedMessageCard from "./components/ReceivedMessageCard";


export default function ChatPage({ route, navigation }) {

    const [message, setMessage] = useState('')

    const isConnected = useSelector(state => state.socket.isConnected)
    const chatMessages = useSelector(state => state.socket.chatMessages)

    console.log('chatmessages : ' + chatMessages)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(subscribeSocketListeners())
        console.log('socket callbacks subcribed')
        return () => {
            dispatch(disconnectSocket())
            console.log('socket cleans up')
        }
    }, [])


    const { username } = route.params


    function renderMessageItem({ item }) {
        if (item.username === username) {
            console.log('render message item in if block')
            return (
                <SentMessageCard
                    name={item.username}
                    message={item.message} />
            )
        }

        console.log('render item outside if block')
        return (
            <ReceivedMessageCard
                name={item.username}
                message={item.message} />
        )
    }

    const handleAddNewMessage = () => {
        if (message != "" && isConnected) {
            dispatch(addNewMessage({
                username: username,
                message: message
            }))
            setMessage('')
        }
        ToastAndroid.show("message field cannot be empty", ToastAndroid.SHORT)
    }

    return (
        <SafeAreaView style={styles.container}>
            <MyAppBar />
            <MessageList
                data={chatMessages}
                renderItem={renderMessageItem} />
            <MessageSender
                value={message}
                onChangeText={message => setMessage(message)}
                onPressSend={handleAddNewMessage} />
        </SafeAreaView>
    )
}


function MyAppBar() {
    return (
        <Appbar.Header
            style={styles.appbar}>
            <Appbar.Content title="Try Random" color="#fff" />
        </Appbar.Header>
    )
}

function MessageList(props) {
    return (
        <FlatList
            data={props.data}
            renderItem={props.renderItem}
            inverted={true}
            keyExtractor={(item, index) => index.toString()} />
    )
}

function MessageTextInput(props) {
    return (
        <TextInput
            style={styles.messageTextInput}
            underlineColor="#F2F2F2"
            multiline={true}
            numberOfLines={4}
            clearButtonMode='always'
            value={props.value}
            onChangeText={text => props.onChangeText(text)}
            selectionColor="#A991D5"
            activeUnderlineColor="#F2F2F2"
            placeholder="Type message"
            placeholderTextColor="#BFBFBF">

        </TextInput>
    )
}

function SendButton(props) {
    return (
        <FAB
            style={styles.fab}
            icon="send"
            onPress={props.onPress}
            small={false} />
    )
}

function MessageSender(props) {
    return (
        <View
            style={styles.messageSender}>
            <MessageTextInput
                value={props.value}
                onChangeText={text => props.onChangeText(text)} />
            <SendButton
                onPress={props.onPressSend} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    appbar: {
        backgroundColor: "#7935B0"
    },

    fab: {
        backgroundColor: "#2A72D7",
        height: 56,
        width: 56
    },

    messageSender: {
        flexDirection: 'row',
        padding: 8
    },

    messageTextInput: {
        flex: 2,
        height: 56,
        marginRight: 8,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        borderRadius: 32
    }
})