importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFWVrrfzNy6j5Fkz-wfc5V7_i46BoB1gI",
  authDomain: "careplus-5f7f1.firebaseapp.com",
  projectId: "careplus-5f7f1",
  storageBucket: "careplus-5f7f1.appspot.com",
  messagingSenderId: "675002917443",
  appId: "1:675002917443:web:ddba62cc237f0baa69aaf6",
  measurementId: "G-VDBTJY8PFV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };

  console.log(notificationTitle);

  self.registration.showNotification(notificationTitle, notificationOptions.body);
});
