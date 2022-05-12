import React from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import { Button } from "antd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Select } from "antd";
import { updateAthleteMetricsMutation } from "../Apollo/queries";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";

const { Option } = Select;

export default function AthleteFeedback(props) {
  const [dropdownSleep, setDropdownSleep] = React.useState(props.customerData.metricSleep);
  const [dropdownWorkLifeStress, setDropdownWorkLifeStress] =
    React.useState("");
  const [dropdownInjury, setDropdownInjury] = React.useState("");
  const [dropdownSick, setDropdownSick] = React.useState("");

  async function updateAthleteMetrics(userId,customerData) {
    let currentCustomerDataVersion = "";
    try {
      currentCustomerDataVersion = customerData._version;
      console.log(
        "Function updateAthleteMetrics executing with parameter id: " + userId
      );
      
      console.log("AthleteFeedback Component - customerVersion: " + currentCustomerDataVersion);

      const updateAthleteMetricsResponse = await API.graphql(
        graphqlOperation(updateAthleteMetricsMutation, {
          id: userId,
          MetricInjury: dropdownInjury,
          MetricSleep: dropdownSleep,
          MetricSick: dropdownSick,
          MetricWorkLifeBalance: dropdownWorkLifeStress,
          MetricsDateCapture: moment(new Date()).format("YYYY-MM-DD"),
          _version: currentCustomerDataVersion
        })
      );
      console.log(
        "updateAthleteMetricsMutation response: " + updateAthleteMetricsResponse
      );
    } catch (err) {
      console.log("Error updating Athlete metrics", err);
    }
  }

  return (
    <Card className="maincardDiv">
      <Row style={{ marginRight: "10px", marginTop: "10px" }}>
        <Col>
          <b className="healthHead">Overall Health</b>
          <p className="healthText">
            Productive training comes from good sleep!!
          </p>
          <p className="healthText">
            Work / Life balance has a huge effect on your ability to train
            effectively.
          </p>
          <b className="healthHead">Select and Save</b>
          <Box paddingX={0}>
            <Typography className="healthQuestion">Are you Sick?</Typography>
            <Select
              value={dropdownSick}
              onChange={(e) => setDropdownSick(e)}
              placeholder="SickFeedback"
              style={{ width: 200 }}
            >
              <Option value="SickNo">No</Option>
              <Option value="SickYesNoTrain">Yes - cannot train</Option>
              <Option value="SickYesLightTraining">
                Yes - light training
              </Option>
            </Select>
          </Box>
          <Box>
          <Typography className="healthQuestion">Are you injured?</Typography>
          <Select
              value={dropdownInjury}
              onChange={(e) => setDropdownInjury(e)}
              placeholder="InjuryFeedback"
              style={{ width: 200 }}
            >
              <Option value="InjuryNo">No</Option>
              <Option value="InuryYesNoTrain">Yes - cannot train</Option>
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
          <Button onClick={() => updateAthleteMetrics(props.userId,props.customerData._version)}>Save</Button>
        </Col>
      </Row>
    </Card>
  );
}
