module.exports = {
    mutation: `mutation createACTIVITIESTP($input: CreateACTIVITIESTPInput!) {
      createACTIVITIESTP(input: $input) {
        id
        StravaActivityAverageCadence
        StravaActivityAverageHeartRate
        StravaActivityAverageSpeed
        StravaActivityAvergeTemp
        StravaActivityCalories
        StravaActivityDate
        StravaActivityDescription
        StravaActivityDistance
        StravaActivityElevationGain
        StravaActivityId
        StravaActivityLocation
        StravaActivityMovingTime
        StravaActivityOwnerId
        StravaActivitySufferScore
        StravaActivityType
      }
    }
  `
}