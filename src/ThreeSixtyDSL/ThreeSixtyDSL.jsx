import React, { useState, useEffect } from "react";
import "./ThreeSixtyDSL.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";
// import Button from '@mui/material/Button';
// import SearchIcon from "@mui/icons-material/Search";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
// import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import "antd/dist/antd.min.css";
import { Avatar } from "antd";
import { Card } from "antd";
//  import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Divider from "@mui/material/Divider";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import IceSkatingIcon from "@mui/icons-material/IceSkating";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
// import EventIcon from "@mui/icons-material/Event";
// import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
// import TabPanel from "@mui/lab/TabPanel";
// import TabContext from "@mui/lab/TabContext";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Activityquery } from "../Apollo/queries";
import { Select } from "antd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import SportsGymnasticsIcon from "@mui/icons-material/SportsBar";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
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
  // const [value, setValue] = React.useState(1);
  const [activities, setActivities] = React.useState([]);
  const [dropdownActivityEffort, setDropdownActivityEffort] =
    React.useState("Great workout");
  const [dropdownBody, setDropdownBody] = React.useState("Feels great");
  const [dropdownSleep, setDropdownSleep] = React.useState("8 Hours Plus");
  const [dropdownWorkLifeStress, setDropdownWorkLifeStress] =
    React.useState("Perfect balance");
  const [dropdownInjury, setDropdownInjury] = React.useState("No");

  const iconDictionary = {
    LAP_SWIMMING: <PoolIcon fontSize="large" />,
    STRENGTH_TRAINING: <FitnessCenterIcon fontSize="large" />,
    RUNNING: <DirectionsRunIcon fontSize="large" />,
    CYCLING: <DirectionsBikeIcon fontSize="large" />,
    VIRTUAL_RIDE: <PedalBikeIcon fontSize="large" />,
  };
  /*
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
*/
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

  async function fetchActivities() {
    try {
      const activity = await API.graphql(graphqlOperation(Activityquery));
      console.log(activity.data.activitiesgarminByGarminAccountId.items);
      setActivities(activity.data.activitiesgarminByGarminAccountId.items);
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
              <div>
                <a href="/ThirdParty.jsx" className="menuItems">
                  3rd Parties
                </a>
              </div>
              <KeyboardArrowDownIcon className="ArrowIcon" />
              <div>
                <a href="/#" className="menuItems">
                  Athlete
                </a>
              </div>

              <KeyboardArrowDownIcon className="ArrowIcon" />
            </div>
            <div className="rightDiv">
              <IconButton className="avatarIcon">
                <Avatar
                  shape="circle"
                  size={37}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </IconButton>
              <KeyboardArrowDownIcon className="ArrowIcon" />
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <div className="bodyDiv">
        <Row>
          <Col className="firstCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            <div>
              <Card className="maincardDiv">
                <IconButton className="mainavatarIcon">
                  <Avatar
                    shape="circle"
                    size={60}
                    src="https://joeschmoe.io/api/v1/random"
                  />
                </IconButton>
                <div>
                  <p className="nameDiv">Athlete A</p>
                </div>
                <div className="calculationDiv">
                  <span className="spanDiv">
                    <p className="metricHead">Following</p>
                    <p className="metricValue">33</p>
                  </span>
                  <span className="spanDiv">
                    <p className="metricHead">Followers</p>
                    <p className="metricValue">32</p>
                  </span>
                  <span className="spanDiv">
                    <p className="metricHead">Activities</p>
                    <p className="metricValue">1,583</p>
                  </span>
                </div>
                <Divider light />
                <p></p>

                <b
                  style={{
                    justifyContent: "left",
                    display: "flex",
                    color: "crimson",
                  }}
                >
                  Third Party Applications
                </b>
                <p></p>
                <div>
                  <a href="https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification">
                    Connect your TP account
                  </a>
                </div>
                <div>
                  <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://6kjj2t9ega.execute-api.us-east-1.amazonaws.com/staging/oauthexchange">
                    Connect your Strava account
                  </a>
                </div>

                <div>
                  <a
                    href={`https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/?userId=${userId}`}
                  >
                    Connect your Garmin account
                  </a>
                </div>
              </Card>
            </div>

            <div></div>
          </Col>
          <Col className="secondCol" span={8} xs={24} sm={24} lg={8} xl={8}>
            {activities.map(
              ({
                GarminActivityType,
                GarminActivityDescription,
                GarminAveragePaceInMinutesPerKilometer,
                GarminActivityStartTime,
                GarminActivityDuration,
                GarminActivityDistance,
                GarminAverageHeartRateInBeatsPerMinute,
              }) => {
                return (
                  <div className="cardSpacingDiv">
                    <Card className="maincardDiv">
                      <div className="activityDiv">
                        <span className="activitySpan">
                          <IconButton className="activityAvator">
                            <Avatar
                              // className="activityAvator"
                              shape="circle"
                              size={60}
                              // style={{lineHeight : "76px !important"}}
                            >
                              {iconDictionary[GarminActivityType] ||
                                GarminActivityType}
                            </Avatar>
                          </IconButton>
                          {/* <IconButton className="activityIcon">
                        <Typography component="b">
                          {iconDictionary[GarminActivityType] ||
                            GarminActivityType}
                        </Typography>
                      </IconButton> */}
                        </span>

                        <span className="activityHead">
                          <p>{GarminActivityDescription}</p>
                          <p className="metricValue">
                            {moment(
                              new Date(GarminActivityStartTime * 1000)
                            ).format("DD/MM/YYYY HH:MM")}
                          </p>
                        </span>
                      </div>

                      <div className="metricDiv">
                        <span className="metricSpan">
                          <p className="metricHead">Distance(km)</p>
                          <p className="metricValue">
                            {(GarminActivityDistance / 1000).toFixed(2)}
                          </p>
                        </span>
                        <span className="metricSpan">
                          <p className="metricHead">Time</p>
                          <p className="metricValue">
                            {secondsToHms(GarminActivityDuration)}
                          </p>
                        </span>
                        <span className="metricSpan">
                          <p className="metricHead">Pace</p>
                          <p className="metricValue">
                            {MinPerKmFraction(
                              GarminAveragePaceInMinutesPerKilometer,
                              GarminActivityType
                            )}
                          </p>
                        </span>
                        <span className="metricSpan">
                          <p className="metricHead">Avg HR</p>
                          <p className="metricValue">
                            {Math.round(GarminAverageHeartRateInBeatsPerMinute)}
                          </p>
                        </span>
                      </div>
                      <Divider light />
                      <Box padding={2}>
                        <Typography className="dropDownLabel">
                          How was it?
                        </Typography>
                        <Select
                          value={dropdownActivityEffort}
                          onChange={(e) => setDropdownActivityEffort(e)}
                          placeholder="ActivityEffort"
                          style={{ width: "100%" }}
                        >
                          <Option value="SuperEasy">Super easy</Option>

                          <Option value="GoodSweat">Good sweat</Option>
                          <Option value="Great">Great workout</Option>
                          <Option value="Hurt">That hurt!</Option>
                          <Option value="Broke">Broke me!</Option>
                        </Select>
                      </Box>
                      <Divider light />
                      <Box padding={2}>
                        <Typography className="dropDownLabel">
                          How's the body?
                        </Typography>
                        <Select
                          value={dropdownBody}
                          onChange={(e) => setDropdownBody(e)}
                          placeholder="BodyFeedback"
                          style={{ width: "100%" }}
                        >
                          <Option value="SuperStrong">Super strong</Option>

                          <Option value="FeelGreat">Feels great</Option>
                          <Option value="NotBad">Not too bad</Option>
                          <Option value="Sore">I'm sore!</Option>
                          <Option value="Broken">Broken!</Option>
                        </Select>
                        <Box mt={1}>
                          <Button>Save</Button>
                        </Box>
                      </Box>
                    </Card>
                  </div>
                );
              }
            )}
          </Col>

          <Col className="thirdCol" span={8} xs={24} sm={24}>
            <div>
              <Row style={{ marginRight: "40px", marginTop: "35px" }}>
                <Col span={18}>
                  <b
                    style={{
                      justifyContent: "left",
                      display: "flex",
                      color: "crimson",
                    }}
                  >
                    Overall Health
                  </b>
                  <p style={{ textAlign: "start", marginTop: "10px" }}>
                    Sleep is a key input factor to productive training and
                    success!
                  </p>
                  <p style={{ textAlign: "start", marginTop: "10px" }}>
                    Work / Life balance has a huge effect on your ability to
                    train effectively.
                  </p>
                  <b
                    style={{
                      justifyContent: "left",
                      display: "flex",
                      color: "crimson",
                    }}
                  >
                    Select and Save
                  </b>
                  <Box paddingX={0}>
                    <Typography>Are you injured?</Typography>
                    <Select
                      value={dropdownInjury}
                      onChange={(e) => setDropdownInjury(e)}
                      placeholder="InjuryFeedback"
                      style={{ width: 200 }}
                    >
                      <Option value="InjuryNo">No</Option>
                      <Option value="InuryYesNoTrain">
                        Yes - cannot train
                      </Option>
                      <Option value="InjuryYesLightTraining">
                        Yes - light training
                      </Option>
                    </Select>
                  </Box>

                  <Box paddingX={0}>
                    <Typography>Average sleep per night?</Typography>
                    <Select
                      value={dropdownSleep}
                      onChange={(e) => setDropdownSleep(e)}
                      placeholder="SleepFeedback"
                      style={{ width: 200 }}
                    >
                      <Option value="HardlyAny">Hardly any</Option>
                      <Option value="6Less">Less Than 6</Option>
                      <Option value="6To8">6-8 Hours</Option>
                      <Option value="8HoursPlus">8 Hours Plus</Option>
                    </Select>
                  </Box>

                  <Box paddingX={0}>
                    <Typography>Recent Work / Life stress??</Typography>
                    <Select
                      value={dropdownWorkLifeStress}
                      onChange={(e) => setDropdownWorkLifeStress(e)}
                      placeholder="WorkLifeStressFeedback"
                      style={{ width: 200 }}
                    >
                      <Option value="ZeroStress">Zero stress!</Option>
                      <Option value="PerfectStress">Perfect balance</Option>
                      <Option value="OverStress">Over stressed!</Option>
                      <Option value="InsaneStress">Insanely stressed!</Option>
                    </Select>
                  </Box>
                  <p></p>
                  <Button>Save Feedback</Button>
                </Col>
              </Row>
            </div>

            <div
              style={{
                marginRight: "40px",
                marginTop: "35px",
                marginLeft: "40px",
              }}
            ></div>
            <div>
              <Row style={{ marginRight: "40px", marginTop: "35px" }}>
                <Col span={4}>
                  <Tooltip title="Privacy">
                    <Button
                      shape="circle"
                      icon={<EyeOutlined />}
                      size="large"
                    />
                  </Tooltip>
                </Col>
                <Col span={18}>
                  <b style={{ justifyContent: "left", display: "flex" }}>
                    Privacy
                  </b>
                  <p style={{ textAlign: "start" }}>
                    All your personal data and training information will never
                    be shared with any 3rd parties.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ThreeSixtyDSL;
