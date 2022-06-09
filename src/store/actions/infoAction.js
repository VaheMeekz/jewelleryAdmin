import axios from "axios";
import { baseUrl } from "../../config/config";
import { GET_INFO } from "../types";

export const getInfoThunk = (offset, limit) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/contacts`);
    dispatch({
      type: GET_INFO,
      payload: response.data[0],
    });
  };
};
