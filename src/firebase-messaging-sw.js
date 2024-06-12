import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export function requestPermission(setFcmToken, notifications, setNotifications) {
  Notification.requestPermission().then((permission) => {
    console.log('Notification permission status:', permission);
    if (permission === 'granted') {
      getToken(messaging, { vapidKey: 'BGxB48zcSFA5fD27n2JUx3fZMlVqItwZaJSSgezYgZ-tr3Ix5rp2HF1MaTi4eRe7558Y_mdahYFVdvvm7kiSS_Y' })
        .then((token) => {
          console.log('FCM Token:', token);
          setFcmToken(token);
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
    } else {
      console.warn('Notification permission not granted');
    }
  });

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    }

    // Ensure content is a string
    const newNotification = {
      alarmNum: +notificationTitle,
      content: notificationOptions.body
    };
    setNotifications([...notifications, newNotification]);
  });
}
