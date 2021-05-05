const https = require("https");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_360DSLBE_GRAPHQLAPIENDPOINTOUTPUT;
console.log(appsyncUrl);
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require("./query.js").mutation;
const apiKey = process.env.API_360DSLBE_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
  console.log(event.stravaActivityDetails);

  var jsonResponse = event.stravaActivityDetails;

  let activityID;
  let ownerID;
  let activityName;
  let activityDistance;
  let activityStartDate;
  let activityMovingTime;
  let activityType;
  let activityAverageHeartRate;
  let activitySufferScore;
  let activityCalories;
  let activityTotalElevationGain;
  let activityAverageSpeed;
  let activityAverageTemp;
  let activityAverageCadence;
  let activityLocation;

  if (typeof jsonResponse.object_id !== null) {
    activityID = jsonResponse.id;
    console.log(typeof activityID);
  }
  ownerID = jsonResponse.athlete.id;
  activityName = jsonResponse.name;
  activityDistance = jsonResponse.distance;
  activityStartDate = jsonResponse.start_date;
  activityMovingTime = jsonResponse.moving_time;
  activityType = jsonResponse.type;
  if (
    typeof jsonResponse.average_heartrate !== "undefined" &&
    jsonResponse.average_heartrate !== null
  ) {
    console.log("heartrate is NOT null or undefined");
    activityAverageHeartRate = jsonResponse.average_heartrate;
  }
  if (
    typeof jsonResponse.suffer_score !== "undefined" &&
    jsonResponse.suffer_score !== null
  ) {
    activitySufferScore = jsonResponse.suffer_score;
  }
  activityCalories = jsonResponse.calories;
  if (
    typeof jsonResponse.total_elevation_gain !== "undefined" &&
    jsonResponse.total_elevation_gain !== null
  ) {
    activityTotalElevationGain = jsonResponse.total_elevation_gain;
  }
  activityAverageSpeed = jsonResponse.average_speed;
  if (
    typeof jsonResponse.average_temp !== "undefined" &&
    jsonResponse.average_temp !== null
  ) {
    activityAverageTemp = jsonResponse.average_temp;
  }
  if (
    typeof jsonResponse.average_cadence !== "undefined" &&
    jsonResponse.average_cadence !== null
  ) {
    activityAverageCadence = jsonResponse.average_cadence;
  }
  if (
    typeof jsonResponse.location !== "undefined" &&
    jsonResponse.location !== null
  ) {
    activityLocation = jsonResponse.location;
  }
  console.log("Activity ID: ", activityID);
  console.log("Athlete ID: ", ownerID);
  console.log("Activity name: ", activityName);
  console.log("Distance: ", activityDistance);
  console.log("Start Date: ", activityStartDate);
  console.log("Moving Time: ", activityMovingTime);
  console.log("Activity Type: ", activityType);
  console.log("Average heart rate: ", activityAverageHeartRate);
  console.log("Suffer Score: ", activitySufferScore);
  console.log("Calories: ", activityCalories);
  console.log("Elevation Gain: ", activityTotalElevationGain);
  console.log("Average Speed: ", activityAverageSpeed);
  console.log("Average Temp: ", activityAverageTemp);
  console.log("Average Cadence: ", activityAverageCadence);
  console.log("Location: ", activityLocation);

  activityID = activityID +"";
  ownerID = ownerID+'';

  notificationMessage =
    "Gareth did a " +
    activityType +
    ": " +
    activityName +
    " with ID: " +
    activityID +
    " on " +
    activityStartDate +
    " and went this far: " +
    activityDistance +
    "m.";
  console.log("*** Notification message: ", notificationMessage);

  const req = new AWS.HttpRequest(appsyncUrl, region);

  console.log(typeof jsonResponse);
  let jsonResponseParse = JSON.stringify(jsonResponse);

  const item = {
    input: {
      StravaActivityAverageCadence: activityAverageCadence,
      StravaActivityAverageHeartRate: activityAverageHeartRate,
      StravaActivityAverageSpeed: activityAverageSpeed,
      StravaActivityAvergeTemp: activityAverageTemp,
      StravaActivityCalories: activityCalories,
      StravaActivityDate: activityStartDate,
      StravaActivityDescription: activityName,
      StravaActivityDistance: activityDistance,
      StravaActivityElevationGain: activityTotalElevationGain,
      StravaActivityId: activityID,
      StravaActivityLocation: activityLocation,
      StravaActivityMovingTime: activityMovingTime,
      StravaActivityOwnerId: ownerID,
      StravaActivitySufferScore: activitySufferScore,
      StravaActivityType: activityType,
      StravaActivityLocation: activityLocation,
      StravaActivity:jsonResponseParse
    }
  };

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: "createACTIVITIESSTRAVA",
    variables: item,
  });

  if (apiKey) {
    req.headers["x-api-key"] = apiKey;
  } else {
    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  }

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on("data", (data) => {
        resolve(JSON.parse(data.toString()));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  console.log("API result: ", data);

  return {
    statusCode: 200,
    body: data,
  };
};
