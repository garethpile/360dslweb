import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App">
      <header></header>
      <body>
        <div>
          <img
            src="https://www.360dsl.co.za/attachments/Logo/360SL_logo_1.png"
            alt="360DSL"
            width="400"
            height="300"
          />
        </div>
        <h1>Please connect your Training Accounts to your 360DSL account:</h1>
        <div>
          <a href="https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification">
            Connect your TP account
          </a>
        </div>
        <div>
          <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/notification">
            Connect your Strava account
          </a>
        </div>
        <div>
          <a href="https://ab3qw9gu7b.execute-api.us-east-1.amazonaws.com/staging/requesttoken">
            Connect your Garmin account
          </a>
        </div>

        <div>
          <button type="button" onclick="getGarminToken()">
            Connect your Garmin account
          </button>
        </div>
        <div id="demo"></div>
      </body>

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

function getGarminToken() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open(
    "GET",
    "https://ab3qw9gu7b.execute-api.us-east-1.amazonaws.com/staging/requesttoken",
    true
  );
  xhttp.send();
}
