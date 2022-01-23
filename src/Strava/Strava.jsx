import React, {useState } from 'react';
import './Strava.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import 'antd/dist/antd.min.css';
import { List, Avatar } from 'antd';
import { Card, Input , Image } from 'antd';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Divider from '@mui/material/Divider';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Row, Col } from 'antd';
import { Button, Tooltip } from 'antd';
import { SearchOutlined ,EyeOutlined} from '@ant-design/icons';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IceSkatingIcon from '@mui/icons-material/IceSkating';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import EventIcon from '@mui/icons-material/Event';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';



const data1 = [
  {
    title: <><p className='titleDiv'>Robert</p></>,
    description: <><p className='subtitleDiv'>Positivity always wins</p></>
  }
];

const data2 = [
  {
    title: <><p className='titleDiv'>Grayson</p></>,
    description: <><p className='subtitleDiv'>Positivity always wins</p></>
  }
];

const data3 = [
  {
    title: <><p className='titleDiv'>James</p></>,
    description: <><p className='subtitleDiv'>Positivity always wins</p></>
  }
];
const data4 = [
  {
    title: <><p className='titleDiv'>Steve Smith</p></>,
    description: <><p className='subtitleDiv'>Australia</p></>
  }
];
const data5 = [
  {
    title: <><p className='titleDiv'>Alex Hales</p></>,
    description: <><p className='subtitleDiv'>England</p></>
  }
];

