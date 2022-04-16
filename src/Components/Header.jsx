import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "antd/dist/antd.min.css";
import { Avatar } from "antd";
import { Auth } from 'aws-amplify';

export default function Header({user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [thirdanchorEl, setTHirdAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const thidPartyMenu = Boolean(thirdanchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const signOut = async () => {
    try {
        await Auth.signOut();
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickThirdParty = (event) => {
    setTHirdAnchorEl(event.currentTarget);
  };
  const handleCloseThirdParty = () => {
    setTHirdAnchorEl(null);
  };

  return (
    <AppBar className="headerDiv">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography className="ThreeSixtyDSLDiv" noWrap component="div">
              <img
                src={process.env.PUBLIC_URL + "/360log.jpeg"}
                width="150"
                height={50}
              />
            </Typography>

            <div className="menuItems">
              <div>
                <a href="/#" className="menuItems">
                  Dashboard
                </a>
              </div>
              <KeyboardArrowDownIcon className="ArrowIcon" />
              <div>
                <a href="/#" className="menuItems">
                  Training
                </a>
              </div>
              <KeyboardArrowDownIcon className="ArrowIcon" />
              <div
                id="thirdParties"
                aria-controls={thidPartyMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={thidPartyMenu ? "true" : undefined}
                onClick={handleClickThirdParty}
              >
                <p className="menuItems">3rd Parties</p>
              </div>
              <KeyboardArrowDownIcon
                // id="thirdParties"
                aria-controls={thidPartyMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={thidPartyMenu ? "true" : undefined}
                onClick={handleClickThirdParty}
                className="ArrowIcon"
              />
              <Menu
                id="thirdParties"
                anchorEl={thirdanchorEl}
                open={thidPartyMenu}
                onClose={handleCloseThirdParty}
                MenuListProps={{
                  "aria-labelledby": "thirdParties",
                }}
              >
                {/* <MenuItem onClick={handleCloseThirdParty} disabled>
                  <b
                    style={{
                      justifyContent: "left",
                      display: "flex",
                      color: "crimson",
                    }}
                  >
                    Third Party Applications
                  </b>
                </MenuItem> */}
                <MenuItem onClick={handleCloseThirdParty}>
                  <div>
                    <a  href="https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification" target="_blank">
                      Connect your TP account
                    </a>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleCloseThirdParty}>
                  <div>
                    <a
                      href={`https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/?userId=${user}`} target="_blank">
                    >
                      Connect your Garmin account
                    </a>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleCloseThirdParty}>
                  <div>
                    <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://6kjj2t9ega.execute-api.us-east-1.amazonaws.com/staging/oauthexchange" target="_blank">
                      Connect your Strava account
                    </a>
                  </div>
                </MenuItem>
              </Menu>
            </div>
            <div className="rightDiv">
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="avatarIcon"
              >
                <Avatar
                  shape="circle"
                  size={37}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </IconButton>
              <KeyboardArrowDownIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="ArrowIcon"
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
  );
}