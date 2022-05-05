import Vue from 'vue'
import { initializeApp } from "firebase/app"
import { getAnalytics, logEvent  } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDTrBFmIiPn81BFzHpx60Wl8hBZaA5EKZE",
  authDomain: "imageminify.firebaseapp.com",
  projectId: "imageminify",
  storageBucket: "imageminify.appspot.com",
  messagingSenderId: "823892436245",
  appId: "1:823892436245:web:18668926866816ae28351c",
  measurementId: "G-6Q6YG6DHTT"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

Vue.prototype.analytics = function(event_name = '', params = {}) {
  if (!event_name || typeof(event_name) !== 'string') { return }
  params ? logEvent(analytics, event_name, params) : logEvent(analytics, event_name)
}
// firebase deploy --only hosting:imageminify