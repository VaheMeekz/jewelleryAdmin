import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

const CategoryAddModal = ({openAdd,handleCloseAdd,style,setOpenAdd,setCategorys}) => {
    const [nameHy, setNameHy] = useState("");
    const [nameRu, setNameRu] = useState("");
    const [nameEn, setNameEn] = useState("");
    const [image,setImage] = useState(null)

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
                setImage(res.data.url);
            });
    };
    const handleAdd = () => {
        axios
            .post(
                `${baseUrl}/category`,
                {
                    nameHy,
                    nameRu,
                    nameEn,
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
                    setOpenAdd(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setCategorys(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <h3>Add</h3>
                    <TextField
                        id="filled-basic"
                        label="Hy"
                        variant="filled"
                        className="addInp"
                        value={nameHy}
                        onChange={(e) => setNameHy(e.target.value)}
                    />
                    <TextField
                        id="filled-basic"
                        label="Ru"
                        variant="filled"
                        className="addInp"
                        value={nameRu}
                        onChange={(e) => setNameRu(e.target.value)}
                    />
                    <TextField
                        id="filled-basic"
                        label="En"
                        variant="filled"
                        className="addInp"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                    />
                    <div>
                    <Button color="secondary" variant="contained" component="label">
                          {image ? "Change Image" : "Upload Image"}  
                            <input type="file" hidden multiple onChange={handleFile}/>
                        </Button>
                    </div>

                    <div>
                        {
                            image ? (
                                <img src={image} alt="image" style={{
                                    width:"150px",
                                    height:"150px"
                                }}/>
                            ) : null
                        }
                    </div>
                </Typography>
                <Typography
                    className="btnsBox"
                    id="modal-modal-description"
                    sx={{mt: 2}}
                >
                    <Button color="secondary" onClick={handleCloseAdd}>Close</Button>
                    <Button  color="secondary" variant="contained" onClick={handleAdd}>
                        Submit
                    </Button>
                </Typography>
            </Box>
        </Modal>
    );
};

export default CategoryAddModal;