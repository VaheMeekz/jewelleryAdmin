import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import {Box, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

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

const childStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 300,
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
}

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

const ProductEditModal = ({openEdit, setOpenEdit, currentId, row}) => {
    //-------states
    const [nameHy, setNameHy] = useState();
    const [nameRu, setNameRu] = useState();
    const [nameEn, setNameEn] = useState();
    const [descriptionHy, setDescripHy] = useState();
    const [descriptionRu, setDescripRu] = useState();
    const [descriptionEn, setDescripEn] = useState();
    const [image, setImage] = useState();
    const [value, setValue] = useState(0);
    const [video,setVideo] = useState()
    //-------states end

    useEffect(() => {
        openEdit && setNameHy(row.nameHy);
        openEdit && setNameRu(row.nameRu);
        openEdit && setNameEn(row.nameEn);
        openEdit && setDescripHy(row.descriptionHy);
        openEdit && setDescripRu(row.descriptionRu);
        openEdit && setDescripEn(row.descriptionEn);
        openEdit && setImage(row?.ProductImages);
        openEdit && setVideo(row?.video);
    }, [row])

    const handleFileEdit = (e, index) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageEdit(files);
    };

    let arrOfImagesEdit = [];
    const uploadImageEdit = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImagesEdit.push(res.data.url);
                axios
                    .post(`${baseUrl}/product/addImage`, {
                        productId:row.id,
                        image:res.data.url,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(function (response) {
                        if (!response.data.error) {
                            Swal.fire({
                                position: "center", icon: "success", title: "Succsess!", showConfirmButton: false, timer: 1500,
                            });
                            setOpenEdit(false);
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 500);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

};

const handleChange = (event, newValue) => {
    setValue(newValue);
};
const handleEdit = () => {
    axios
        .post(`${baseUrl}/product/edit`, {
            id: currentId,
            nameHy,
            nameRu,
            nameEn,
            descriptionHy,
            descriptionRu,
            descriptionEn,
            video
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(function (response) {
            if (!response.data.error) {
                Swal.fire({
                    position: "center", icon: "success", title: "Succsess!", showConfirmButton: false, timer: 1500,
                });
                setOpenEdit(false);
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

const deleteImage = (id) => {
    axios
        .post(`${baseUrl}/product/deleteImage`, {
            id
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(function (response) {
            if (!response.data.error) {
                Swal.fire({
                    position: "center", icon: "success", title: "Succsess!", showConfirmButton: false, timer: 1500,
                });
                setOpenEdit(false);
                setTimeout(() => {
                    window.location.reload(false);
                }, 500);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
return (
    <div>
        <Modal
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit
                </Typography>
                <Box sx={{width: "100%"}}>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab label="Hy" {...a11yProps(0)} />
                            <Tab label="Ru" {...a11yProps(1)} />
                            <Tab label="En" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <h4>Name</h4>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={nameHy}
                            onChange={(e) => setNameHy(e.target.value)}
                        />
                        <h4>Description</h4>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxlength="400"
                            cols="50"
                            className="textareaText"
                            value={descriptionHy}
                            onChange={(e) => setDescripHy(e.target.value)}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <h4>Name</h4>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={nameRu}
                            onChange={(e) => setNameRu(e.target.value)}
                        />
                        <h4>Description</h4>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxlength="400"
                            cols="50"
                            className="textareaText"
                            value={descriptionRu}
                            onChange={(e) => setDescripRu(e.target.value)}
                        />

                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <h4>Name</h4>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={nameEn}
                            onChange={(e) => setNameEn(e.target.value)}
                        />
                        <h4>Description</h4>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxlength="400"
                            cols="50"
                            className="textareaText"
                            value={descriptionEn}
                            onChange={(e) => setDescripEn(e.target.value)}
                        />
                    </TabPanel>
                </Box>
                <Box>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={video}
                        onChange={(e) => setVideo(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box style={{margin: "10px 0"}}>
                    <Button color="secondary" variant="contained" component="label">
                        Add new image
                        <input type="file" hidden multiple onChange={handleFileEdit}/>
                    </Button>
                </Box>
                <Box>
                    {
                        image?.map(i => {
                            return (
                                <div key={i.id}>
                                    <div><img src={i.image} alt="image" style={{width: "200px", height: "200px"}}/>
                                    </div>
                                    <div style={{margin: "10px 0"}}>
                                        <ChildModal id={i.id}/>
                                    </div>
                                    <div style={{margin: "10px 0"}}><Button variant="contained" color="secondary"
                                                                            onClick={() => deleteImage(i.id)}>Delete</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Box>
                <Box>
                    <Button color="secondary" variant="contained" onClick={handleEdit}>Edit</Button>
                </Box>
            </Box>
        </Modal>
    </div>
);
}


function ChildModal({id}) {
    const [open, setOpen] = React.useState(false);
    const [image,setImage] = useState(null)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleFileEdit = (e, index) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageEdit(files);
    };

    let arrOfImagesEdit = [];
    const uploadImageEdit = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImagesEdit.push(res.data.url);
                setImage(res.data.url)
            });

    };
    const addImage = () => {
        axios
            .post(`${baseUrl}/product/editImage`, {
                id,
                img:image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Succsess!", showConfirmButton: false, timer: 1500,
                    });
                    setOpen(false);
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <Button variant="contained"
                    color="secondary" onClick={handleOpen}>edit</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={childStyles}>
                    <h2 id="child-modal-title">Edit Image</h2>
                    <Button color="secondary" variant="contained" component="label">
                        Add new image
                        <input type="file" hidden multiple onChange={handleFileEdit}/>
                    </Button>
                    {
                        image !== null && (
                            <div>
                                <img src={image} alt="image" style={{width:"150px",height:"150px"}}/>
                                <Button color="secondary" variant="contained" onClick={addImage}>Add</Button>
                        </div>
                        )
                    }
                    <Box style={{
                        marginTop:"50px"
                    }}>
                        <Button color="secondary" variant="contained" component="label" onClick={handleClose}>
                           Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default ProductEditModal;