// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyByx1ZbBagoSRENh4pHfRs3Z3dyCPr1em8',
	authDomain: 'ctr-hack.firebaseapp.com',
	projectId: 'ctr-hack',
	storageBucket: 'ctr-hack.appspot.com',
	messagingSenderId: '869806094706',
	appId: '1:869806094706:web:808993797c1e9f0fa145eb',
	measurementId: 'G-SZXDYF7EPV'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
