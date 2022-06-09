import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../banners/banner.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { useSelector, useDispatch } from "react-redux";
import { getHomeBannerThunk } from "../../store/actions/bannersActions";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@mui/icons-material/ArrowDropUpSharp';
import Swal from "sweetalert2";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HomeBanner = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const data = useSelector((state) => state.bannersReducer.homeBanner);
  const [currentId, setCurrentId] = useState(null);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [oneImg, setOneImg] = useState();
  const [twoImg, setTwoImg] = useState();
  const [thisImg, setThisImg] = useState(null);
  const [openSection,setOPenSection] = useState(false)

  useEffect(() => {
    dispatch(getHomeBannerThunk());
  }, []);

  //inputs values
  const [imgUrl, setImgUrl] = useState(null);
  const [titleHy, setTitleHy] = useState(data !== null && data.titleHy);
  const [titleRu, setTitleRu] = useState(data !== null && data.titleRu);
  const [titleEn, setTitleEn] = useState(data !== null && data.titleEn);
  const [subTitleHy, setSubTitleHy] = useState(
    data !== null && data.subTitleHy
  );
  const [subTitleRu, setSubTitleRu] = useState(
    data !== null && data.subTitleRu
  );
  const [subTitleEn, setSubTitleEn] = useState(
    data !== null && data.subTitleEn
  );

  const [realImages, setRealImages] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setRealImages(data !== null && data.image.split(","));
    setTitleHy(data !== null && data.titleHy);
    setTitleRu(data !== null && data.titleRu);
    setTitleEn(data !== null && data.titleEn);
    setSubTitleHy(data !== null && data.subTitleHy);
    setSubTitleRu(data !== null && data.subTitleRu);
    setSubTitleEn(data !== null && data.subTitleEn);
  }, [data]);

  const handleChangeTexts = () => {
    if (thisImg !== null) {
      axios
        .post(
          `${baseUrl}/homeBanner/edit`,
          {
            id: 1,
            titleHy,
            titleEn,
            titleRu,
            subTitleHy,
            subTitleRu,
            subTitleEn,
            image: data.image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succsess",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Swal.fire("wait!");
    }
  };

  const handleFile = (e) => {
    let files = [];
    Object.keys(e.target.files).map((f) => {
      if (f === "Length") return;
      files.push(e.target.files[0]);
    });
    uploadImage(files);
  };

  let arrOfImages = [];
  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "armcodingImage");
    formData.append("cloud_name", "armcoding");
    axios
      .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
      .then((res) => {
        arrOfImages.push(res.data.url);
        if (currentId == 1) {
          setOneImg(res.data.url);
        } else {
          setTwoImg(res.data.url);
        }
        setThisImg(res.data.url);
      });
  };

  const handleSubmit = () => {
    if (currentId == 1) {
      axios
        .post(
          `${baseUrl}/homeBanner/editImage`,
          {
            image: [oneImg, realImages[1]],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setOpen(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succsess",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(
          `${baseUrl}/homeBanner/editImage`,
          {
            image: [realImages[0], twoImg],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setOpen(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succsess",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Box m={3} className="infoBox">
      <h2 mt={3} mb={3}>
        Home Page Banner
      </h2>
      <Box>
        {
          openSection ? (
              <Button variant="outlined" color="secondary" onClick={()=>setOPenSection(!openSection)}>
                <ArrowDropUpSharpIcon/>
              </Button>
          ) : (
              <Button variant="outlined" color="secondary" onClick={()=>setOPenSection(!openSection)}>
              <ArrowDropDownSharpIcon/>
              </Button>)
        }
      </Box>
      { openSection ? (
      <Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Am" {...a11yProps(0)} />
            <Tab label="Ru" {...a11yProps(1)} />
            <Tab label="En" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h4>Title</h4>
          <TextField
            id="filled-basic"
            label="banner title"
            variant="filled"
            value={titleHy}
            onChange={(e) => setTitleHy(e.target.value)}
          />
          <h4>Subtitle</h4>
          <TextField
            id="filled-basic"
            label="banner subtitle"
            variant="filled"
            value={subTitleHy}
            onChange={(e) => setSubTitleHy(e.target.value)}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h4>Title</h4>
          <TextField
            id="filled-basic"
            label="banner title"
            variant="filled"
            value={titleRu}
            onChange={(e) => setTitleRu(e.target.value)}
          />
          <h4>Subtitle</h4>
          <TextField
            id="filled-basic"
            label="banner subtitle"
            variant="filled"
            value={subTitleRu}
            onChange={(e) => setSubTitleRu(e.target.value)}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h4>Title</h4>
          <TextField
            id="filled-basic"
            label="banner title"
            variant="filled"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
          />
          <h4>Subtitle</h4>
          <TextField
            id="filled-basic"
            label="banner subtitle"
            variant="filled"
            value={subTitleEn}
            onChange={(e) => setSubTitleEn(e.target.value)}
          />
        </TabPanel>
        <Button color="secondary" variant="contained" onClick={handleChangeTexts}>
          Submit
        </Button>
      </Box>
      <Box>
        <div>
          <img
            src={realImages && realImages[0]}
            alt="image"
            width={500}
            height={300}
            className="uploadedImage"
          />
          <br />
          <Button color="secondary"
            variant="contained"
            onClick={() => {
              setCurrentId(1);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <br />
        </div>
        <div>
          <img
            src={realImages && realImages[1]}
            alt="image"
            width={500}
            height={300}
            className="uploadedImage"
          />
          <br />
          <Button color="secondary"
            variant="contained"
            onClick={() => {
              setCurrentId(2);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <br />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Home Page Banner {`${currentId}`}
            </Typography>
            <div className="imageArea">
              <div>
                <div className="uploadBtns">
                  <Button color="secondary" variant="contained" component="label">
                    Upload
                    <input type="file" hidden multiple onChange={handleFile} />
                  </Button>
                </div>
                <div className="uploadBtns" m={2}>
                  <Button color="secondary" variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
              <div className="uploadImageAreaInModal">
                {thisImg !== null && (
                  <img src={thisImg} alt="newImage" width={300} height={200} />
                )}
              </div>
            </div>
          </Box>
        </Modal>
        </Box>
      </Box>):null}
    </Box>
  );
};

export default HomeBanner;
