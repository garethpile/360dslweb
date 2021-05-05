"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const https = require("https");
const axios = require("axios");
const qsTP = require("querystring");

exports.handler = function (event, context, callback) {
  var queryString;

  try {
    console.log(event);
    queryString = event.queryStringParameters;
    console.log(queryString);
  } catch (error) {
    throw new Error(
      "Error extracting querparameters from event object: ",
      error
    );
  }

  if (queryString["hub.challenge"]) {
    console.log("Strava has just sent an OAUTH Callback Validation.");

    var challenge;

    try {
      challenge = queryString["hub.challenge"];

      var bodyData = {
        "hub.challenge": challenge,
      };

      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,",
        },
        body: JSON.stringify(bodyData),
      };

      console.log(response);

      return response;

    } catch (err) {
      console.log("Error: ", err);

      var bodyData = {
        Error: err,
      };

      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,",
        },
        body: JSON.stringify(bodyData),
      };

      return response;
    }
  } else {
    console.log("Strava has just sent an OAUTH Access Token Code.");

    var code = "";

    try {
      code = event.queryStringParameters.code;
      console.log(code);
    } catch (e) {
      // Log and return the error ...
      var error = "Invalid code provided in request: " + e;

      console.log(error);

      var errorDescription = {
        statusCode: 400,
        statusDescription: "API Execution Error: " + error,
      };

      var errorResponse = {
        statusCode: 400,
        //  "headers": corsHeaders,
        body: JSON.stringify(errorDescription),
        isBase64Encoded: false,
      };

      return errorResponse;
    }

    var redirect_uri =
      "https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/notification";
    var client_id = "7947";
    var client_secret = "471581ec88f559a66972e135ec0f59221d7de7da";
    var grant_type = "authorization_code";

    console.log(
      "################################################# Strava PARAMETERS:"
    );
    console.log("Code: ", code);
    console.log("Redirect", redirect_uri);

    var stravaTokenExchangePostURL = "https://www.strava.com/oauth/token";
    
    var m360StravaTokenUpdateURL =
      "https://sgsj8l5jj1.execute-api.us-east-1.amazonaws.com/staging/strava";

    const stravaTokenrequestBody = {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: grant_type,
      redirect_uri: redirect_uri,
      code: code,
    };

    
    console.log("Strava Token Exchange Request Body: ",stravaTokenrequestBody);
    

    const stravaTokenconfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const m360TPTokenconfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        stravaTokenExchangePostURL,
        qsTP.stringify(stravaTokenrequestBody),
        stravaTokenconfig
      )
      .then((result) => {
        console.log("Token Exchange RESULT.DATA: ", result.data);

        var strava_access_token = result.data.access_token;
        var strava_refresh_token = result.data.refresh_token;
        var party_id = result.data.athlete.id;
        var expires_at = result.data.expires_at;
        var last_name = result.data.athlete.lastname;
        var first_name = result.data.athlete.firstname;

        const m360TokenrequestBody = {
          PartyId: party_id,
          LastName: last_name,
          FirstName: first_name,
          strava_access_token: strava_access_token,
          strava_refresh_token: strava_refresh_token,
          strava_expires_at: expires_at,
        };

        axios
          .post(
            m360StravaTokenUpdateURL,
            m360TokenrequestBody,
            m360TPTokenconfig
          )
          .then((m360Result) => {
            console.log("m360 TOKEN UPDATE RESULT.DATA: ", m360Result.data);
          })
          .catch((error) => {
            console.log("ERROR invoking m360 TOKEN UPDATE POST: ", error);
          });
      })
      .catch((error) => {
        console.log("ERROR invoking Strava TOKEN EXCHANGE POST: ", error);
      });
    return "Success";
  }
};
