import React from 'react';
import Modal from "@mui/material/Modal";
import {Box, DialogActions} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 100,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ProductDelteModal = ({open,setOpen,id}) => {

    const handleDelete = () => {
        axios
            .post(`${baseUrl}/product/delete`, {
                id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Deleted", showConfirmButton: false, timer: 1500,
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
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete
                </Typography>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={() => setOpen(false)}>
                        No
                    </Button>
                    <Button color="secondary" variant="contained" onClick={handleDelete}>
                        Yes
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
};

export default ProductDelteModal;