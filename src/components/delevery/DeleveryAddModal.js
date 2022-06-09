import React, {useState} from 'react';
import {Box, Button, DialogActions, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

const DeleveryAddModal = ({open,setOpen,handleClose,style,setValues}) => {
    const [newLocation, setNewLocation] = useState("")
    const [newPrice, setNewPrice] = useState()

    const handleSubmit = () => {
        if (newPrice !== "" && newLocation !== "") {
            axios
                .post(
                    `${baseUrl}/deleveryValue`,
                    {
                        loacation: newLocation, price: newPrice
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
                        setNewLocation("")
                        setNewPrice("")
                        setOpen(false);
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new delivery location
                </Typography>
                <Box m={2}>
                    <div style={{marginTop: "10px"}}>
                        <TextField id="outlined-basic" label="Location" variant="outlined" value={newLocation}
                                   onChange={e => setNewLocation(e.target.value)}/>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <TextField id="outlined-basic" label="Price" variant="outlined"
                                   value={newPrice} onChange={e => setNewPrice(e.target.value)}
                        /></div>
                    <DialogActions>
                        <Button color="secondary" variant="contained" onClick={handleSubmit}>Submit</Button>
                    </DialogActions>

                </Box>
            </Box>
        </Modal>
    );
};

export default DeleveryAddModal;