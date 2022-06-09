import React,{useState} from "react";
import "./navbar.scss";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import {thchangeAuAC} from "../../store/actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import axios from "axios";
import {baseUrl, email, token} from "../../config/config";
import Swal from "sweetalert2";

const Navbar = ({ close, setClose }) => {
  const dis = useDispatch()
  const isAuth = useSelector(state => state.isAuthReducer.isAuth)
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dis(thchangeAuAC(false));
    localStorage.removeItem("myToken")
    localStorage.removeItem("email")
    axios
        .post(
            `${baseUrl}/admin/logout`,
            {
              email
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
              title: "Success",
              showConfirmButton: false,
              timer: 1500,
            });
            if(response.data.answer){
              navigate('/')
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });

  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <Tooltip title="Sidebar" arrow>
          {close ? (

            <CloseIcon onClick={() => setClose(!close)} style={{
              cursor:"pointer"
            }}/>
          ) : (
            <ClearAllIcon onClick={() => setClose(!close)} style={{
              cursor:"pointer"
            }}/>
          )}</Tooltip>
        </div>
        <div className="items">
          <div className="item">
          </div>
          {isAuth && (
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="image"
              className="avatar"
              onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
              <MenuItem onClick={handleLogOut}><LogoutIcon/>Logout</MenuItem>
            </Menu>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
