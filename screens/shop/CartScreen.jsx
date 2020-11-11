import React from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import OrdersScreen from "./OrdersScreen";
import Card from "../../components/UI/Card";

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
        return transformedCardItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.total}>${Math.round(cartTotal.toFixed(2) * 100) / 100 }</Text>
                </Text>
                <Button title='Order Now' color={Colors.secondary}
                        onPress={() => {
                            dispatch(ordersActions.addOrder(cartItems, cartTotal));
                        }}
                        disabled={cartItems.length === 0}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                    />
                }
            />
        </View>
    )
};

CartScreen.navigationOtions = {
    headerTitle: 'Your Cart',
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