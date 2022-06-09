import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    getAboutUsInfoThunk,
    getAboutUsThunk,
} from "../../store/actions/aboutUsAction";
import "./aboutUs.scss";
import {baseUrl, token} from "../../config/config";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import AboutUsInfo from "./AboutUsInfo";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
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


const AboutUs = () => {
    const dispatch = useDispatch();
    const aboutUsData = useSelector((state) => state?.aboutUsReducer.aboutUs);
    const aboutUsInfo = useSelector((state) => state.aboutUsReducer.aboutUsInfo);
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState({});
    const [images, setImages] = useState(null)
    const [rend, setRend] = useState(false);
    const [open, setOpen] = useState(false);
    const [thisImg, setThisImg] = useState(null);
    //values
    const [titleHy, setTitleHy] = useState("");
    const [titleRu, setTitleRu] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [subTitleHy, setSubTitleHy] = useState("");
    const [subTitleRu, setSubTitleRu] = useState("");
    const [subTitleEn, setSubTitleEn] = useState("");
    const [cuurentId,setCurrentId] = useState(null)
    //
    useEffect(() => {
        dispatch(getAboutUsThunk());
        dispatch(getAboutUsInfoThunk());
    }, [rend]);

    useEffect(() => {
        setTitleHy(aboutUsData && aboutUsData.titleHy);
        setTitleRu(aboutUsData && aboutUsData.titleRu);
        setTitleEn(aboutUsData && aboutUsData.titleEn);
        setSubTitleHy(aboutUsData && aboutUsData.textHy);
        setSubTitleRu(aboutUsData && aboutUsData.textRu);
        setSubTitleEn(aboutUsData && aboutUsData.textEn);
        setImages(aboutUsData && aboutUsData.images?.split(','))
    }, [aboutUsData, aboutUsInfo]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = () => setOpen(false);


    const handleSubmit = () => {
        axios
            .post(
                `${baseUrl}/aboutUs/edit`,
                {
                    id: 1,
                    titleHy,
                    titleEn,
                    titleRu,
                    textHy: subTitleHy,
                    textEn: subTitleEn,
                    textRu: subTitleRu,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
                setThisImg(res.data.url);
            });
    };
    const handleEditImage = () => {
        axios
            .post(
                `${baseUrl}/aboutUs/editImage`,
                {
                    image: thisImg,
                    imageId:cuurentId
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
    useEffect(()=>console.clear(),[data,titleEn,titleRu,titleHy])

    return (
        <Box m={3} className="boxHeigth">
            <h2 mt={3} mb={3}>
                About Us Settings
            </h2>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Arm" {...a11yProps(0)} />
                        <Tab label="Ru" {...a11yProps(1)} />
                        <Tab label="En" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <h3 mt={3} mb={3}>
                        Title
                    </h3>
                    <TextField
                        id="standard-basic"
                        value={titleHy}
                        name="titleHy"
                        defaultValue={aboutUsData.length == 0 ? null : aboutUsData.titleHy}
                        onChange={(e) => setTitleHy(e.target.value)}
                        label="Am"
                        variant="standard"
                    />
                    <h3 mt={3} mb={3}>
                        Subtitle
                    </h3>

                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="8"
                        value={subTitleHy}
                        onChange={(e) => setSubTitleHy(e.target.value)}
                        maxLength="600"
                        cols="60"
                        defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textHy}
                        className="textareaText"
                    />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <h3 mt={3} mb={3}>
                        Title
                    </h3>
                    <TextField
                        id="standard-basic"
                        value={titleRu}
                        defaultValue={aboutUsData.length == 0 ? null : aboutUsData.titleRu}
                        name="titleRu"
                        onChange={(e) => setTitleRu(e.target.value)}
                        label="Ru"
                        variant="standard"
                    />
                    <h3 mt={3} mb={3}>
                        Subtitle
                    </h3>
                    <textarea
                        id="w3review"
                        name="textRu"
                        rows="8"
                        value={subTitleRu}
                        onChange={(e) => setSubTitleRu(e.target.value)}
                        maxLength="600"
                        defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textRu}
                        cols="60"
                        className="textareaText"
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h3 mt={3} mb={3}>
                        Title
                    </h3>
                    <TextField
                        id="standard-basic"
                        value={titleEn}
                        name="titleEn"
                        defaultValue={aboutUsData.length == 0 ? null : aboutUsData.titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        label="En"
                        variant="standard"
                    />
                    <h3 mt={3} mb={3} style={{
                        margin:"10px 0 10px 0"
                    }}>
                        Subtitle
                    </h3>
                    <textarea
                        id="w3review"
                        name="textEn"
                        value={subTitleEn}
                        onChange={(e) => setSubTitleEn(e.target.value)}
                        rows="8"
                        maxLength="600"
                        defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textEn}
                        cols="60"
                        className="textareaText"
                    />
                </TabPanel>
            </Box>
            <Button color="secondary" variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            <Box m={2}>
                {
                    images && images.map((i,index) => {
                        return (
                            <div key={index}>
                                <img src={i} alt={"image"} key={index} width={300} height={200}/>
                                <Button color="secondary" style={{margin:"-25px 20px 0 20px"}} variant="contained"
                                        onClick={()=> {
                                            setCurrentId(index)
                                            setOpen(true)
                                        }}>Edit</Button>
                            </div>
                        )
                    })
                }
            </Box>
           <AboutUsInfo aboutUsInfo={aboutUsInfo} setRend={setRend} rend={rend}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit this Image
                    </Typography>
                    <div className="imageArea">
                        <div>
                            <div className="uploadBtns">
                                <Button color="secondary" variant="contained" component="label">
                                    Upload Image
                                    <input type="file" hidden multiple onChange={handleFile}/>
                                </Button>
                            </div>
                            <div className="uploadBtns" m={2}>
                                <Button  color="secondary" variant="contained" onClick={handleEditImage}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                        <div className="uploadImageAreaInModal">
                            {thisImg !== null && (
                                <img src={thisImg} alt="newImage" width={300} height={200}/>
                            )}
                        </div>
                    </div>
                </Box>
            </Modal>
        </Box>
    );
};

export default AboutUs;
