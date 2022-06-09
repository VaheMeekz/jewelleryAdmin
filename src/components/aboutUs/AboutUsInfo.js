import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Button, TextField} from "@mui/material";
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

const AboutUsInfo = ({aboutUsInfo, setRend, rend}) => {
    const [infoData, setInfoData] = useState({
        textEn: "",
        textHy: "",
        textRu: "",
        titleEn: "",
        titleHy: "",
        titleRu: ""
    });
    const [infoOpen, setInfoOpen] = useState(0);
    const handleOpenInfoTabs = (event, newValue) => {
        setInfoOpen(newValue);
    };

    const handleInfoChangeValues = (e) => {
        infoData[e.target.name] = e.target.value;
        setInfoData(infoData);
    };
    const handleAddInfo = () => {
        axios
            .post(`${baseUrl}/aboutUsInfo/`, infoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setRend(!rend);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <Box m={3}>
            <h2 mt={3} mb={3}>
                About Us Info Settings
            </h2>
            <Box sx={{width: "100%"}}>
                {aboutUsInfo.map((i, index) => {
                    return (
                        <div key={index}>
                            <p>
                                <strong>{index + 1}</strong>
                            </p>
                            <hr className="hrLine"/>
                            <h3>{i.titleHy}</h3>
                            <p>{i.textHy}</p>
                            <h3>{i.titleRu}</h3>
                            <p>{i.textRu}</p>
                            <h3>{i.titleEn}</h3>
                            <p>{i.textEn}</p>
                            <hr/>
                        </div>
                    );
                })}
            </Box>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={infoOpen}
                        onChange={handleOpenInfoTabs}
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Hy" {...a11yProps(0)} />
                        <Tab label="Ru" {...a11yProps(1)} />
                        <Tab label="En" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={infoOpen} index={0}>
                    <TextField
                        id="standard-basic"
                        // defaultValue={""}
                        defaultValue={infoData.titleHy}
                        name="titleHy"
                        onChange={handleInfoChangeValues}
                        label="Hy"
                        variant="standard"
                    />
                    <br/>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="8"
                        onChange={handleInfoChangeValues}
                        maxLength="600"
                        cols="60"
                        // defaultValue={aboutUsInfo.textHy}
                        defaultValue={infoData.textHy}
                        className="textareaText"
                    />
                </TabPanel>
                <TabPanel value={infoOpen} index={1}>
                    <TextField
                        id="standard-basic"
                        // defaultValue={aboutUsInfo.titleRu}
                        defaultValue={infoData.titleRu}
                        name="titleRu"
                        onChange={handleInfoChangeValues}
                        label="Ru"
                        variant="standard"
                    />
                    <br/>
                    <textarea
                        id="w3review"
                        name="textRu"
                        rows="8"
                        onChange={handleInfoChangeValues}
                        maxLength="600"
                        cols="60"
                        // defaultValue={aboutUsInfo.textRu}
                        defaultValue={infoData.textRu}
                        className="textareaText"
                    />
                </TabPanel>
                <TabPanel value={infoOpen} index={2}>
                    <TextField
                        id="standard-basic"
                        // defaultValue={aboutUsInfo.titleEn}
                        defaultValue={infoData.titleEn}
                        name="titleEn"
                        onChange={handleInfoChangeValues}
                        label="En"
                        variant="standard"
                    />
                    <br/>
                    <textarea
                        id="w3review"
                        name="textEn"
                        rows="8"
                        onChange={handleInfoChangeValues}
                        maxLength="600"
                        cols="60"
                        // defaultValue={aboutUsInfo.textEn}
                        defaultValue={infoData.textEn}
                        className="textareaText"
                    />
                </TabPanel>
            </Box>
            <Button color="secondary" variant="contained" onClick={handleAddInfo}>
                Submit
            </Button>

        </Box>
    );
};

export default AboutUsInfo;