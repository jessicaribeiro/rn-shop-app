import React from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart';

const CartScreen = props => {
    const cartTotal = useSelector(state => state.cart.totalAmount); //vai buscar ao cart reducer
    const cartItems = useSelector(state => {
        const transformedCardItems = [];
        for (const key in state.cart.items) {
            transformedCardItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCardItems;
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text
                    style={styles.total}>${cartTotal.toFixed(2)}</Text>
                </Text>
                <Button title='Order Now' color={Colors.secondary}
                        onPress={() => {
                        }}
                        disabled={cartItems.length === 0}
                />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                    />
                }
            />
        </View>

    )
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    total: {
        color: Colors.third,
    }
});

export default CartScreen;