import {GET_ABOUT_FOOTER, GET_DETAIL_FOOTER, GET_HOME_FOOTER, GET_PRODUCT_FOOTER} from "../types";

const initialState = {
    homeFooter: null,
    aboutFooter:null,
    productFooter:null,
    detailFooter:null
};

export const footersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOME_FOOTER:
            return {
                ...state,
                homeFooter: action.payload,
            };
        case GET_ABOUT_FOOTER:
            return {
                ...state,
                aboutFooter: action.payload
            }
        case GET_PRODUCT_FOOTER:
            return {
                ...state,
                productFooter: action.payload
            }
        case GET_DETAIL_FOOTER:
            return {
                ...state,
                detailFooter: action.payload
            }
        default:
            return state;
    }
};
