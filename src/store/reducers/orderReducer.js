import { GET_ORDERS } from "../types";

const initialState = {
  orders: null,
  count:null
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ORDERS:
          return {
              ...state,
              orders:action.payload.orders,
              count:action.payload.count
          }
    default:
      return state;
  }
};
