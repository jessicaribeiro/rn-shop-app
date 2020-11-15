export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return {type: DELETE_PRODUCT, pid: productId}
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

        console.log(responseData);


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
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl,
        }
    }
};