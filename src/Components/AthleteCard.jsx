import React, { useState, useEffect } from "react";
import { Card } from "antd";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "antd";
import Divider from "@mui/material/Divider";

  

class AthleteCard extends React.Component {
    render() {
      return (
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
              href={`https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/?userId=${this.userId}`}
            >
              Connect your Garmin account
            </a>
          </div>
        </Card>
      );
    }
  }

  export default AthleteCard;
  