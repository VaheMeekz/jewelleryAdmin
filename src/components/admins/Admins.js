import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {getAdminsThunk} from "../../store/actions/adminAction";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import {Button, DialogActions, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import AddIcon from '@mui/icons-material/Add';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import "../users/users.scss"
import * as Yup from 'yup';

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

const Admins = () => {
    const dispatch = useDispatch()
    const admis = useSelector(state => state.AdminReducer.admins)
    const [data, setData] = useState()
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOPenAdd] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(getAdminsThunk())
    }, [])

    useEffect(() => {
        setData(admis)
    }, [admis])

    const handleDelete = () => {
        axios
            .post(
                `${baseUrl}/admin/delete`,
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
                        title: "Deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpen(false);
                    // setData(response.data);
                    // console.log(response.data);
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <Box m={3} className="boxHeigth">
            <h2 mt={3} mb={3}>
                Admins
            </h2>
            <Box m={2}>
                <Button color="secondary" variant="contained" onClick={() => setOPenAdd(true)}>
                    <AddIcon/>
                </Button>
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">
                                        <Button color="secondary" variant="outlined" onClick={() => {
                                            setCurrentId(row.id)
                                            setOpen(true)
                                        }}>
                                            <DeleteIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/*    modals*/}
            {/*    del*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete ?
                    </Typography>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="secondary">No</Button>
                        <Button onClick={handleDelete} variant="outlined" color="error">Yes</Button>
                    </DialogActions>
                </Box>
            </Modal>
            {/*    add*/}
            <Modal
                open={openAdd}
                onClose={() => setOPenAdd(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new admin
                    </Typography>
                    <Box>
                        <Formik
                            initialValues={{
                                firstName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={Yup.object().shape({

                                firstName: Yup.string()
                                    .required('First Name is required'),
                                email: Yup.string()
                                    .email('Email is invalid')
                                    .required('Email is required'),
                                password: Yup.string()
                                    .min(6, 'Password must be at least 6 characters')
                                    .required('Password is required'),
                                confirmPassword: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                    .required('Confirm Password is required'),
                            })}
                            onSubmit={fields => {
                                console.log('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                                axios
                                    .post(
                                        `${baseUrl}/admin/create`,
                                        {
                                            name: fields.firstName,
                                            email: fields.email,
                                            password: fields.password
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
                                                title: "Succsess",
                                                showConfirmButton: false,
                                                timer: 1500,
                                            });
                                            setData((prev) => [...prev, response.data]);
                                            setOPenAdd(false);
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }}
                        >
                            {({errors, status, touched}) => (
                                <Form>
                                    <div className="form-row">
                                        <Box className="form-group col-5" m={2}>
                                            <h4 htmlFor="firstName">First Name</h4>
                                            <Field name="firstName" type="text"
                                                   className={'form-control fields' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="firstName" component="div"
                                                          className="invalid-feedback"/>
                                        </Box>
                                    </div>
                                    <Box className="form-group" m={2}>
                                        <h4 htmlFor="email">Email</h4>
                                        <Field name="email" type="text"
                                               className={'form-control fields' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                    </Box>
                                    <Box className="form-row" m={2}>
                                        <div className="form-group col">
                                            <h4 htmlFor="password">Password</h4>
                                            <Field name="password" type="password"
                                                   className={'form-control fields' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                        </div>
                                        <div className="form-group col" m={2}>
                                            <h4 htmlFor="confirmPassword">Confirm Password</h4>
                                            <Field name="confirmPassword" type="password"
                                                   className={'form-control fields' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="confirmPassword" component="div"
                                                          className="invalid-feedback"/>
                                        </div>
                                    </Box>
                                    <Box className="form-group" m={2}>
                                        <Button type="submit" className="btn btn-primary mr-2" variant="contained"
                                                color="secondary">Submit</Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                    <DialogActions>
                        <Button onClick={() => setOPenAdd(false)} variant="outlined" color="secondary">Cancel</Button>
                    </DialogActions>
                </Box>
            </Modal>
        </Box>
    );
};

export default Admins;