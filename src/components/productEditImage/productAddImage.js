import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

const ProductAddImage = ({setOpenEdit,currentId}) => {
    const [thisImg,setThisImg] = useState(null)
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
                arrOfImages.push(res.data.url);
                setThisImg(res.data.url);
            });
    };

    const handleSubmit = () => {
        axios
            .post(
                `${baseUrl}/products/addImage`,
                {
                    id:currentId,
                    image: thisImg
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
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpenEdit(false)
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
        <Box>
            <div className="imageArea">
                <div>
                    <div className="uploadBtns">
                        <Button  color="secondary"  variant="contained" component="label">
                            Upload New Image
                            <input type="file" hidden multiple onChange={handleFile}/>
                        </Button>
                    </div>
                    <div className="uploadBtns" m={2}>
                        {thisImg == null ? null : <Button  color="secondary"  variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>}

                    </div>
                </div>
                <div className="uploadImageAreaInModal">
                    {thisImg !== null && (
                        <img src={thisImg} alt="newImage" width={300} height={200}/>
                    )}
                </div>
            </div>
        </Box>
    );
};

export default ProductAddImage;