import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
const ProductEditImage = ({image,editImage,index,handleEditImage,cuurentEditImage,currentId,setOpenEdit}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteImage = () => {
        axios
            .post(`${baseUrl}/products/deleteImage`, {
                id:currentId,
                index
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Success", showConfirmButton: false, timer: 1500,
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
            <img src={image} alt={"image"} width={200} style={{margin: "20px"}}/>
            {
                cuurentEditImage == index &&  editImage &&
                <Button  color="secondary"  onClick={() => handleEditImage(index)}
                        variant="contained">Edit</Button>
            }
            <Box style={{margin:"10px"}}>
                <Button  color="error"   variant="outlined" onClick={handleClick} autoFocus>Delete Image</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleDeleteImage}><DeleteIcon/>Delete</MenuItem>
                    <MenuItem onClick={handleClose}><CancelIcon/>Cancel</MenuItem>
                </Menu>
            </Box>
        </div>
    );
};

export default ProductEditImage;