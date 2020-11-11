import React from "react";
import {Alert, Button, FlatList, StyleSheet} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {productId: id})
    };

    const deleteHandler = (id) => {
        dispatch(productsActions.deleteProduct(id));
        // return (Alert.alert('Are you sure you want to delete this item?', [
        //         {text: 'No', style: 'default'},
        //         {
        //             text: 'Yes', style: 'destructive', onPress: () => {
        //                 dispatch(productsActions.deleteProduct(id))
        //             }
        //         }
        //     ])
        // )
    };


    return (
        <FlatList
            data={userProducts}
            renderItem={
                itemData =>
                    <ProductItem
                        title={itemData.item.title}
                        price={itemData.item.price}
                        image={itemData.item.imageUrl}
                        onSelect={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                editProductHandler(itemData.item.id)
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title="Delete"
                            onPress={() => deleteHandler(itemData.item.id)}
                        />
                    </ProductItem>
            }
            keyExtractor={item => item.id}
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add'
                    iconName='ios-create'
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>),
    }
};

const styles = StyleSheet.create({});

export default UserProductsScreen;