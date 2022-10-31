importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyB4Mfd836dFE7CJZwe4n2kT7Y2uu2V3m74",
    authDomain: "thingder-de4d9.firebaseapp.com",
    projectId: "thingder-de4d9",
    storageBucket: "thingder-de4d9.appspot.com",
    messagingSenderId: "106440574021",
    appId: "1:106440574021:web:6ddf76c44fb99a627d8f2c",
    measurementId: "G-3GN0HCF6FG"
};

const MESSAGING_TOKEN = "BJGN_n13ECRPHyIw26lRB5VuFoceB_neHr3A3NptU_atU0xbcvIq6F6p9ZC5BmPr6Ht08P3-ErOTMN3piq4NmCc"

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// messaging.usePublicVapidKey(MESSAGING_TOKEN);
// messaging.getToken(messaging, { vapidKey: MESSAGING_TOKEN }).then(res => {
//     console.log('push', res);
// })

// onMessage(messaging, (payload) => {
//     console.log(payload);
// });


self.addEventListener("install", event => {
})

self.addEventListener("fetch", event => {
});

self.addEventListener('push', function (e) {

    const data = e.data.json();
    const title = data.notification.title;
    const body = data.notification.body;

    const notificationOptions = {
        body,
    };

    self.registration.showNotification(title, notificationOptions);
});
