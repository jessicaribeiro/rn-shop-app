import React from "react";
import {FlatList, StyleSheet, Text} from "react-native";
import {useSelector} from "react-redux";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <OrderItem amount={itemData.item.totalAmount}
                           date={itemData.item.readableDate}
                           items={itemData.item.items}
                />}
        />
    )
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>),
    }
};

const styles = StyleSheet.create({});

export default OrdersScreen;
