import React, {useEffect, useState} from 'react';
import {Box, Button, DialogActions, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getDeleveryThunk} from "../../store/actions/deleveryAction";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import DeleveryAddModal from "./DeleveryAddModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Delevery = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.deleveryReducer.deleveryValues)
    const [values, setValues] = useState()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [openDel, setOpenDel] = useState(false)
    const [cuurentId, setCurrentId] = useState("")
    const [thisLocation, setThisLocation] = useState("")
    const [thisPrice, setThisPrice] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(getDeleveryThunk())
    }, [])

    useEffect(() => {
        setValues(data)
    }, [data])

    const handleDelete = () => {
        axios
            .post(
                `${baseUrl}/deleveryValue/delete`,
                {
                    id: cuurentId
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
                        title: "Added!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpenDel(false);
                    setValues(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEdit = () => {
        if (thisPrice !== "" && thisLocation !== "") {
            axios
                .post(
                    `${baseUrl}/deleveryValue/edit`,
                    {
                        id: cuurentId,
                        loacation: thisLocation,
                        price: thisPrice
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
                            title: "Added!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setThisLocation("")
                        setThisPrice("")
                        setOpenEdit(false);
                        setValues(response.data)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            Swal("Add location and price!")
        }
    }
    return (
        <Box m={3} className="boxHeigth">
            <h2 mt={3} mb={3}>Delivery Settings</h2>
            <Box>
                <Button color="secondary" variant="contained" onClick={handleOpen}>Add</Button>
            </Box>
            <Box m={2}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Location</TableCell>
                                <TableCell align="left">Price (AMD)</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values && values.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.loacation}
                                    </TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left" color="secondary" >
                                        <Button variant="outlined" color="secondary" onClick={() => {
                                            setCurrentId(row.id)
                                            setOpenDel(true)
                                        }}>
                                        <DeleteIcon /></Button></TableCell>
                                    <TableCell align="left">
                                        <Button variant="outlined" color="secondary" onClick={() => {
                                            setCurrentId(row.id)
                                            setOpenEdit(true)
                                            setThisPrice(row.price)
                                            setThisLocation(row.loacation)
                                        }}>
                                        <EditIcon /></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/*add*/}
            <DeleveryAddModal open={open} handleClose={handleClose} setOpen={setOpen} setValues={setValues} style={style}/>
            <Modal
                open={openDel}
                onClose={() => setOpenDel(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete delivery location
                    </Typography>
                    <DialogActions>
                        <Button  color="secondary" variant="contained" onClick={() => setOpenDel(false)}>No</Button>
                        <Button  color="secondary" variant="contained" onClick={handleDelete}>Yes</Button>
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
                        Eddit delivery location
                    </Typography>
                    <Box>
                        <div style={{marginTop: "10px"}}>
                            <TextField id="outlined-basic" label="Price" variant="outlined" value={thisPrice}
                                       onChange={e => setThisPrice(e.target.value)}/>
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <TextField id="outlined-basic" label="Location" variant="outlined"
                                       value={thisLocation} onChange={e => setThisLocation(e.target.value)}
                            /></div>
                    </Box>
                    <DialogActions>
                        <Button color="secondary" variant="contained" onClick={() => setOpenEdit(false)}>Cancle</Button>
                        <Button color="secondary" variant="contained" onClick={handleEdit}>Edit</Button>
                    </DialogActions>
                </Box>
            </Modal>
        </Box>
    );
};

export default Delevery;