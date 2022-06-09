import axios from "axios";
import { baseUrl, token } from "../../config/config";
import {GET_ORDERS} from "../types"

export const getOrdersThunk = (offset, limit) => {
    return async (dispatch) => {
      const response = await axios.get(`${baseUrl}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset,
          limit,
        },
      });
      dispatch({
        type: GET_ORDERS,
        payload: response.data,
      });
    };
  };