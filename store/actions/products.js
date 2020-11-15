import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => { //redux thunk
        try {
            //async code here
            const response = await fetch('https://rn-shop-app-38752.firebaseio.com/products.json', { //url firebase + folder,  fetch sends request
                // default is get request
            });

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json();

            const loadedProducts = [];

            for (const key in responseData) {
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
                        responseData[key].title,
                        responseData[key].imageUrl,
                        responseData[key].description,
                        responseData[key].price
                    ))
            }

            dispatch({type: SET_PRODUCTS, products: loadedProducts});
        } catch (error) {
            throw error;
        }
    };
};

export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(
            `https://rn-shop-app-38752.firebaseio.com/products/${productId}.json`, { //url firebase + folder,  fetch sends request
                method: 'DELETE',
            });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({type: DELETE_PRODUCT, pid: productId});
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => { //redux thunk
        //async code here
        const response = await fetch('https://rn-shop-app-38752.firebaseio.com/products.json', { //url firebase + folder,  fetch sends request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            }) // do not send id! firebase will generate one
        });

        const responseData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: responseData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price,
            }
        });
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        const response = await fetch(
            `https://rn-shop-app-38752.firebaseio.com/products/${id}.json`, { //url firebase + folder + id,  fetch sends request
                method: 'PATCH', //update in the place we tell to update
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                })
            });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title: title,
                description: description,
                imageUrl: imageUrl,
            }
        });
    };
};