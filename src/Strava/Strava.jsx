import React, { useState, useEffect } from "react";
import "./Strava.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import "antd/dist/antd.min.css";
import { List, Avatar } from "antd";
import { Card, Input, Image } from "antd";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Divider from "@mui/material/Divider";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IceSkatingIcon from "@mui/icons-material/IceSkating";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import EventIcon from "@mui/icons-material/Event";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Activityquery } from "../Apollo/queries";
import { Select, Radio } from "antd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsGymnasticsIcon from "@mui/icons-material/SportsBar";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
const { Option } = Select;
const data1 = [
  {
    title: (
      <>
        <p className="titleDiv">Robert</p>
      </>
    ),
    description: (
      <>
        <p className="subtitleDiv">Positivity always wins</p>
      </>
    ),
  },
];

const data2 = [
  {
    title: (
      <>
        <p className="titleDiv">Grayson</p>
      </>
    ),
    description: (
      <>
        <p className="subtitleDiv">Positivity always wins</p>
      </>
    ),
  },
];

const data3 = [
  {
    title: (
      <>
        <p className="titleDiv">James</p>
      </>
    ),
    description: (
      <>
        <p className="subtitleDiv">Positivity always wins</p>
      </>
    ),
  },
];
const data4 = [
  {
    title: (
      <>
        <p className="titleDiv">Steve Smith</p>
      </>
    ),
    description: (
      <>
        <p className="subtitleDiv">Australia</p>
      </>
    ),
  },
];
const data5 = [
  {
    title: (
      <>
        <p className="titleDiv">Alex Hales</p>
      </>
    ),
    description: (
      <>
        <p className="subtitleDiv">England</p>
      </>
    ),
  },
];

