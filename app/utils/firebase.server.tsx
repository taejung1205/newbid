import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPSGY21GzVZgpQvBI89bgOM1u5FyghlWU",
  authDomain: "newbid-f8691.firebaseapp.com",
  projectId: "newbid-f8691",
  storageBucket: "newbid-f8691.appspot.com",
  messagingSenderId: "877855422852",
  appId: "1:877855422852:web:07396681cdffa86c2205d1",
  measurementId: "G-VGERL55YD7",
};

// Initialize Firebase
let firebaseApp: any;
let firestore: any;

if (!firebaseApp?.apps.length || !firestore.apps.length) {
  firebaseApp = initializeApp(firebaseConfig);
  firestore = getFirestore(firebaseApp);
}

export async function createDatabase() {
  for(let i = 0; i < 12; i++){
    try {
      // const docRef = await addDoc(collection(firestore, "users"), {
      //   first: "Ada",
      //   last: "Lovelace",
      //   born: 1815,
      // });
      const docRef = await setDoc(doc(firestore, "items", `item-${i}`), {
        currentPrice: 50000,
      });
      console.log("Document written: ", i);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export async function getCurrentPrice({itemIndex} : {itemIndex: number}){
  const docRef = doc(firestore, "items", `item-${itemIndex}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data().currentPrice;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}
