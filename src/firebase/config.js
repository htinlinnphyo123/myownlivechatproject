import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBASAuUMGqUmDvDWztL0hrWc_4LyPKRAYE",
    authDomain: "live-chat-application-b2a19.firebaseapp.com",
    projectId: "live-chat-application-b2a19",
    storageBucket: "live-chat-application-b2a19.appspot.com",
    messagingSenderId: "934105518122",
    appId: "1:934105518122:web:21c86d3540829b6d057353"
  };

let app = initializeApp(firebaseConfig);

let db = getFirestore(app)

let auth = getAuth(app)

export default {app,db,auth}