import React, {useEffect} from "react";
import { Box } from "@mui/material";
import AboutBanner from "../bannerComponents/AboutUsBanner";
import HomeBanner from "../bannerComponents/HomeBanner";
import TermsBanner from "../bannerComponents/termsBanner";
import DeleveryBanner from "../bannerComponents/deleveryBanner";
import ProductBanner from "../bannerComponents/ProductBanner";
import WishBanner from "../bannerComponents/WishBanner";
import BasketBanner from "../bannerComponents/basketBanner";
import DetailBanner from "../bannerComponents/detailBanner";
import ContactUsBanner from "../bannerComponents/ContactUsBanner";

const Banners = () => {
    useEffect(()=>console.clear(),[])
  return (
    <Box m={3} className="boxHeigth">
      <h1 mt={3} mb={3}>
        Banners Settings
      </h1>
      <HomeBanner />
      <hr />
      <AboutBanner />
        <hr/>
        <ProductBanner/>
        <hr/>
        <DetailBanner/>
        <hr/>
        <WishBanner/>
        <hr/>
        <BasketBanner/>
        <hr/>
        <TermsBanner/>
        <hr/>
        <DeleveryBanner/>
        <hr/>
        <ContactUsBanner/>
    </Box>
  );
};

export default Banners;
