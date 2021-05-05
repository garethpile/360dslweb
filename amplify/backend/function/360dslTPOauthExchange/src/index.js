"use strict";

const AWS = require("aws-sdk");
const https = require("https");


exports.handler = function (event, context, callback) {
  const axios = require("axios");
  const qsTP = require("querystring");

  const tpTokenExchangePostURL =
    "https://oauth.sandbox.trainingpeaks.com/oauth/token";
  const tpGetAthleteProfileURL =
    "https://api.sandbox.trainingpeaks.com/v1/athlete/profile";
  const m360TPTokenUpdateURL =
    "https://sgsj8l5jj1.execute-api.us-east-1.amazonaws.com/staging/tp";

  const tp_redirect_uri =
    "https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification";
  const tp_client_id = "m360";
  const tp_client_secret = "alnaSgMPslcwvfcV2vunOifl81AX9zciC932imPny4";
  var tp_grant_type = "authorization_code";
  var tp_code;

  try {
    tp_code = event.queryStringParameters.code;
    console.log("TP Code: ", tp_code);
  } catch (error) {
    console.log("Invalid code provided in request: " + error);

    var errorDescription = {
      statusCode: 400,
      statusDescription: "API Execution Error: " + error,
    };
    var errorResponse = {
      body: JSON.stringify(errorDescription),
    };
    return errorResponse;
  }

  const tpTokenExchangeRequestBody = {
    client_id: tp_client_id,
    client_secret: tp_client_secret,
    grant_type: tp_grant_type,
    redirect_uri: tp_redirect_uri,
    code: tp_code,
  };

  const tpTokenExchangeConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    axios
      .post(
        tpTokenExchangePostURL,
        qsTP.stringify(tpTokenExchangeRequestBody),
        tpTokenExchangeConfig
      )
      .then((tpTokenExchangeResult) => {
        console.log("TP Token Exchange Result: ", tpTokenExchangeResult.data);

        var tp_access_token = tpTokenExchangeResult.data.access_token;
        var tp_refresh_token = tpTokenExchangeResult.data.refresh_token;
        var tp_authorization_bearer = "Bearer " + tp_access_token;

        const tpGetAthleteProfileConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: tp_authorization_bearer,
          },
        };

        var tp_athlete_id;
        var tp_athlete_email;
        var tp_athlete_lastname;
        var tp_athlete_firstname;

        axios
          .get(tpGetAthleteProfileURL, tpGetAthleteProfileConfig)
          .then((tpGetAthleteProfileResult) => {
            console.log(
              "TP Get Athlete Profile Result: ",
              tpGetAthleteProfileResult
            );
            tp_athlete_id = tpGetAthleteProfileResult.data.Id + "";
            tp_athlete_email = tpGetAthleteProfileResult.data.Email;
            tp_athlete_lastname = tpGetAthleteProfileResult.data.LastName;
            tp_athlete_firstname = tpGetAthleteProfileResult.data.FirstName;

            const m360TokenrequestBody = {
              PartyId: tp_athlete_id,
              EmailAddress: tp_athlete_email,
              LastName: tp_athlete_lastname,
              FirstName: tp_athlete_firstname,
              tp_access_token: tp_access_token,
              tp_refresh_token: tp_refresh_token,
            };

            const m360TPTokenconfig = {
              headers: {
                "Content-Type": "application/json",
              },
            };

            axios
              .post(
                m360TPTokenUpdateURL,
                m360TokenrequestBody,
                m360TPTokenconfig
              )
              .then((m360Result) => {
                console.log("m360 TOKEN UPDATE RESULT.DATA: ", m360Result.data);
              })
              .catch((error) => {
                console.log("ERROR invoking m360 TOKEN UPDATE POST: ", error);
                throw new Error(error);
              });
          })
          .catch((error) => {
            console.log("ERROR invoking TP Get Athlete Profile: ", error);
            throw new Error(error);
          });
      })
      .catch((error) => {
        console.log("ERROR invoking TP Post Token Exchange: ", error);
        throw new Error(error);
      });
    return "Success";
  } catch (error) {
    console.log("TP Oauth Exchange Error: ", error);
    const errorDescription = {
      statusCode: 400,
      statusDescription: error,
    };
    var errorResponse = {
      body: JSON.stringify(errorDescription),
    };
    return errorResponse;
  }
};
