importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const firebaseConfig = {
  messagingSenderId: '910231972624',
  appId: '1:910231972624:web:a6d5902a751779b2'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
