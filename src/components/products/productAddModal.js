import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import {Box, DialogActions, FormControl, MenuItem, Select, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 700,
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (<Box sx={{p: 3}}>
            <Typography>{children}</Typography>
        </Box>)}
    </div>);
}

TabPanel.propTypes = {
    children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`, "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ProductAddModal = ({openAdd, setOpenAdd, categories}) => {
    const [nameNewHy, setNameNewHy] = useState("");
    const [nameNewRu, setNameNewRu] = useState("");
    const [nameNewEn, setNameNewEn] = useState("");
    const [descriptionNewHy, setDescripNewHy] = useState();
    const [descriptionNewRu, setDescripNewRu] = useState();
    const [descriptionNewEn, setDescripNewEn] = useState();
    const [currentCategory, setCurrentCategory] = useState();
    const [thisImg, setThisImg] = useState([]);
    const [addValue, seAddValue] = useState(0);
    const [video, setVideo] = useState("")
    const handleChangeAdd = (event, newValue) => {
        seAddValue(newValue);
    };

    //----------------upload start
    useEffect(() => {
        if (thisImg.length >= 5) {
            Swal.fire({
                icon: "error", title: "Oops...", text: "Images is mutch!( նկարները 5֊ից ոչ շատ)",
            });
        }
    }, [thisImg]);

    //file upload start
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
                setThisImg([...thisImg, ","]);
                setThisImg([...thisImg, res.data.url]);
            });
    };


    const handleDeleteUploadedImage = (id) => {
        let newArr = thisImg.filter((word, index) => index !== id)
        setThisImg(newArr)
    }

    const handleAddProduct = () => {
        axios
            .post(`${baseUrl}/product`, {
                nameHy: nameNewHy,
                nameRu: nameNewRu,
                nameEn: nameNewEn,
                descriptionHy: descriptionNewHy,
                descriptionRu: descriptionNewRu,
                descriptionEn: descriptionNewEn,
                images: thisImg.toString(),
                categoryId: currentCategory,
                video: video
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Success", showConfirmButton: false, timer: 1500,
                    });
                    setOpenAdd(false)
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Modal
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Product
                </Typography>
                <Box sx={{width: "100%"}}>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <Tabs
                            value={addValue}
                            onChange={handleChangeAdd}
                            aria-label="basic tabs example"
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab label="Hy" {...a11yProps(0)} />
                            <Tab label="Ru" {...a11yProps(1)} />
                            <Tab label="En" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={addValue} index={0}>
                        <h4>Name</h4>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            value={nameNewHy}
                            onChange={(e) => setNameNewHy(e.target.value)}
                        />
                        <h4>Description</h4>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxlength="400"
                            cols="58"
                            className="textareaText"
                            value={descriptionNewHy}
                            onChange={(e) => setDescripNewHy(e.target.value)}
                        />
                    </TabPanel>
                    <TabPanel value={addValue} index={1}>
                        <h4>Name</h4>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            value={nameNewRu}
                            onChange={(e) => setNameNewRu(e.target.value)}
                        />
                        <h4>Description</h4>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxlength="400"
                            cols="58"
                            className="textareaText"
                            value={descriptionNewRu}
                            onChange={(e) => setDescripNewRu(e.target.value)}
                        />

                    </TabPanel>
                    <TabPanel value={addValue} index={2}>
                        <h4>Name</h4>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            value={nameNewEn}
                            onChange={(e) => setNameNewEn(e.target.value)}
                        />
                        <h4>Description</h4>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxlength="400"
                            cols="58"
                            className="textareaText"
                            value={descriptionNewEn}
                            onChange={(e) => setDescripNewEn(e.target.value)}
                        />
                    </TabPanel>
                </Box>
                <Box>
                    <h4 style={{
                        marginBottom: "10px"
                    }}>Category</h4>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentCategory}
                            label="Age"
                            onChange={(e) => setCurrentCategory(e.target.value)}
                        >
                            {categories && categories.map((i) => {
                                return (<MenuItem key={i.id} value={i.id}>
                                    {i.nameHy}
                                </MenuItem>);
                            })}
                        </Select>
                    </FormControl>
                </Box>

                <Box style={{
                    margin: "20px 0"
                }}>
                    <TextField label="Video URL" variant="outlined" value={video}
                               onChange={e => setVideo(e.target.value)} fullWidth/>
                </Box>
                <Box>
                    <div className="uploadBtns">
                        <Button color="secondary" variant="contained" component="label">
                            Upload Image
                            <input type="file" hidden multiple onChange={handleFile}/>
                        </Button>
                    </div>
                    <div>
                        {thisImg.length ? thisImg.map((i, index) => {
                            return (
                                <div>
                                    <img
                                        key={i.toString()}
                                        src={i}
                                        alt="newImage"
                                        width={100}
                                        height={100}
                                        style={{margin: "10px"}}
                                    />
                                    <Button variant="outlined" color="error" color="secondary"
                                            onClick={() => handleDeleteUploadedImage(index)}>Delete This
                                        Image</Button>
                                </div>
                            );
                        }) : null}
                        {thisImg.length >= 5 && (<h3 className="errorText">Նկարները շատ են 5֊ից</h3>)}
                    </div>
                </Box>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
};

export default ProductAddModal;