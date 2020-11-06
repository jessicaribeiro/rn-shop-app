import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const CartItem = props => {
    return (
        <View style={styles.cardItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.text}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.text}>
                    ${props.amount.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.removeButton}>
                    <Ionicons
                        name='ios-trash'
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardItem: {
padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    removeButton: {
        marginLeft: 20,
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
});

export default CartItem;