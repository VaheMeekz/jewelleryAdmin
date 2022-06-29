import React, {useEffect, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import { portfolioGetVideosAC} from "../../store/actions/portfolioAction";
import {makeArray} from "../../helpers/makeArray";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

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
const PortfolioVideos = () => {
    const limit = 10;

    const dispatch = useDispatch()
    const data = useSelector(state => state.portfolioReducer.videos)
    const count = useSelector(state => state.portfolioReducer.videosCount)
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(portfolioGetVideosAC(page, limit));
    }, [page, limit]);

    useEffect(() => {
        if (count) {
            setPages(makeArray(Math.ceil(count / limit)));
        }
    }, [count, limit]);

    const handlerDelete = (id) => {
        axios
            .post(
                `${baseUrl}/portfolio/deleteVideo`,
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
                if (!response.data.error) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handlerSubmit = () => {
        axios
            .post(
                `${baseUrl}/portfolio/video`,
                {
                    image
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
                        title: "Success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpen(false)
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
        <Box m={3} className="boxHeigth">
            <h2 mt={3} mb={3}>
                Portfolio Videos
            </h2>
            <Box m={2}>
                <Button color="secondary" variant="contained" onClick={handleOpen}>
                    <AddIcon/>
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>#</strong>
                            </TableCell>
                            <TableCell align="left">
                                <strong>Images</strong>
                            </TableCell>
                            <TableCell align="left">
                                <strong>Delete</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data !== null &&
                            data.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.image}
                                    </TableCell>
                                    <TableCell align="left" className="delBtn">
                                        <Button variant="outlined" onClick={() => handlerDelete(row.id)} color="secondary" autoFocus>
                                            <DeleteIcon className="iconsPreferances"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={3}>
                <div className="pagBox">
                    <div className="arrowBack">
                        {pages.length - 1 == page ? (
                            <ArrowBackIcon
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                            />
                        ) : null}
                    </div>
                    {pages.length > 1 &&
                        pages.map((s,index) => {
                            return (
                                <div
                                    key={index}
                                    className={page === s ? "ActivePagItem" : "pagItem"}
                                    onClick={() => {
                                        setPage(s);
                                    }}style={{
                                    cursor:"pointer"
                                }}
                                >
                                    {s + 1}
                                </div>
                            );
                        })}
                    <div className="arrowBack">
                        {pages.length - 1 == page ? null : (
                            <ArrowForwardIcon
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                            />
                        )}
                    </div>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Video
                    </Typography>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={image} onChange={e=>setImage(e.target.value)}/>
                    <Box>
                        {image !== null && <Button color="secondary" variant="contained" onClick={handlerSubmit}>Submit</Button>}
                    </Box>

                </Box>
            </Modal>
        </Box>
    );
};

export default PortfolioVideos;