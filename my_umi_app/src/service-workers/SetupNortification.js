
import { API_URL, API_DELETE_TEMP_FMC_TOKEN_PATH } from "@/constants";
import { API_Inits, requestToAPI } from "@/handlers";
import { message } from "antd";
import {  getToken } from "firebase/messaging";
import {messaging} from './FirebaseInitialize'

const isHttps = document.location.protocol === 'https:';

// firebase.m

export default async (currentUser={}) => {
  if (isHttps || document.location.host === 'localhost') {
    
    /// ... registration of service worker
    if ('serviceWorker' in navigator) {
        const REG_URL = new URL('firebase-messaging-sw.js', document.location.origin)
        await navigator.serviceWorker
            .register(REG_URL.toString())
            .then(function(registration) {
                // console.log('[SW]: SCOPE: ', registration.scope);
                return registration.scope;
            })
            .catch(function(err) {
                return err;
            });
        // console.log(await navigator.serviceWorker.getRegistrations());
    }
    // // firebase.
    if('Notification' in window)
    {
      await Notification.requestPermission().then(async permission => {
        if(permission === "granted")
        {
          const FETCH_URL = new URL(API_DELETE_TEMP_FMC_TOKEN_PATH, API_URL);

          // update FMC token
          getToken(messaging, { vapidKey: 'BL3b29Ff08PfKy_LrFvFfrrYDH3dXFc9Sb6BTuefXyo4p_kvYJHSWwvhy_9kwGMSxsYXM1DUSujjh_dS_445-Ig' }).then(async (currentToken) => {
          if (currentToken) {
              // update new FMC token
              await requestToAPI(FETCH_URL.toString(), API_Inits({ body: {currentFMCToken: currentToken, username: currentUser?.username, access:currentUser?.access},}))
            // ...
          } else {
            // Show permission request UI
            // console.log('No registration token available. Request permission to generate one.');
            message.info({content: 'No registration token available. Request permission to generate one.'})
            // ...
          }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            message.info({content: 'An error occurred while retrieving token. '})
            // ...
          });
        }
      })

      // firebase.messaging(app).onMessage((payload) => {
      //   console.log('payload is ', payload)
      // })
    }
    else
    alert("This browser does not support desktop notification");

  }

};
