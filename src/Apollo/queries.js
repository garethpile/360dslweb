

export const Activityquery = `query MyQuery {

    activitiesgarminByGarminAccountId(GarminAccountId: "574dc5ad1b54a9fe210170d1fd34741c",limit:10) {
  
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
  
      }
  
    }
  
  }`