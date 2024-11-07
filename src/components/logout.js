import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import LogoutIcon from "@mui/icons-material/Logout";
import LogOff from "@mui/icons-material/Login";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Logout({ username }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const open = Boolean(anchorEl);

  useEffect(() => {
    const name = username?.split("@")?.[0];
    setName(name);
  }, [username]);

  const onLogout = () => {};

  const handleClick = async (event) => {
    await signOut();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <LogoutIcon onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        style={{ marginTop: "5px", left: "-30px" }}
      >
        <div className="menuContainer">
          <Typography
            appearance="body-m"
            color="primary-grey-100"
            classNames="text"
          >
            {name}
          </Typography>
          <Typography
            appearance="body-xs"
            color="primary-grey-80"
            classNames="text"
          >
            {username}
          </Typography>
          <hr />
          <Button
            kind={"tertiary"}
            handleClick={() => {
              handleClose();
              onLogout();
            }}
            classNames="logout_button"
            startIcon={<Image src={LogOff} alt="" className="logout_icon" />}
            label="Logout"
          />
        </div>
      </Menu>
    </>
  );
}

Logout.defaultProps = {
  username: "",
  onLogout: () => {},
};

Logout.propTypes = {
  username: PropTypes.string,
  onLogout: PropTypes.func,
};

export default Logout;
