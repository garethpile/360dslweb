import React from "react";
//import logo from "./images/360dsl_logo.svg";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { actionButton } from "@aws-amplify/ui";

function App() {
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
          <a href="http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/notification">
            Connect your Strava account
          </a>
        </div>
        <div>
          <a href="https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken">
            Connect your Garmin account
          </a>
        </div>
        <div>
          <button onClick={fetchGarminToken}>Link Garmin</button>
        </div>
   

      <AmplifySignOut />
    </div>

  );
}

export default withAuthenticator(App);



function fetchGarminToken(){


const headers = { 'Content-Type': 'application/json' ,
}
  fetch('https://ab3qw9gu7b.execute-api.us-east-1.amazonaws.com/staging/requesttoken' )
  .then(response => response.json())
  .then(data => {
    console.log(data);
    //var oauth_token = data.oauth_token;
    //console.log(oauth_token);
    fetch('https://connect.garmin.com/oauthConfirm?oauth_token=${data.oauth_token}', {headers})
  
  })
  

}


