import { SafeAreaView, StyleSheet, ToastAndroid, View } from "react-native";

import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";

export default function RegisterPage({ navigation }) {

    const [userName, setUserName] = useState('')

    const navigateToChatPage = () => {
        if (userName != "") {
            navigation.navigate('ChatPage', { username: userName })
        }
        ToastAndroid.show("name field cannot be empty", ToastAndroid.SHORT)
    }

    return (
        <SafeAreaView style={styles.parentView}>
            <NameTextInput
                value={userName}
                onChangeText={text => setUserName(text)} />
            <RegisterButton onPress={navigateToChatPage} />
        </SafeAreaView>
    )
}

function NameTextInput(props) {

    return (
        <View style={styles.nameTextInputView}>
            <TextInput
                style={styles.nameTextInput}
                placeholder="Type name"
                value={props.value}
                onChangeText={text => props.onChangeText(text)}
                placeholderTextColor="#BFBFBF" />
        </View>
    )
}

function RegisterButton(props) {
    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <Button
                style={styles.registerButton}
                uppercase={false}
                onPress={props.onPress}
                color="#fff">
                <Text
                    style={{
                        fontSize: 14,
                        color: "#fff"
                    }}>
                    Register
                </Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    registerButton: {
        backgroundColor: "#6A4BBB",
        width: 150,
        elevation: 2,
        borderRadius: 32,
        marginTop: 8
    },

    nameTextInputView: {
        flexDirection: 'row',
        margin: 16
    },

    nameTextInput: {
        flex: 1,
        backgroundColor: "transparent"
    }
})