function Strava() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar className="headerDiv">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
            <Typography
              className="StravaDiv"
              noWrap
              component="div"
            >
              STRAVA
            </Typography>
            <IconButton className="searchDiv" size="large" aria-label="search">
              <SearchIcon className="searchIcon"/>
            </IconButton>
            <div className='menuItems' >
            <div style={{ color:'black', cursor:'pointer' }}>
              Dashboard
            </div>
            <KeyboardArrowDownIcon className="ArrowIcon"/>
            <div style={{ color:'black', cursor:'pointer' }}>
              Training
            </div>
            <KeyboardArrowDownIcon className="ArrowIcon"/>
            <div style={{ color:'black', cursor:'pointer' }}>
              Explore
            </div>
            <KeyboardArrowDownIcon className="ArrowIcon"/>
            <div style={{ color:'black', cursor:'pointer'}}>
              Challenges
            </div>
            <KeyboardArrowDownIcon className="ArrowIcon"/>
            </div>
            <div className="rightDiv">
            <Typography>
              <Button className="buttonDiv">
                 Subscribe
              </Button>
            </Typography>
            <NotificationsNoneIcon className="notificationIcon"/>
            <IconButton className="avatarIcon">
              <Avatar shape="circle" size={37} src="https://joeschmoe.io/api/v1/random" />
              </IconButton> 
              <KeyboardArrowDownIcon className="ArrowIcon"/>
            <AddCircleOutlineIcon className="addIcon"/>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
     
                  <div className='bodyDiv'>
                  <Row>
                    <Col span={8}>
                    <div>
                      <Card className="maincardDiv">
                      <IconButton className="mainavatarIcon">
                          <Avatar shape="circle" size={60} src="https://joeschmoe.io/api/v1/random" />
                          </IconButton>  
                          <div><p className="nameDiv">Daryl Gehlig</p></div>
                          <div className="CalculationDiv">
                                  <span className='spanDiv'>
                                      <p className='distanceDiv'>Following</p>
                                      <p className='distanceDiv1'>33</p>
                                  </span>
                                  <span className='spanDiv1'>
                                  <p className='timeDiv'>Followers</p>
                                  <p className='timeDiv1'>32</p>
                                  </span>
                                  <span>
                                  <p className='stepDiv'>Activities</p>
                                  <p className='stepDiv1'>1,583</p>
                                  </span>
                          </div>
                          <Divider light/>
                            <p className='latestDiv'>Latest Activities</p>
                            <p className='ActivityDiv'>WEEK: 1 - Sessions#1 - Intervals - Today</p>
                          <Divider light/>
                            <div className="LogIconDiv">
                            <p className='LogDiv'>Your Training Log</p>
                            <IconButton className="LogIcon"><ArrowForwardIosOutlinedIcon/></IconButton>
                            
                            </div>
                      </Card>
                    </div>
                    
                    <div>
                      <Card className="maincardDiv">  
                      <TabContext value={value}>
                      <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                          <Tab value="1" icon={<EventIcon />} aria-label="phone" />
                          <Tab value="2" icon={<IceSkatingIcon />} aria-label="favorite" />
                          <Tab value="3" icon={<DirectionsBikeIcon />} aria-label="person" />
                          <Tab value="4" icon={<SettingsInputComponentIcon />} aria-label="person"/>
                      </Tabs>
                      <TabPanel value="1">Item One</TabPanel>
                      <TabPanel value="2">Item Two</TabPanel>
                      <TabPanel value="3">Item Three</TabPanel>
                      <TabPanel value="4">
                      <Card style={{ textAlign:'start' , backgroundColor:'#e9e9e9', marginBottom:'30px'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </Card>
                        <b>THIS INDEX</b>
                        <h1 style={{ color:'green' }} >0 m</h1>
                      </TabPanel>
                      </TabContext>
                      
                      </Card>
                    </div>

                    </Col>
                    <Col span={8}>
                    <div className='cardSpacingDiv'>
                    <Card className='cardDiv'>
                            <List
                                itemLayout="horizontal"
                                dataSource={data1}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar shape="circle" size={50} src="https://joeschmoe.io/api/v1/random" />}
                                    title={item.title}
                                    description={item.description}
                                    />  
                                </List.Item>
                                )}
                            />
                            <div className="descriptionDiv">
                            <PedalBikeIcon className="cycleIcon"/>
                            <p className='Description'>
                                ROUVY Guide - Over amp; Under
                            </p>
                            </div>    
                            <div className="CalculationDiv">
                              <span className='spanDiv'>
                                  <p className='distanceDiv'>Distance</p>
                                  <p className='distanceDiv1'>5.00 km</p>
                              </span>
                              <span className='spanDiv1'>
                              <p className='timeDiv'>Time</p>
                              <p className='timeDiv1'>12m 15s</p>
                              </span>
                              <span>
                              <p className='stepDiv'>Avg Power</p>
                              <p className='stepDiv1'>113 W</p>
                              </span>
                            </div>
                            <Divider light />
                            <div className="likeDiv">
                              <IconButton><ThumbUpAltOutlinedIcon/></IconButton>
                              <IconButton><ForumOutlinedIcon/></IconButton>
                           </div>
                      </Card>
                    </div>
                    <div className='cardSpacingDiv'>
                      <Card className='cardDiv1'>
                            <List
                                itemLayout="horizontal"
                                dataSource={data2}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar shape="circle" size={50} src="https://joeschmoe.io/api/v1/random" />}
                                    title={item.title}
                                    description={item.description}
                                    />  
                                </List.Item>
                                )}
                            />
                            <div className="descriptionDiv">
                            <PedalBikeIcon className="cycleIcon"/>
                            <p className='Description'>
                                ROUVY Guide - Over amp; Under
                            </p>
                            </div>    
                            <div className="CalculationDiv">
                              <span className='spanDiv'>
                                  <p className='distanceDiv'>Distance</p>
                                  <p className='distanceDiv1'>24.47 km</p>
                              </span>
                              <span className='spanDiv1'>
                              <p className='timeDiv'>Time</p>
                              <p className='timeDiv1'>24m 2s</p>
                              </span>
                              <span>
                              <p className='stepDiv'>Avg Power</p>
                              <p className='stepDiv1'>24 W</p>
                              </span>
                            </div>
                            <Divider light />
                            <div className="likeDiv">
                              <IconButton><ThumbUpAltOutlinedIcon/></IconButton>
                              <IconButton><ForumOutlinedIcon/></IconButton>
                           </div>
                      </Card>        
                    </div> 
                    <div className='cardSpacingDiv'> 
                      <Card className='cardDiv1'>
                            <List
                                itemLayout="horizontal"
                                dataSource={data3}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar shape="circle" size={50} src="https://joeschmoe.io/api/v1/random" />}
                                    title={item.title}
                                    description={item.description}
                                    />  
                                </List.Item>
                                )}
                            />
                            <div className="descriptionDiv">
                            <PedalBikeIcon className="cycleIcon"/>
                            <p className='Description'>
                                Morning Ride
                            </p>
                            </div>    
                            <div className="CalculationDiv">
                              <span className='spanDiv'>
                                  <p className='distanceDiv'>Distance</p>
                                  <p className='distanceDiv1'>70.04 km</p>
                              </span>
                              <span className='spanDiv1'>
                              <p className='timeDiv'>Avg Power</p>
                              <p className='timeDiv1'>599 m</p>
                              </span>
                              <span>
                              <p className='stepDiv'>Time</p>
                              <p className='stepDiv1'>24h 11m</p>
                              </span>
                            </div>
                            <Divider light />
                            <div className="likeDiv">
                              <IconButton><ThumbUpAltOutlinedIcon/></IconButton>
                              <IconButton><ForumOutlinedIcon/></IconButton>
                           </div>
                      </Card>
                    </div>
                    </Col>
                    <Col span={8}>
                      <div>
                        <Row style={{ marginRight:'40px' , marginTop:'35px' }} >
                        <Col span={6}>
                        <Tooltip title="search">
                          <Button shape="circle" icon={<SearchOutlined />} size="large" />
                        </Tooltip>
                        </Col>
                        <Col span={18}>
                          <b style={{ justifyContent:'left' , display:'flex'}}>Challenges</b>
                          <p style={{ textAlign:'start' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          </p>
                          <b style={{ justifyContent:'left' , display:'flex', color: 'orangered'}}>View All Challenges</b>
                        </Col>
                        </Row>
                      </div>
                      <div style={{ marginRight:'40px' , marginTop:'35px' , marginLeft:'40px'}}>
                        
                        
                          <b style={{ justifyContent:'left' , display:'flex'}}>Your Clubs</b>
                          {/* <p style={{ textAlign:'start' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          </p> */}
                          <div  style={{textAlign:'start', marginTop:'10px', marginBottom:'10px'}} >
                          <Image
                            width={80}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          />
                          </div>
                          <div  style={{textAlign:'start'  }} >
                          <Button>View All Clubs</Button>
                          </div>
                     
                      </div>
                      <div>
                        <Row style={{ marginRight:'40px' , marginTop:'35px' }} >
                        <Col span={6}>
                        <Tooltip title="Privacy">
                          <Button shape="circle" icon={<EyeOutlined />} size="large" />
                        </Tooltip>
                        </Col>
                        <Col span={18}>
                          <b style={{ justifyContent:'left' , display:'flex'}}>Try a Privacy Zone</b>
                          <p style={{ textAlign:'start' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          </p>
                          <b style={{ justifyContent:'left' , display:'flex', color: 'orangered'}}>View All Privacy Zones</b>
                        </Col>
                        </Row>
                      </div>
                      <div style={{ marginRight:'40px' , marginTop:'35px' , marginLeft:'40px'}}>
                        
                        
                        <b style={{ justifyContent:'left' , display:'flex'}}>Suggested Friends</b>
                        {/* <p style={{ textAlign:'start' }}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        </p> */}
                        <div  style={{textAlign:'start', marginTop:'10px', marginBottom:'10px'}} >
                        <List
                                itemLayout="horizontal"
                                dataSource={data4}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar shape="circle" size={50} src="https://joeschmoe.io/api/v1/random" />}
                                    title={item.title}
                                    description={item.description}
                                    />  
                                </List.Item>
                                )}
                            />
                            <List
                                itemLayout="horizontal"
                                dataSource={data5}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar shape="circle" size={50} src="https://joeschmoe.io/api/v1/random" />}
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
};

export default Strava;



