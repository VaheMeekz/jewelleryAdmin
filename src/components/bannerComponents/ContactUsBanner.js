import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getBannerBannerThunk, getContactUsBannerThunk} from "../../store/actions/bannersActions";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal'
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";

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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ContactUsBanner = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0);
    const data = useSelector(state => state.bannersReducer.contactUs)
    const [open, setOpen] = React.useState(false);
    const [titleHy, setTitleHy] = useState("")
    const [titleRu, setTitleRu] = useState("")
    const [titleEn, setTitleEn] = useState("")
    const [image, setImage] = useState("")
    const [thisImg, setThisImg] = useState(null);
    const [openSection, setOPenSection] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(getContactUsBannerThunk())
    }, [])

    useEffect(() => {
        setTitleHy(data && data.titleHy)
        setTitleRu(data && data.titleRu)
        setTitleEn(data && data.titleEn)
        setImage(data && data.image)
    }, [data])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeTexts = () => {
        axios
            .post(
                `${baseUrl}/contactUsBanner/edit`,
                {
                    id: 1,
                    titleHy,
                    titleEn,
                    titleRu,
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
    }
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
    const handleSubmit = () => {
        if (thisImg !== null) {
            axios
                .post(
                    `${baseUrl}/contactUsBanner/editImage`,
                    {
                        image: thisImg,
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
            Swal.fire("wait!");
        }
    };

    return (
        <Box m={2}>
            <h2 mt={3} mb={3}>Contact Us banner</h2>
            <Box>
                {
                    openSection ? (
                        <Button variant="outlined" color="secondary" onClick={() => setOPenSection(!openSection)}>
                            <ArrowDropUpSharpIcon/>
                        </Button>
                    ) : (
                        <Button variant="outlined" color="secondary" onClick={() => setOPenSection(!openSection)}>
                            <ArrowDropDownSharpIcon/>
                        </Button>)
                }
            </Box>
            {openSection ? (
                <Box>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary"
                                  indicatorColor="secondary">
                                <Tab label="Hy" {...a11yProps(0)} />
                                <Tab label="Ru" {...a11yProps(1)} />
                                <Tab label="En" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <TextField id="standard-basic" label="Standard" variant="standard"
                                       value={titleHy} onChange={e => setTitleHy(e.target.value)}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TextField id="standard-basic" label="Standard" variant="standard"
                                       value={titleRu} onChange={e => setTitleRu(e.target.value)}/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <TextField id="standard-basic" label="Standard" variant="standard"
                                       value={titleEn} onChange={e => setTitleEn(e.target.value)}/>
                        </TabPanel>
                    </Box>
                    <Box m={2}><Button color="secondary" variant="contained" onClick={handleChangeTexts}>Submit</Button></Box>
                    <Box m={2}>
                        <img src={image} alt={"image"} width={300}/>
                        <Button color="secondary" style={{margin: "-25px 0 0 20px"}} variant="contained"
                                onClick={handleOpen}>Edit</Button>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Edit image
                            </Typography>
                            <div className="imageArea">
                                <div>
                                    <div className="uploadBtns">
                                        <Button color="secondary" variant="contained" component="label">
                                            Upload
                                            <input type="file" hidden multiple onChange={handleFile}/>
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
                                        <img src={thisImg} alt="newImage" width={300} height={200}/>
                                    )}
                                </div>
                            </div>
                        </Box>
                    </Modal></Box>) : null}
        </Box>
    );
};

export default ContactUsBanner;