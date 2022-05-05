

export const Activityquery = `query MyQuery {

    activitiesgarminByGarminAccountId(GarminAccountId: "574dc5ad1b54a9fe210170d1fd34741c",filter: {GarminActivityAthleteFeedback: {eq: false}}) {
  
      nextToken
  
      startedAt
  
      items {
  
        id
        
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

        GarminActivityAthleteFeedback

        updatedAt

        _version
  
      }
  
    }
  
  }`

export const updateGarminActivity = `
  mutation MyMutation ($id: ID!, $GarminActivityAthleteBody: String, $GarminActivityAthleteEffort: String, $GarminActivityAthleteFeedback: Boolean,  $_version: Int) {
    updateACTIVITIESGARMIN(input : {id: $id, GarminActivityAthleteBody: $GarminActivityAthleteBody, GarminActivityAthleteEffort: $GarminActivityAthleteEffort, GarminActivityAthleteFeedback:$GarminActivityAthleteFeedback,_version: $_version}) {
      GarminActivityAthleteEffort
      GarminActivityAthleteBody
      GarminActivityAthleteFeedback
    }
  }`;


export const getCustomerByID = `query myCustomerQuery($id: ID!) {
    getCUSTOMER360DSL(id: $id) {
    CUSTOMER3RDPARTIES {
    items {
      _version
    }
    }
      EmailAddress
      TrainingDays {
      FridayTrain
      FridayTrainHours
      MondayTrain
      MondayTrainHours
      SaturdayTrain
      WednesdayTrainHours
      WednesdayTrain
      TuesdayTrainHours
      TuesdayTrain
      ThursdayTrainHours
      ThursdayTrain
      SundayTrainHours
      SundayTrain
      SaturdayTrainHours
      }
      }
    }`

export const createCustomer360DSL = `mutation createCustomerMutation($id: ID!, $EmailAddress: AWSEmail!){
  createCUSTOMER360DSL(input: {id : $id, EmailAddress: $EmailAddress}){
    EmailAddress
    id
  }
}`