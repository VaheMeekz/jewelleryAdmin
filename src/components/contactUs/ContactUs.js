import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeArray } from "../../helpers/makeArray";
import { getContactsThunk } from "../../store/actions/contactUsAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { baseUrl, token } from "../../config/config";
import Swal from "sweetalert2";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
const ContactUs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.contactUsReducer.contacts);
  const count = useSelector((state) => state?.contactUsReducer.count);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const limit = 4;
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    dispatch(getContactsThunk(page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)));
    }
  }, [count, limit]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDlete = () => {
    setOpenDelete(false);
  };

  const handleSendAnswer = () => {
    if (subject == "" && message == "") {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      axios
        .post(
          `${baseUrl}/contactUs/sendAnswer`,
          {
            id: currentId,
            subject,
            message,
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
              title: "Sended",
              showConfirmButton: false,
              timer: 1500,
            });
            setOpen(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handelDelete = () => {
    axios
      .post(
        `${baseUrl}/contactUs/delete`,
        {
          id: currentId,
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
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setOpenDelete(false);
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
    <Box m={3} className="boxHeigth">
      <h2 mt={3} mb={3}>
        Contacts
      </h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>#</strong>
              </TableCell>
              <TableCell align="left">
                <strong>name</strong>
              </TableCell>
              <TableCell align="left">
                <strong>email</strong>
              </TableCell>
              <TableCell align="left">
                <strong>subject</strong>
              </TableCell>
              <TableCell align="left">
                <strong>message</strong>
              </TableCell>
              <TableCell align="left">
                <strong>answer</strong>
              </TableCell>
              <TableCell align="left">
                <strong>delete</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== null &&
              data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.subject}</TableCell>
                  <TableCell align="left">{row.message}</TableCell>
                  <TableCell align="left" className="delBtn">
                    <Button variant="outlined" color="secondary"  onClick={() => {
                      setCurrentId(row.id);
                      setOpen(true);
                    }}>                    <MarkEmailReadIcon/>
                    </Button>
                  </TableCell>
                  <TableCell align="left" className="delBtn">
                    <Button variant="outlined" color="secondary" onClick={() => {
                      setCurrentId(row.id);
                      setOpenDelete(true);
                    }}>                    <DeleteIcon/>
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3}>
        <div className="pagBox">
          <div className="arrowBack">
            {pages.length - 1 == page ? (
              <ArrowBackIcon
                onClick={() => {
                  setPage(page - 1);
                }}
              />
            ) : null}
          </div>
          {pages.length > 1 &&
            pages.map((s) => {
              return (
                <div
                  className={page === s ? "ActivePagItem" : "pagItem"}
                  key={s}
                  onClick={() => {
                    setPage(s);
                  }}
                  style={{
                    cursor:"pointer"
                  }}
                >
                  {s + 1}
                </div>
              );
            })}
          <div className="arrowBack">
            {pages.length - 1 == page ? null : (
              <ArrowForwardIcon
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            )}
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Send Answer"}</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              label="Subject"
              variant="standard"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <br />
            <textarea
              id="w3review"
              name="textHy"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              maxlength="200"
              cols="50"
              className="textareaText"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleSendAnswer} autoFocus>
              Send
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDelete}
          onClose={handleCloseDlete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete ?"}</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDlete}>No</Button>
            <Button onClick={handelDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ContactUs;
