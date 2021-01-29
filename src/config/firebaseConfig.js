import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyANp4iZWGj29XPmU5zrhbb7BEJPijdfGf8",
    authDomain: "whatsapp-clone-b9be8.firebaseapp.com",
    projectId: "whatsapp-clone-b9be8",
    storageBucket: "whatsapp-clone-b9be8.appspot.com",
    messagingSenderId: "904621695163",
    appId: "1:904621695163:web:d401c9313ec67277df499e"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;