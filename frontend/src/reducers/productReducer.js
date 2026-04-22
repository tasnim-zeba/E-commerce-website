import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    CLEAR_ERRORS,
} from "../constants/productConstants";

const productReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return { 
                loading: true,
                products: [],
             };
        case ALL_PRODUCTS_SUCCESS:
            return { 
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
             };
        case ALL_PRODUCTS_FAILURE:
            return { 
                loading: false,
                error: action.payload,
             };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

const productDetailsReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { 
                loading: true,
                ...state,
                };
        case PRODUCT_DETAILS_SUCCESS:
            return { 
                loading: false,
                product: action.payload,
             };
        case PRODUCT_DETAILS_FAILURE:  
            return { 
                loading: false,
                error: action.payload,
                };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};


export { productReducer, productDetailsReducer };
