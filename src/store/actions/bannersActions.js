import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  GET_HOME_BANNER,
  GET_ABOUT_US_BANNER,
  GET_TERMS_BANNER,
  GET_DELEVERY_BANNER,
  GET_PRODUCT_BANNER, GET_WISH_BANNER, GET_BASKET_BANNER, GET_DETAIL_BANNER, GET_CONTACT_US_BANNER
} from "../types";

export const getHomeBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/homeBanner`);
    dispatch({
      type: GET_HOME_BANNER,
      payload: response.data[0],
    });
  };
};


export const getAboutUsBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/aboutUsBanner`);
    dispatch({
      type:GET_ABOUT_US_BANNER,
      payload:response.data[0]
    })
  }
}
export const getTermsBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/terms`);
    dispatch({
      type:GET_TERMS_BANNER,
      payload:response.data[0]
    })
  }
}

export const getDeleveryBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/delevery`);
    dispatch({
      type:GET_DELEVERY_BANNER,
      payload:response.data[0]
    })
  }
}

export const getProductBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/productBanner`);
    dispatch({
      type:GET_PRODUCT_BANNER,
      payload:response.data[0]
    })
  }
}

export const getWishBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/wishBanner`);
    dispatch({
      type:GET_WISH_BANNER,
      payload:response.data[0]
    })
  }
}

export const getBannerBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/basketBanner`);
    dispatch({
      type:GET_BASKET_BANNER,
      payload:response.data[0]
    })
  }
}

export const getDetailBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/detailBanner`);
    dispatch({
      type:GET_DETAIL_BANNER,
      payload:response.data[0]
    })
  }
}
export const getContactUsBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/contactUsBanner`);
    dispatch({
      type:GET_CONTACT_US_BANNER,
      payload:response.data[0]
    })
  }
}





