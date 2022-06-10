import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const HomeImageItem = ({data}) => {
    const [value, setValue] = React.useState(0);
    const [textHy, setTextHy] = useState(data?.textHy)
    const [textRu, setTextRu] = useState(data?.textRu)
    const [textEn, setTextEn] = useState(data?.textEn)
    const [image, setImage] = useState(data?.image)
    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                setImage(res.data.url)
            });
    }

    const handleSubmit = () => {
        axios
            .post(
                `${baseUrl}/homeBanner/editSlide`,
                {
                    id: data.id, image, textHy, textRu, textEn
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
    }

    return (
        <div>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Hy" {...a11yProps(0)} />
                        <Tab label="Ru" {...a11yProps(1)} />
                        <Tab label="En" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                     <textarea
                         id="w3review"
                         name="textHy"
                         rows="8"
                         value={textHy}
                         onChange={(e) => setTextHy(e.target.value)}
                         maxLength="600"
                         cols="60"
                         defaultValue={data?.length == 0 ? null : data?.textHy}
                         className="textareaText"
                     />
                </TabPanel>
                <TabPanel value={value} index={1}>
                     <textarea
                         id="w3review"
                         name="textHy"
                         rows="8"
                         value={textRu}
                         onChange={(e) => setTextRu(e.target.value)}
                         maxLength="600"
                         cols="60"
                         defaultValue={data?.length == 0 ? null : data?.textRu}
                         className="textareaText"
                     />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="8"
                        value={textEn}
                        onChange={(e) => setTextEn(e.target.value)}
                        maxLength="600"
                        cols="60"
                        defaultValue={data?.length == 0 ? null : data?.textEn}
                        className="textareaText"
                    />
                </TabPanel>
                <Box>
                    {
                        image && (
                            <div>
                                <img src={image} alt="banner"/>
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
                <Box>
                    <Button color="secondary" variant="contained" component="label"
                            onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </div>
    );
};

export default HomeImageItem;