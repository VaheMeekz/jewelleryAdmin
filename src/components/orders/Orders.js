import {Box, Button, DialogActions} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersThunk} from "../../store/actions/orderAction";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {makeArray} from "../../helpers/makeArray";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

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

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const handleDelete = () => {
        axios
            .post(
                `${baseUrl}/basket/delete-admin`,
                {
                    id: currentId,
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
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpenModal(false);
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
        <React.Fragment>
            <TableRow sx={{"& > *": {borderBottom: "unset"}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="left">{row.User?.name}</TableCell>
                <TableCell align="left">{row.User?.email}</TableCell>
                <TableCell align="left">
                    <DeleteIcon
                        onClick={() => {
                            setCurrentId(row.id);
                            setOpenModal(true);
                        }}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Product
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Image</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Model</TableCell>
                                        <TableCell align="left">Price</TableCell>
                                        <TableCell align="left">Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {row.Product.map((i) => ( */}
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <img
                                                src={row.Product && row.Product.image.split(",")[0]}
                                                alt="image"
                                                width={100}
                                                height={80}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.Product?.nameHy}
                                        </TableCell>
                                        <TableCell>{row.Product?.model}</TableCell>
                                        <TableCell align="left">{row.Product?.price}</TableCell>
                                        <TableCell align="left">{row.quantity}</TableCell>
                                    </TableRow>
                                    {/* ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delate ?
                    </Typography>
                    <DialogActions>
                        <Button variant="contained" onClick={() => setOpenModal(false)}>
                            No
                        </Button>
                        <Button variant="contained" onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

const Orders = () => {
    const dispatch = useDispatch();
    const limit = 4;
    const data = useSelector((state) => state.orderReducer.orders);
    const count = useSelector((state) => state.orderReducer.count);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        dispatch(getOrdersThunk(page, limit));
    }, [page, limit]);

    useEffect(() => {
        if (count) {
            setPages(makeArray(Math.ceil(count / limit)));
        }
    }, [count, limit]);

    return (
        <Box m={3} className="boxHeigth">
            <h2 t={3} mb={3}>
                Orders
            </h2>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">f Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data !== null &&
                            data.map((row) => <Row key={row.id} row={row}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
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
                    pages.map((s) => {
                        return (
                            <div
                                className={page === s ? "ActivePagItem" : "pagItem"}
                                key={s}
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
    );
};

export default Orders;
