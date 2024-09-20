const { google } = require("googleapis");
const axios = require("axios");
const SCOPES = "https://www.googleapis.com/auth/firebase.messaging";

const getAccessToken = () => {
    return new Promise(function (resolve, reject) {
      const key = require("./config/googleConfigFile.json");
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
  
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  };
  



const AxiosConfig = async (token, notification) => {
  try {

    let productId="";
    let config = {
      method: "post",
      url: `https://fcm.googleapis.com/v1/projects/${productId}/messages:send`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: notification,
    };

    const response = await axios(config);

    return response;
  } catch (error) {
    console.error("Error sending notification:", error.message);
    throw error;
  }
};

const sendNotification =async ()=>{
let productId="";
const access_token = await getAccessToken();
var notification = JSON.stringify({
    message: {
      token:"cVDwddGFRHOtfOtvBvXMHi:APA91bGEiwKZT3cohEiEul5BZhq0lqn1vQEyEheB1WzvZRZsGgf6U2Sw0eP0QhnjMHz_ITNaUwlFWhqxAFxu-CTR8KuAV3OF_2h-E92vCydZHFwg6Ro1GilCQbAy4vcMBA7QkDNnec5c",
      notification: {
        body: "Testing",
        title: "Testing",
      },
      apns: {
        headers: {
          "apns-priority": "10",
        },
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
      data: {
        productId: productId, // here you can send addition data along with notification 
      },
    },
  });
 try {
    let response = await AxiosConfig(access_token, notification);
  } catch (error) {
    console.log("error", error.message);
  }

}


module.exports = { sendNotification };