import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Dimensions } from 'react-native'
import React from "react";

const windowWidth = Dimensions.get('window').width

export default function SentMessageCard(props) {
    return (
        <View style={styles.container}>
            <View style={styles.messageView}>
                <Text numberOfLines={1}
                    style={styles.senderName}>
                    {props.name}
                </Text>
                <View style={styles.messageCard}>
                    <Text style={styles.messageText}>
                        {props.message}
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    messageCard: {
        backgroundColor: "#C6B4E7",
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        borderBottomLeftRadius: 24,
        padding: 8
    },

    messageText: {
        fontSize: 16,
    },

    messageView: {
        maxWidth: windowWidth * 0.65,
        padding: 8
    },

    senderName: {
        maxWidth: 100
    }
})