import React from "react";
//import logo from "./images/360dsl_logo.svg";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { actionButton } from "@aws-amplify/ui";
import { Auth } from "aws-amplify";

function App() {
  var userId;

  Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then(
      (user) => {
        userId = user.username;
        console.log("Current userId: ", userId);

        return (
          <div className="App">
            <div>
              <img
                src="http://www.360dsl.co.za/attachments/Logo/360SL_logo_1.png"
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
              <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://6kjj2t9ega.execute-api.us-east-1.amazonaws.com/staging/oauthexchange">
                Connect your Strava account
              </a>
            </div>
      
            <div>
              <a
                href={`https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/?userId="${userId}`}
              >
                Connect your Garmin account
              </a>
            </div>
      
            <AmplifySignOut />
          </div>
        );
        
      }
      //userId = user.username
    )
    .catch((err) => console.log(err));



}

export default withAuthenticator(App);
/*
function fetchGarminToken() {
  var url = new URL(
    "https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/"
  );

  var params = { userId: userId };

  url.search = new URLSearchParams(params).toString();

  //var url = fetch(url);

  //console.log("url: ",url);

  window.location.href = fetch(url);
}
*/