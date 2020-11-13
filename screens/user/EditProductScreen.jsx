import React, {useCallback, useEffect, useState, useReducer} from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    View,
    KeyboardAvoidingView, //keyboard dont overlap fields
} from "react-native";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

const FORM_UPDATE = 'FORM_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};

import * as productsActions from '../../store/actions/products';
import Input from "../../components/UI/Input";

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: { //initial states values
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: { //validators
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        fromIsValid: editedProduct ? true : false
    });

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [isTitleValid, setIsTitleValid] = useState(false);
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{text: 'OK'}]);
            return;
        }
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
        } else {
            dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({'submit': submitHandler})
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            inputField: inputIdentifier
        })
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={100}
            style={{flex: 1}}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title.'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image Url'
                        errorText='Please enter a valid image url.'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : ( //if add mode render price, cant edit price on editing mode
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter a valid price.'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description.'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        onInputChange={inputChangeHandler}
                        numberOfLines={3}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLenght={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    iconName='ios-checkmark'
                    onPress={submitFunction}
                />
            </HeaderButtons>),
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
});

export default EditProductScreen;