importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyD9dLPRH_TC2ow99u4fx66yIevHscUZOwY",
  authDomain: "ouredu-240bf.firebaseapp.com",
  databaseURL: "https:\u002F\u002Fouredu-240bf.firebaseio.com",
  projectId: "ouredu-240bf",
  storageBucket: "ouredu-240bf.appspot.com",
  messagingSenderId: "500852686542",
  appId: "1:500852686542:web:274d2d19e129a35a581a9f",
  measurementId: "G-B6YMYS2HC6",
  fcmPublicVapidKey:
    "BMCOGvwhWD0UGiCxN4X_ZKFvLqrAxpKONkduTzHLFJAwEJ6HT60AZPh8iJylW6MsgfroN8PX20NjmHPuRcETG1s",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


// Setup event listeners for actions provided in the config:
self.addEventListener("notificationclick", function (e) {
  // const actions = [{"action":"goToUrl","url":"https:\u002F\u002Fgithub.com\u002Flupas"}]
  // const action = actions.find(x => x.id === e.action.action)
  // const notification = e.notification

  if (!e.data.url) return;


  clients.openWindow(e.data.url);
  notification.close();

});
