import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryThunk} from "../../store/actions/categoryAction";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../aboutUs/aboutUs.scss";
import axios from "axios";
import Swal from "sweetalert2";
import {baseUrl, token} from "../../config/config";
import {TextField} from "@mui/material";
import CategoryAddModal from "./CategoryAddModal";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Category = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.categoryReducer.category);
    const [categorys, setCategorys] = useState();
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const handleClose = () => setOpen(false);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleCloseAdd = () => setOpenAdd(false);
    const [nameEditHy, setNameEditHy] = useState("");
    const [nameEditRu, setNameEditRu] = useState("");
    const [nameEditEn, setNameEditEn] = useState("");
    const [editImage,setEditImage] = useState("")

    useEffect(() => {
        dispatch(getCategoryThunk());
    }, []);

    useEffect(() => {
        setCategorys(data);
    }, [data]);

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
                setEditImage(res.data.url);
            });
    };

    const handelDelete = () => {
        axios
            .post(`${baseUrl}/category/delete`, {
                id: currentId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    setOpenDelete(false);
                    Swal.fire({
                        position: "center", icon: "success", title: "Succses", showConfirmButton: false, timer: 1500,
                    });
                    setCategorys(response.data);
                }
            })
            .catch(function (error) {   
                console.log(error);
            });
    };

    const handleEdit = () => {
        axios
            .post(`${baseUrl}/category/edit`, {
                id: currentId, nameHy: nameEditHy, nameRu: nameEditRu, nameEn: nameEditEn,image:editImage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    setOpen(false);
                    Swal.fire({
                        position: "center", icon: "success", title: "Succses", showConfirmButton: false, timer: 1500,
                    });
                    setCategorys(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (<Box m={3} className="boxHeigth">
        <h2 mt={3} mb={3}>
            Category Settings
        </h2>
        <Box m={2}>
            <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>
                Add
            </Button>
        </Box>
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name Hy</TableCell>
                            <TableCell align="left">Name Ru</TableCell>
                            <TableCell align="left">Name En</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Edit</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorys && categorys.map((row) => (<TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.nameHy}
                            </TableCell>
                            <TableCell align="left">{row.nameRu}</TableCell>
                            <TableCell align="left">{row.nameEn}</TableCell>
                            <TableCell align="left">{row.image ? (
                                <img src={row.image} alt="image" style={{
                                    width:"150px",
                                    height:"150px"
                                }}/>
                            ):"-"}</TableCell>
                            <TableCell align="left"> <Button color="secondary"
                                                             variant="contained"
                                                             onClick={() => {
                                                                 setCurrentId(row.id);
                                                                 setOpen(true);
                                                                 setNameEditHy(row.nameHy);
                                                                 setNameEditRu(row.nameRu);
                                                                 setNameEditEn(row.nameEn);
                                                                 setEditImage(row.image)
                                                             }}
                            >
                                Edit
                            </Button></TableCell>
                            <TableCell align="left"><Button color="secondary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setOpenDelete(true);
                                                                setCurrentId(row.id);
                                                            }}
                            >
                                Delete
                            </Button></TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h3>Edit</h3>
                        <TextField
                            id="filled-basic"
                            label="Hy"
                            variant="filled"
                            className="addInp"
                            value={nameEditHy}
                            onChange={(e) => setNameEditHy(e.target.value)}
                        />
                        <TextField
                            id="filled-basic"
                            label="Ru"
                            variant="filled"
                            className="addInp"
                            value={nameEditRu}
                            onChange={(e) => setNameEditRu(e.target.value)}
                        />
                        <TextField
                            id="filled-basic"
                            label="En"
                            variant="filled"
                            className="addInp"
                            value={nameEditEn}
                            onChange={(e) => setNameEditEn(e.target.value)}
                        />
                        <div>
                            {
                                editImage && (
                                    <div>
                                    <img src={editImage} alt="image" style={{
                                        width:"150px",
                                        height:"150px"
                                    }}/>
                                     <Button color="secondary" variant="contained" component="label" style={{
                                        margin:"20px"
                                    }}>
                          {editImage ? "Change Image" : "Upload Image"}  
                            <input type="file" hidden multiple onChange={handleFile}/>
                        </Button>
                                
                                    </div>
                                )
                            }
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <Button color="secondary" variant="contained" onClick={handleEdit}>Submit</Button>
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete ?
                    </Typography>
                    <Typography
                        className="btnsBox"
                        id="modal-modal-description"
                        sx={{mt: 2}}
                    >
                        <div>
                            <Button color="secondary" variant="contained" onClick={handleCloseDelete}>
                                No
                            </Button>
                        </div>
                        <div>
                            <Button color="secondary" variant="contained" onClick={handelDelete}>
                                Yes
                            </Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <CategoryAddModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} style={style}
                              setOpenAdd={setOpenAdd} setCategorys={setCategorys}
            />
        </Box>
    </Box>);
};

export default Category;