function Strava() {
  const [value, setValue] = React.useState(1);
  const [activities, setActivities] = React.useState([]);
  const [dropdwon1, setDropdwon1] = React.useState("Super Easy");
  const [dropdwon2, setDropdwon2] = React.useState("");

  const iconDictionary = {
    LAP_SWIMMING: <PoolIcon fontSize="large" />,
    STRENGTH_TRAINING: <FitnessCenterIcon fontSize="large" />,
    RUNNING: <DirectionsRunIcon fontSize="large" />,
    CYCLING: <DirectionsBikeIcon fontSize="large" />,
    VIRTUAL_RIDE: <PedalBikeIcon fontSize="large" />,
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Typography className="StravaDiv" noWrap component="div">
              <img
                src={process.env.PUBLIC_URL + "/360log.jpeg"}
                width="150"
                height={50}
              />
            </Typography>

            <div className="menuItems">
              <div style={{ color: "black", cursor: "pointer" }}>Dashboard</div>
              <KeyboardArrowDownIcon className="ArrowIcon" />
              <div style={{ color: "black", cursor: "pointer" }}>Training</div>
              <KeyboardArrowDownIcon className="ArrowIcon" />
              <div style={{ color: "black", cursor: "pointer" }}>Athlete</div>
              <KeyboardArrowDownIcon className="ArrowIcon" />
              <div style={{ color: "black", cursor: "pointer" }}>
                Applications
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
          <Col style={{ position: "absolute", width: "100%" }} span={8}>
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
                <div className="CalculationDiv">
                  <span className="spanDiv">
                    <p className="distanceDiv">Following</p>
                    <p className="distanceDiv1">33</p>
                  </span>
                  <span className="spanDiv1">
                    <p className="timeDiv">Followers</p>
                    <p className="timeDiv1">32</p>
                  </span>
                  <span>
                    <p className="stepDiv">Activities</p>
                    <p className="stepDiv1">1,583</p>
                  </span>
                </div>
                <Divider light />
                <p className="latestDiv">Latest Activities</p>
                <p className="ActivityDiv">
                  WEEK: 1 - Sessions#1 - Intervals - Today
                </p>
                <Divider light />
                <div className="LogIconDiv">
                  <p className="LogDiv">Your Training Log</p>
                  <IconButton className="LogIcon">
                    <ArrowForwardIosOutlinedIcon />
                  </IconButton>
                </div>
              </Card>
            </div>

            <div>
              <Card className="maincardDiv">
                <TabContext value={value}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="icon tabs example"
                  >
                    <Tab value="1" icon={<EventIcon />} aria-label="phone" />
                    <Tab
                      value="2"
                      icon={<IceSkatingIcon />}
                      aria-label="favorite"
                    />
                    <Tab
                      value="3"
                      icon={<DirectionsBikeIcon />}
                      aria-label="person"
                    />
                    <Tab
                      value="4"
                      icon={<SettingsInputComponentIcon />}
                      aria-label="person"
                    />
                  </Tabs>
                  <TabPanel value="1">Item One</TabPanel>
                  <TabPanel value="2">Item Two</TabPanel>
                  <TabPanel value="3">Item Three</TabPanel>
                  <TabPanel value="4">
                    <Card
                      style={{
                        textAlign: "start",
                        backgroundColor: "#e9e9e9",
                        marginBottom: "30px",
                      }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Card>
                    <b>THIS INDEX</b>
                    <h1 style={{ color: "green" }}>0 m</h1>
                  </TabPanel>
                </TabContext>
              </Card>
            </div>
          </Col>
          <Col
            style={{ position: "absolute", left: "35%", width: "100%" }}
            span={8}
          >
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
                      <IconButton className="mainavatarIcon">
                        <Avatar
                          shape="circle"
                          size={60}
                          src="https://joeschmoe.io/api/v1/random"
                        />
                      </IconButton>
                      <div>
                        <p className="nameDiv">{GarminActivityDescription}</p>
                        <p className="distanceDiv1">
                          {new Date(
                            GarminActivityStartTime
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="CalculationDiv">
                        <span className="spanDiv">
                          <p className="distanceDiv">Distance</p>
                          <p className="distanceDiv1">
                            {GarminActivityDistance}
                          </p>
                        </span>
                        <span className="spanDiv1">
                          <p className="timeDiv">Time</p>
                          <p className="timeDiv1">{GarminActivityStartTime}</p>
                        </span>
                        <span>
                          <p className="stepDiv">Avg Pace</p>
                          <p className="stepDiv1">
                            {GarminAveragePaceInMinutesPerKilometer}
                          </p>
                        </span>
                        <span>
                          <p className="stepDiv">Avg HR</p>
                          <p className="stepDiv1">
                            {GarminAverageHeartRateInBeatsPerMinute}
                          </p>
                        </span>
                      </div>
                      <Divider light />
                      <p className="latestDiv">Latest Activities</p>
                      <p className="ActivityDiv">
                        WEEK: 1 - Sessions#1 - Intervals - Today
                      </p>
                      <Divider light />
                      <div className="LogIconDiv">
                        <p className="LogDiv">Your Training Log</p>
                        <IconButton className="LogIcon">
                          <ArrowForwardIosOutlinedIcon />
                        </IconButton>
                      </div>
                    </Card>

                    <Card className="cardDiv1">
                      <Row>
                        <Col span={10}>
                          <Typography component="b">
                            {iconDictionary[GarminActivityType] ||
                              GarminActivityType}
                          </Typography>
                          <Typography> </Typography>
                          <Typography component="b">
                            {new Date(
                              GarminActivityStartTime
                            ).toLocaleDateString()}
                          </Typography>
                        </Col>
                        <Col span={14}>
                          <Typography style={{ fontWeight: 600 }}>
                            {GarminActivityDescription}
                          </Typography>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col
                          span={9}
                          style={{ "border-right": "1px solid grey" }}
                        >
                          <Typography>Distance: </Typography>
                          <Typography style={{ fontWeight: 600 }}>
                            {GarminActivityDistance}
                          </Typography>
                          <Typography>Time :</Typography>
                          <Typography style={{ fontWeight: 600 }}>
                            {GarminActivityDuration}
                          </Typography>
                          <Typography>Average Pace :</Typography>
                          <Typography style={{ fontWeight: 600 }}>
                            {GarminAveragePaceInMinutesPerKilometer}
                          </Typography>
                          <Typography>Average Heart rate :</Typography>
                          <Typography style={{ fontWeight: 600 }}>
                            {GarminAverageHeartRateInBeatsPerMinute}
                          </Typography>
                        </Col>
                        <Col span={15}>
                          <Box paddingX={3}>
                            <Typography>How hard was that?</Typography>
                            <Select
                              value={dropdwon1}
                              onChange={(e) => setDropdwon1(e)}
                              placeholder="ActivityEffort"
                              style={{ width: 200 }}
                            >
                              <Option value="SuperEasy">Super easy!</Option>

                              <Option value="SeriousSweat">
                                Serious sweat!
                              </Option>
                              <Option value="HardStrong">
                                Hard but strong!
                              </Option>
                              <Option value="Hurt">That hurt!</Option>
                              <Option value="Broke">Broke me!</Option>
                            </Select>
                          </Box>
                          <Box paddingX={3}>
                            <Typography>How's the body?</Typography>
                            <Select
                              value={dropdwon2}
                              onChange={(e) => setDropdwon2(e)}
                              placeholder="BodyFeedback"
                              style={{ width: 200 }}
                            >
                              <Option value="SuperStrong">
                                Super strong!
                              </Option>

                              <Option value="FeelGreat">Feel great</Option>
                              <Option value="GladDone">
                                Glad it’s done!
                              </Option>
                              <Option value="Sore">I'm sore!</Option>
                              <Option value="Broken">Broken!</Option>
                            </Select>
                            <Button>Save</Button>
                          </Box>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                );
              }
            )}
          </Col>
          <Col style={{ position: "absolute", left: "70%" }} span={8}>
            <div>
              <Row style={{ marginRight: "40px", marginTop: "35px" }}>
                <Col span={6}>
                  <Tooltip title="search">
                    <Button
                      shape="circle"
                      icon={<SearchOutlined />}
                      size="large"
                    />
                  </Tooltip>
                </Col>
                <Col span={18}>
                  <b style={{ justifyContent: "left", display: "flex" }}>
                    Challenges
                  </b>
                  <p style={{ textAlign: "start" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry.
                  </p>
                  <b
                    style={{
                      justifyContent: "left",
                      display: "flex",
                      color: "orangered",
                    }}
                  >
                    View All Challenges
                  </b>
                </Col>
              </Row>
            </div>
            <div
              style={{
                marginRight: "40px",
                marginTop: "35px",
                marginLeft: "40px",
              }}
            >
              <b style={{ justifyContent: "left", display: "flex" }}>
                Your Clubs
              </b>
              {/* <p style={{ textAlign:'start' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          </p> */}
              <div
                style={{
                  textAlign: "start",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <Image
                  width={80}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </div>
              <div style={{ textAlign: "start" }}>
                <Button>View All Clubs</Button>
              </div>
            </div>
            <div>
              <Row style={{ marginRight: "40px", marginTop: "35px" }}>
                <Col span={6}>
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
                    Try a Privacy Zone
                  </b>
                  <p style={{ textAlign: "start" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry.
                  </p>
                  <b
                    style={{
                      justifyContent: "left",
                      display: "flex",
                      color: "orangered",
                    }}
                  >
                    View All Privacy Zones
                  </b>
                </Col>
              </Row>
            </div>
            <div
              style={{
                marginRight: "40px",
                marginTop: "35px",
                marginLeft: "40px",
              }}
            >
              <b style={{ justifyContent: "left", display: "flex" }}>
                Suggested Friends
              </b>
              {/* <p style={{ textAlign:'start' }}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        </p> */}
              <div
                style={{
                  textAlign: "start",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={data4}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            shape="circle"
                            size={50}
                            src="https://joeschmoe.io/api/v1/random"
                          />
                        }
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
                <List
                  itemLayout="horizontal"
                  dataSource={data5}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            shape="circle"
                            size={50}
                            src="https://joeschmoe.io/api/v1/random"
                          />
                        }
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Strava;
