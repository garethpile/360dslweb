import React, { useState, useEffect } from "react";
import "./ThreeSixtyDSL.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import "antd/dist/antd.min.css";
import { Avatar } from "antd";
import { Card } from "antd";
import Divider from "@mui/material/Divider";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Activityquery } from "../Apollo/queries";
import { Select } from "antd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TermsConditions from "../Components/TermsConditions";
import AthleteFeedback from "../Components/AthleteFeedback";
import ThirdParty from "../Components/ThirdParty";
import AthleteCard from "../Components/AthleteCard";
import ActivityCard from "../Components/ActivityCard";
const { Option } = Select;

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? ":" : "") : "";
  return hDisplay + mDisplay + sDisplay;
}

function MinPerKmFraction(MinPerKm, GarminActivityType) {
  switch (GarminActivityType) {
    case "LAP_SWIMMING":
      MinPerKm = Number(MinPerKm);
      var SecPerHundred = (MinPerKm / 10) * 60;
      var Mins = Math.floor(SecPerHundred / 60);
      var Secs = Math.floor(SecPerHundred - Mins * 60);
      return Mins + ":" + Secs;
    case "STRENGTH_TRAINING":
      return "-";
    case "RUNNING": {
      MinPerKm = Number(MinPerKm);
      var mins = Math.floor(MinPerKm / 1);
      var fraction = Math.floor((MinPerKm - mins) * 60);
      return mins + ":" + fraction;
    }
    case "CYCLING":
      MinPerKm = Number(MinPerKm);
      var KmPerHr = (1 / MinPerKm) * 60;
      return KmPerHr.toFixed(2);
    case "VIRTUAL_RIDE":
      MinPerKm = Number(MinPerKm);
      var KmPerHr = (1 / MinPerKm) * 60;
      return KmPerHr.toFixed(2);
    default:
      return "-";
  }
}

function ThreeSixtyDSL() {
  const [activities, setActivities] = React.useState([]);
  const [dropdownActivityEffort, setDropdownActivityEffort] =
    React.useState("");
  const [dropdownActivityBody, setDropdownActivityBody] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [thirdanchorEl, setTHirdAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const thidPartyMenu = Boolean(thirdanchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickThirdParty = (event) => {
    setTHirdAnchorEl(event.currentTarget);
  };
  const handleCloseThirdParty = () => {
    setTHirdAnchorEl(null);
  };
  const iconDictionary = {
    LAP_SWIMMING: <PoolIcon fontSize="large" />,
    STRENGTH_TRAINING: <FitnessCenterIcon fontSize="large" />,
    RUNNING: <DirectionsRunIcon fontSize="large" />,
    CYCLING: <DirectionsBikeIcon fontSize="large" />,
    VIRTUAL_RIDE: <PedalBikeIcon fontSize="large" />,
  };

  const [userId, setUserId] = useState("");
  // const { loading, error, data } = useQuery(firstQuery)

  useEffect(() => {
    // Obtain current logged in Amplify user userId which needs to be passed into Garmin URL later
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        // userId = user.username;
        setUserId(user.username);
        console.log("Current userId: ", user.username); // This works and userId visible ...
      })
      .catch((err) => console.log(err));
  }, []);

  const sortDesByDate = (a, b) => {
    if (new Date(a.updatedAt) > new Date(b.updatedAt)) {
      return -1;
    }
    if (new Date(a.updatedAt) < new Date(b.updatedAt)) {
      return 1;
    }
    return 0;
  };
  async function fetchActivities() {
    try {
      const activity = await API.graphql(graphqlOperation(Activityquery));
      console.log(activity.data.activitiesgarminByGarminAccountId.items);
      let sorted =
        activity.data.activitiesgarminByGarminAccountId.items.sort(
          sortDesByDate
        );
      sorted = sorted.filter(
        (exr) =>
          !exr.GarminActivityAthleteFeedback ||
          exr.GarminActivityAthleteFeedback != 1
      );
      setActivities(sorted.slice(0, 10));
    } catch (err) {
      console.log("Error fetching activities");
    }
  }
  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <div>
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
                    <a href="https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification">
                      Connect your TP account
                    </a>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleCloseThirdParty}>
                  <div>
                    <a
                      href={`https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/?userId=${userId}`}
                    >
                      Connect your Garmin account
                    </a>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleCloseThirdParty}>
                  <div>
                    <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://6kjj2t9ega.execute-api.us-east-1.amazonaws.com/staging/oauthexchange">
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
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <div className="bodyDiv">
        <Row>
          <Col className="firstCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            <AthleteCard />
          </Col>
          <Col className="secondCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            <h1
              style={{
                justifyContent: "center",
                display: "flex",
                color: "crimson",
              }}
            >
              Activity Feedback Corner
            </h1>
            {activities.map(
              ({
                id,
                GarminActivityId,
                GarminActivityType,
                GarminActivityDescription,
                GarminAveragePaceInMinutesPerKilometer,
                GarminActivityStartTime,
                GarminActivityDuration,
                GarminActivityDistance,
                GarminAverageHeartRateInBeatsPerMinute,
                GarminActivityAthleteBody,
                GarminActivityAthleteEffort,
              }) => {
                <div key={id} className="cardSpacingDiv">
                  <ActivityCard
                    id={id}
                    GarminActivityType={GarminActivityType}
                    GarminActivityDescription={GarminActivityDescription}
                    GarminAveragePaceInMinutesPerKilometer={
                      GarminAveragePaceInMinutesPerKilometer
                    }
                    GarminActivityStartTime={GarminActivityStartTime}
                    GarminActivityDuration={GarminActivityDuration}
                    GarminActivityDistance={GarminActivityDistance}
                    GarminAverageHeartRateInBeatsPerMinute={
                      GarminAverageHeartRateInBeatsPerMinute
                    }
                    GarminActivityAthleteBody={GarminActivityAthleteBody}
                    GarminActivityAthleteEffort={GarminActivityAthleteEffort}
                  />
                </div>;

                return (
                  <div className="cardSpacingDiv">
                    <ActivityCard
                      id={id}
                      GarminActivityType={GarminActivityType}
                      GarminActivityDescription={GarminActivityDescription}
                      GarminAveragePaceInMinutesPerKilometer={
                        GarminAveragePaceInMinutesPerKilometer
                      }
                      GarminActivityStartTime={GarminActivityStartTime}
                      GarminActivityDuration={GarminActivityDuration}
                      GarminActivityDistance={GarminActivityDistance}
                      GarminAverageHeartRateInBeatsPerMinute={
                        GarminAverageHeartRateInBeatsPerMinute
                      }
                      GarminActivityAthleteBody={GarminActivityAthleteBody}
                      GarminActivityAthleteEffort={GarminActivityAthleteEffort}
                    />
                  </div>
                );
              }
            )}
          </Col>

          <Col className="thirdCol" span={8} xs={24} sm={24}>
            <AthleteFeedback />
            <div
              style={{
                marginRight: "40px",
                marginTop: "35px",
                marginLeft: "40px",
              }}
            ></div>
            <TermsConditions />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ThreeSixtyDSL;
