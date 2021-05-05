

exports.handler = async (event) => {

    
   // Create publish parameters
   var params = {
    Message: event,
    TopicArn: "arn:aws:sns:us-east-1:287509267405:StravaActivityReceived",
  };

  // Create promise and SNS service object
  var publishTextPromise = new aws.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function (data) {
      console.log(
        `Message >> ${params.Message} << send sent to the topic >> ${params.TopicArn}`
      );
      console.log("MessageID is " + data.MessageId);
    })
    .catch(function (err) {
      console.log("Error Notification Error: ", err.stack);
    });




};
