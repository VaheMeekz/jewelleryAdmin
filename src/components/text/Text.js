import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsTextThunk} from "../../store/actions/productAction";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

const Text = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.productReducer.text)
    const [textHy, setTextHy] = useState(null)
    const [textRu, setTextRu] = useState(null)
    const [textEn, setTextEn] = useState(null)
    useEffect(() => {
        dispatch(getProductsTextThunk())
    }, [])

    useEffect(()=>{
        data && data !== null && setTextHy(data.textHy)
        data && data !== null && setTextRu(data.textRu)
        data && data !== null && setTextEn(data.textEn)
    },[data])

    const handleSubmit = () => {
        axios
            .post(
                `${baseUrl}/text`,
                {
                    textHy,
                    textRu,
                    textEn,
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
                    // setTimeout(() => {
                    //     window.location.reload(false);
                    // }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Box m={2} className="boxHeigth">
            <div>
                <h3>Hy</h3>
                <textarea
                    id="w3review"
                    name="textHy"
                    rows="8"
                    maxLength="600"
                    cols="60"
                    className="textareaText"
                    defaultValue={textHy}
                    onChange={e=>setTextHy(e.target.value)}
                />
            </div>
            <div>
                <h3>Ru</h3>
                <textarea
                    id="w3review"
                    name="textRu"
                    rows="8"
                    maxLength="600"
                    cols="60"
                    className="textareaText"
                    defaultValue={textRu}
                    onChange={e=>setTextRu(e.target.value)}
                />
            </div>
            <div>
                <h3>En</h3>
                <textarea
                    id="w3review"
                    name="textEn"
                    rows="8"
                    maxLength="600"
                    cols="60"
                    className="textareaText"
                    defaultValue={textEn}
                    onChange={e=>setTextEn(e.target.value)}
                />
            </div>
            <div>
                <Button color="secondary" variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
        </Box>
    );
};

export default Text;