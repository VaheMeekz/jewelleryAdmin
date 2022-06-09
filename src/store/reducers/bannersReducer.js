import {
    GET_HOME_BANNER,
    GET_ABOUT_US_BANNER,
    GET_TERMS_BANNER,
    GET_DELEVERY_BANNER,
    GET_PRODUCT_BANNER, GET_WISH_BANNER, GET_BASKET_BANNER, GET_DETAIL_BANNER, GET_CONTACT_US_BANNER
} from "../types";

const initialState = {
    homeBanner: null,
    aboutBanner: null,
    terms: null,
    delevery: null,
    product: null,
    wish:null,
    basket:null,
    detail:null,
    contactUs:null
};

export const bannersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOME_BANNER:
            return {
                ...state,
                homeBanner: action.payload,
            };
        case GET_CONTACT_US_BANNER:
            return {
                ...state,
                contactUs:action.payload
            }
        case GET_ABOUT_US_BANNER:
            return {
                ...state,
                aboutBanner: action.payload,
            };
        case GET_TERMS_BANNER:
            return {
                ...state,
                terms: action.payload
            }
        case GET_DELEVERY_BANNER:
            return {
                ...state,
                delevery: action.payload
            }
        case GET_PRODUCT_BANNER:
            return {
                ...state,
                product: action.payload
            }
        case GET_WISH_BANNER:
            return {
                ...state,
                wish:action.payload
            }
        case GET_BASKET_BANNER:
            return {
                ...state,
                basket: action.payload
            }
        case GET_DETAIL_BANNER:
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
};
