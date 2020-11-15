import Product from "../../models/product";
import {SET_PRODUCTS} from "./products";
import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            //async code here
            const response = await fetch('https://rn-shop-app-38752.firebaseio.com/orders/u1.json', { //url firebase + folder + user,  fetch sends request
                // default is get request
            });

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json();

            const loadedOrders = [];

            for (const key in responseData) {
                loadedOrders.push(
                    new Order(
                        key,
                        responseData[key].cartItems,
                        responseData[key].totalAmount,
                        new Date(responseData[key].date) // we need a date object an not a date string
                    ))
            }
            dispatch({type: SET_ORDERS, orders: loadedOrders})
        } catch (error) {
            throw error;
        }
    };
};

export const addOrder = (cartItems, totalAmount) => {
    const date = new Date();
    return async dispatch => {
        const response = await fetch('https://rn-shop-app-38752.firebaseio.com/orders/u1.json', { //url firebase + folder,  fetch sends request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString(),
            }) // do not send id! firebase will generate one
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: responseData.name, // id from firebase
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    };
};

