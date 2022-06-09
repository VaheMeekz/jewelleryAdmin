import React, {useEffect, useState} from 'react';
import {Box, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Terms = ({data}) => {
    const [currentId, setCurrentId] = useState(null)
    const [values, setValues] = useState(data)
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false)
    const [value, setValue] = useState(0);
    // add values
    const [subjectHy,setSubjectHy] = useState("")
    const [subjectRu,setSubjectRu] = useState("")
    const [subjectEn,setSubjectEn] = useState("")
    const [answerHy,setAnswerHy] = useState("")
    const [answerRu,setAnswerRu] = useState("")
    const [answerEn,setAnswerEn] = useState("")
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = () => setOpen(false);
    const handleCloseAdd = () => setOpenAdd(false)

    useEffect(() => {
        setValues(data)
    }, [data])

    const handeleDelete = () => {
        axios
            .post(
                `${baseUrl}/termData/delete`,
                {
                    id: currentId
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
                        title: "Deleted!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpen(false);
                    setValues(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleAdd = () => {
        axios
            .post(
                `${baseUrl}/termData`,
                {
                    subjectHy,subjectRu,subjectEn,answerHy,answerRu,answerEn
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
                    setOpenAdd(false);
                    setValues(response.data)
                    setSubjectHy("")
                    setSubjectRu("")
                    setSubjectEn("")
                    setAnswerHy("")
                    setAnswerRu("")
                    setAnswerEn("")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Box className="boxHeigth">
            <Box m={2}>
                <h3>Terms</h3>
            </Box>
            <Box m={2}>
                <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>Add</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Subject Hy</TableCell>
                            <TableCell align="left">Subject Ry</TableCell>
                            <TableCell align="left">Subject En</TableCell>
                            <TableCell align="left">Answer Hy</TableCell>
                            <TableCell align="left">Answer Ru</TableCell>
                            <TableCell align="left">Answer En</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values && values.map((row, idx) => (
                            <TableRow
                                key={idx}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left">{idx + 1}</TableCell>
                                <TableCell align="left">{row.subjectHy}</TableCell>
                                <TableCell align="left">{row.subjectRu}</TableCell>
                                <TableCell align="left">{row.subjectEn}</TableCell>
                                <TableCell align="left">{row.answerHy}</TableCell>
                                <TableCell align="left">{row.answerRu}</TableCell>
                                <TableCell align="left">{row.answerEn}</TableCell>
                                <TableCell align="left">
                                    <Button color="secondary" variant="outlined" onClick={() => {
                                        setCurrentId(row.id);
                                        setOpen(true)
                                    }}><DeleteIcon /></Button>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*delete*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete
                    </Typography>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handeleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
            {/*add*/}
            <Modal
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Item
                    </Typography>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} textColor="secondary"
                                      indicatorColor="secondary" aria-label="basic tabs example">
                                    <Tab label="Hy" {...a11yProps(0)} />
                                    <Tab label="Ru" {...a11yProps(1)} />
                                    <Tab label="En" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={subjectHy}
                                               onChange={e => setSubjectHy(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={answerHy}
                                    onChange={(e) => setAnswerHy(e.target.value)}
                                    placeholder="message"
                                    maxLength="200"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={subjectRu}
                                               onChange={e => setSubjectRu(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={answerRu}
                                    onChange={(e) => setAnswerRu(e.target.value)}
                                    placeholder="message"
                                    maxLength="200"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div style={{margin: "10px 0 10px 0"}}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" value={subjectEn}
                                               onChange={e => setSubjectEn(e.target.value)}/>
                                </div>
                                <textarea
                                    id="w3review"
                                    name="textHy"
                                    rows="4"
                                    value={answerEn}
                                    onChange={(e) => setAnswerEn(e.target.value)}
                                    placeholder="message"
                                    maxLength="200"
                                    cols="50"
                                    className="textareaText"
                                />
                            </TabPanel>
                        </Box>
                    <DialogActions>
                        <Button onClick={handleCloseAdd}>Cancle</Button>
                        <Button onClick={handleAdd} autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </Box>
    );
};

export default Terms;