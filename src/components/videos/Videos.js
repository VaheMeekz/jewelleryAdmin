import React, {useEffect, useState} from 'react';
import {getSingleVideosThunk, getVideosThunk} from "../../store/actions/videoAction";
import {useDispatch, useSelector} from "react-redux";
import {makeArray} from "../../helpers/makeArray";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {DialogActions} from "@mui/material";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";

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
const Videos = () => {
    const dispatch = useDispatch()
    const limit = 10;
    const videos = useSelector((state) => state.videoReducer.videos);
    const count = useSelector((state) => state.videoReducer.count);
    const loading = useSelector((state) => state.videoReducer.loading);
    const single = useSelector((state) => state.videoReducer.single);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [currentId, setCurrentId] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [video, setVideo] = useState()
    const [newVideo, setNewVideo] = useState()

    useEffect(() => {
        dispatch(getVideosThunk(page, limit))
    }, [page, limit])

    useEffect(() => {
        if (count) {
            setPages(makeArray(Math.ceil(count / limit)));
        }
    }, [count, limit]);

    useEffect(() => {
        if (single !== null) {
            setVideo(single.video)
        }
    }, [single])

    const handlerEdit = () => {
        axios
            .post(
                `${baseUrl}/video/edit`,
                {
                    id: currentId,
                    video
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                setOpen(false)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Succsess",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handlerDelete = (id) => {
        axios
            .post(
                `${baseUrl}/video/delete`,
                {
                    id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                setOpen(false)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Succsess",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handlerAdd = () => {
        axios
            .post(
                `${baseUrl}/video/`,
                {
                    video: newVideo
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                setOpenAdd(false)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Succsess",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (<Box m={3} className="boxHeigth">
        <h2 mt={3} mb={3}>
            Videos
        </h2>
        <Box m={2}>
            <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>
                <AddIcon/>
            </Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">#</TableCell>
                        <TableCell align="left">video</TableCell>
                        <TableCell align="left">Edit</TableCell>
                        <TableCell align="left">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!loading && videos?.map((row, index) => (<TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{row.video}</TableCell>
                        <TableCell align="left">
                            <Button color="secondary" variant="outlined" autoFocus onClick={() => {
                                setCurrentId(row.id)
                                dispatch(getSingleVideosThunk(row.id))
                                setOpen(true)
                            }}>
                                <EditIcon/>
                            </Button>
                        </TableCell>
                        <TableCell align="left">
                            <Button color="secondary" variant="outlined" autoFocus
                                    onClick={() => handlerDelete(row.id)}>
                                <DeleteIcon className="iconsPreferances"/>
                            </Button>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        <div className="pagBox">
            <div className="arrowBack">
                {pages.length - 1 == page ? (<ArrowBackIcon
                    onClick={() => {
                        setPage(page - 1);
                    }}
                />) : null}
            </div>
            {pages.length > 1 && pages.map((s) => {
                return (<div
                    className={page === s ? "ActivePagItem" : "pagItem"}
                    key={s}
                    onClick={() => {
                        setPage(s);
                    }}
                    style={{
                        cursor: "pointer"
                    }}
                >
                    {s + 1}
                </div>);
            })}
            <div className="arrowBack">
                {pages.length - 1 == page ? null : (<ArrowForwardIcon
                    onClick={() => {
                        setPage(page + 1);
                    }}
                />)}
            </div>

        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit
                </Typography>
                <Box>
                    <Box style={{
                        margin: "10px"
                    }}>
                        <TextField id="outlined-basic" label="video" variant="outlined" value={video}
                                   onChange={e => setVideo(e.target.value)}/>
                    </Box>
                    <DialogActions>
                        <Button color="error" variant="contained" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" onClick={handlerEdit}>
                            Edit
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Modal>

        <Modal
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new video
                </Typography>
                <Box>
                    <Box style={{
                        margin: "10px"
                    }}>
                        <TextField id="outlined-basic" label="video" variant="outlined" value={newVideo}
                                   onChange={e => setNewVideo(e.target.value)}/>
                    </Box>
                    <DialogActions>
                        <Button color="error" variant="contained" onClick={() => setOpenAdd(false)}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" onClick={handlerAdd}>
                            Add
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    </Box>);
};

export default Videos;