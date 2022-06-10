import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const AboutUsDown = ({data}) => {
    const [value, setValue] = React.useState(0);
    const [imageOne, setImageOne] = useState(null)
    const [imageTwo, setImageTwo] = useState(null)
    const [imageThree, setImageThree] = useState(null)
    //values
    const [subTitleHy, setSubTitleHy] = useState("");
    const [subTitleRu, setSubTitleRu] = useState("");
    const [subTitleEn, setSubTitleEn] = useState("");
    //

    useEffect(() => {
        setSubTitleHy(data && data.textHy);
        setSubTitleRu(data && data.textRu);
        setSubTitleEn(data && data.textEn);
        setImageOne(data && data.imgOne);
        setImageTwo(data && data.imgTwo);
        setImageThree(data && data.imgThree);
    }, [data]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleSubmit = () => {
        axios
            .post(
                `${baseUrl}/aboutUs/editDown`,
                {
                    textHy: subTitleHy,
                    textEn: subTitleEn,
                    textRu: subTitleRu,
                    imgOne: imageOne,
                    imgTwo: imageTwo,
                    imgThree: imageThree
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
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
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
                setImageOne(res.data.url);
            });
    };

    const handleFileTwo = (e) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageTwo(files);
    };

    let arrOfImagesTwo = [];
    const uploadImageTwo = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImagesTwo.push(res.data.url);
                setImageTwo(res.data.url);
            });
    };

    const handleFileThree = (e) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageThree(files);
    };

    let arrOfImagesThree = [];
    const uploadImageThree = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImagesThree.push(res.data.url);
                setImageThree(res.data.url);
            });
    };

    return (
        <div>
            <h2 mt={3} mb={3}>
                Down
            </h2>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Arm" {...a11yProps(0)} />
                        <Tab label="Ru" {...a11yProps(1)} />
                        <Tab label="En" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <h3 mt={3} mb={3} style={{
                        margin: "10px 0 10px 0"
                    }}>
                        Text
                    </h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="8"
                        value={subTitleHy}
                        onChange={(e) => setSubTitleHy(e.target.value)}
                        maxLength="600"
                        cols="60"
                        defaultValue={data?.length == 0 ? null : data?.textHy}
                        className="textareaText"
                    />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <h3 mt={3} mb={3} style={{
                        margin: "10px 0 10px 0"
                    }}>
                        Text
                    </h3>
                    <textarea
                        id="w3review"
                        name="textRu"
                        rows="8"
                        value={subTitleRu}
                        onChange={(e) => setSubTitleRu(e.target.value)}
                        maxLength="600"
                        defaultValue={data?.length == 0 ? null : data?.textRu}
                        cols="60"
                        className="textareaText"
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h3 mt={3} mb={3} style={{
                        margin: "10px 0 10px 0"
                    }}>
                        Text
                    </h3>
                    <textarea
                        id="w3review"
                        name="textEn"
                        value={subTitleEn}
                        onChange={(e) => setSubTitleEn(e.target.value)}
                        rows="8"
                        maxLength="600"
                        defaultValue={data?.length == 0 ? null : data?.textEn}
                        cols="60"
                        className="textareaText"
                    />
                </TabPanel>
            </Box>
            <Box m={2}>
                {
                    imageOne !== null && (
                        <div>
                            <img src={imageOne} alt="one" style={{width: "150px", height: "150px"}}/>
                            <Button color="secondary" variant="contained" component="label" style={{
                                margin: "0 17px 35px 43px"
                            }}>
                                Edit
                                <input type="file" hidden multiple onChange={handleFile}/>
                            </Button>
                        </div>
                    )
                }
            </Box>
            <Box m={2}>
                {
                    imageTwo !== null && (
                        <div>
                            <img src={imageTwo} alt="one" style={{width: "150px", height: "150px"}}/>
                            <Button color="secondary" variant="contained" component="label" style={{
                                margin: "0 17px 35px 43px"
                            }}>
                                Edit
                                <input type="file" hidden multiple onChange={handleFileTwo}/>
                            </Button>
                        </div>
                    )
                }
            </Box>
            <Box m={2}>
                {
                    imageThree !== null && (
                        <div>
                            <img src={imageThree} alt="one" style={{width: "150px", height: "150px"}}/>
                            <Button color="secondary" variant="contained" component="label" style={{
                                margin: "0 17px 35px 43px"
                            }}>
                                Edit
                                <input type="file" hidden multiple onChange={handleFileThree}/>
                            </Button>
                        </div>
                    )
                }
            </Box>
            <Button color="secondary" variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default AboutUsDown;