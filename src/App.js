import React, { useEffect, useState } from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import Strava from "./Strava/Strava";
import {
  useQuery,
  gql
} from "@apollo/client";

const firstQuery = gql`query MyQuery {

  activitiesgarminByGarminAccountId(GarminAccountId: "574dc5ad1b54a9fe210170d1fd34741c") {

    nextToken

    startedAt

    items {

      GarminAccountId

      GarminActiveKilocalories

      GarminActivity

      GarminActivityDescription

      GarminActivityDistance

      GarminActivityDuration

      GarminActivityId

      GarminActivityStartTime

      GarminActivityType

      GarminAverageHeartRateInBeatsPerMinute

      GarminAveragePaceInMinutesPerKilometer

    }

  }

}`
function App() {
  const [userId, setUserId] = useState("");
  const { loading, error, data } = useQuery(firstQuery);
  

 useEffect(() => {
   // Obtain current logged in Amplify user userId which needs to be passed into Garmin URL later
  Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then((user) => {
      // userId = user.username;
      setUserId(user.username)
      console.log("Current userId: ", user.username); // This works and userId visible ...
    })
    .catch((err) => console.log(err));
 }, [])
//  console.log(error)
//  if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;
  console.log(data , "333")
  // userId variable is not visoble in this return code below ????????
  return (
    <div className="App">
      <div>
        <img
          src="./images/360dsl_logo.png"
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
          href={`https://7t2zui1c0h.execute-api.us-east-1.amazonaws.com/staging/requesttoken/?userId=${userId}`}
        >
          Connect your Garmin account
        </a>
      </div>

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
