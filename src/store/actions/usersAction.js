import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { GET_USERS } from "../types";

export const getCountriesThunk = (offset, limit,search) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        limit,
        search
      },
    });
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
};
