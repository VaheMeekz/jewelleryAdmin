import {GET_PRODUCTS} from "../types"


const initialState = {
    products: null,
    count: null,
  };
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
          products: action.payload.products,
          count: action.payload.count,
        };
      default:
        return state;
    }
  };