import React, {useEffect, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getChooseThunk} from "../../store/actions/chooseAction";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
const Choose = () => {
    const dispatch = useDispatch()
    const [values, setValues] = useState()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [curentId, setCurrentId] = useState(null)
    const [value, setValue] = useState(0);
    const [addValue, setAddValue] = useState(0)
    const [thisImg, setThisImg] = useState(null);
    const [image, setImage] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const data = useSelector(state => state.chooseReducer.chooseData)

    //edit values
    const [titleHy, setTitleHy] = useState("")
    const [titleRu, setTitleRu] = useState("")
    const [titleEn, setTitleEn] = useState("")
    const [textHy, setTextHy] = useState("")
    const [textRu, setTextRu] = useState("")
    const [textEn, setTextEn] = useState("")

    //add values
    const [titleHyNew, setTitleHyNew] = useState("")
    const [titleRuNew, setTitleRuNew] = useState("")
    const [titleEnNew, setTitleEnNew] = useState("")
    const [textHyNew, setTextHyNew] = useState("")
    const [textRuNew, setTextRuNew] = useState("")
    const [textEnNew, setTextEnNew] = useState("")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeAdd = (event, newValue) => {
        setAddValue(newValue);
    };
    useEffect(() => {
        dispatch(getChooseThunk())
    }, [])

    useEffect(() => {
        setValues(data)
        setImage(data && data.filter(i => i.id == 1).map((i,index)=>index == 0 && i.image))
    }, [data])

    const transport = (titleHy, titleRu, titleEn, textHy, textRu, textEn, id) => {
        setTitleHy(titleHy)
        setTitleRu(titleRu)
        setTitleEn(titleEn)
        setTextHy(textHy)
        setTextRu(textRu)
        setTextEn(textEn)
        setCurrentId(id)
        setOpenEdit(true)
    }
    const handleDelete = () => {
        axios
            .post(
                `${baseUrl}/choose/delete`,
                {
                    id: curentId,
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
                        title: "Deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpenDelete(false);
                    setCurrentId(null)
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEdit = () => {
        axios
            .post(
                `${baseUrl}/choose/edit`,
                {
                    id: curentId,
                    titleHy, titleRu, titleEn, textHy, textRu, textEn
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
                    setOpenEdit(false);
                    setCurrentId(null)
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const hendleAdd = () => {
        axios
            .post(
                `${baseUrl}/choose`,
                {
                    titleHy: titleHyNew,
                    titleRu: titleRuNew,
                    titleEn: titleEnNew,
                    textHy: textHyNew,
                    textRu: textRuNew,
                    textEn: textEnNew
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
                `${baseUrl}/choose/editImage`,
                {
                    image: thisImg
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
                    setOpenImage(false);
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
        <Box m={2} className="boxHeigth">
            <h2 mt={3} mb={3}>Why choose us Settings</h2>
            <Box m={2}>
                <Button  color="secondary" variant="contained" onClick={handleOpen}>Add</Button>
            </Box>
            <Box m={2}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Title Hy</TableCell>
                                <TableCell align="left">Title Ru</TableCell>
                                <TableCell align="left">Title En</TableCell>
                                <TableCell align="left">Text Hy</TableCell>
                                <TableCell align="left">Text Ru</TableCell>
                                <TableCell align="left">Text En</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values && values.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">{row.titleHy}</TableCell>
                                    <TableCell align="left">{row.titleRu}</TableCell>
                                    <TableCell align="left">{row.titleEn}</TableCell>
                                    <TableCell align="left">{row.textHy}</TableCell>
                                    <TableCell align="left">{row.textRu}</TableCell>
                                    <TableCell align="left">{row.textEn}</TableCell>
                                    <TableCell align="left">
                                        <Button variant="outlined" color="secondary" onClick={() => {
                                            setCurrentId(row.id)
                                            setOpenDelete(true)
                                        }}>
                                            <DeleteIcon />
                                        </Button>
                                        </TableCell>
                                    <TableCell align="left">
                                        <Button variant="outlined" color="secondary" onClick={() => {
                                            transport(row.titleHy, row.titleRu, row.titleEn, row.textHy, row.textRu, row.textEn, row.id)
                                        }}> <EditIcon /></Button>
                                       </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box m={3}>
                    <img src={image} alt={"image"} width={500}/>
                    <Button  color="secondary" style={{margin: "-10px 20px 0 20px"}} variant="contained"
                            onClick={() => setOpenImage(true)}>Edit image</Button>
                </Box>
                {/*add*/}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add new
                        </Typography>
                        <Box sx={{width: '100%'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={addValue} onChange={handleChangeAdd} textColor="secondary"
                                      indicatorColor="secondary" aria-label="basic tabs example">
                                    <Tab label="Hy" {...a11yProps(0)} />
                                    <Tab label="Ru" {...a11yProps(1)} />
                                    <Tab label="En" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={addValue} index={0}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={titleHyNew}
                                               onChange={e => setTitleHyNew(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={textHyNew}
                                    onChange={(e) => setTextHyNew(e.target.value)}
                                    placeholder="message"
                                    maxLength="500"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                            <TabPanel value={addValue} index={1}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={titleRuNew}
                                               onChange={e => setTitleRuNew(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={textRuNew}
                                    onChange={(e) => setTextRuNew(e.target.value)}
                                    placeholder="message"
                                    maxLength="500"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                            <TabPanel value={addValue} index={2}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={titleEnNew}
                                               onChange={e => setTitleEnNew(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={textEnNew}
                                    onChange={(e) => setTextEnNew(e.target.value)}
                                    placeholder="message"
                                    maxLength="500"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>

                        </Box>
                        <DialogActions>
                            <Button color="secondary" onClick={() => setOpen(false)}>No</Button>
                            <Button color="secondary" color="secondary"  onClick={hendleAdd} autoFocus>
                                Add
                            </Button>
                        </DialogActions>
                    </Box>
                </Modal>
                {/*delete*/}
                <Modal
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Delete
                        </Typography>
                        <DialogActions>
                            <Button color="secondary" color="secondary" onClick={() => setOpenDelete(false)}>No</Button>
                            <Button color="secondary" variant="outlined"  onClick={handleDelete} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Box>
                </Modal>
                {/*edit*/}
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
                        <Box sx={{width: '100%'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange} textColor="secondary"
                                      indicatorColor="secondary" aria-label="basic tabs example">
                                    <Tab label="Hy" {...a11yProps(0)} />
                                    <Tab label="Ru" {...a11yProps(1)} />
                                    <Tab label="En" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={titleHy}
                                               onChange={e => setTitleHy(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={textHy}
                                    onChange={(e) => setTextHy(e.target.value)}
                                    placeholder="message"
                                    maxLength="500"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={titleRu}
                                               onChange={e => setTitleRu(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={textRu}
                                    onChange={(e) => setTextRu(e.target.value)}
                                    placeholder="message"
                                    maxLength="500"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={titleEn}
                                               onChange={e => setTitleEn(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={textEn}
                                    onChange={(e) => setTextEn(e.target.value)}
                                    placeholder="message"
                                    maxLength="500"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                        </Box>
                        <DialogActions>
                            <Button color="secondary" color="secondary" onClick={() => setOpenEdit(false)}>Cancle</Button>
                            <Button color="secondary" onClick={handleEdit} variant="contained" autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Box>
                </Modal>

                {/*image*/}
                <Modal
                    open={openImage}
                    onClose={() => setOpenImage(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Image
                        </Typography>
                        <Box m={2}>
                            <div className="imageArea">
                                <div>
                                    <div className="uploadBtns">
                                        <Button variant="contained" component="label">
                                            Upload
                                            <input type="file" hidden multiple onChange={handleFile}/>
                                        </Button>
                                    </div>
                                    <div className="uploadBtns" m={2}>
                                        {thisImg == null ? null : <Button variant="contained" onClick={handleEditImage}>
                                            Submit
                                        </Button>}

                                    </div>
                                </div>
                                <div className="uploadImageAreaInModal">
                                    {thisImg !== null && (
                                        <img src={thisImg} alt="newImage" width={300} height={200}/>
                                    )}
                                </div>
                            </div>
                        </Box>
                        <DialogActions>
                            <Button onClick={() => setOpenImage(false)}>Cancle</Button>
                        </DialogActions>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default Choose;