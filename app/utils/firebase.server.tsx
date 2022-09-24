import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let firebaseApp: any;
let firestore: any;
let firebaseFunctions: any;

if (!firebaseApp?.apps.length || !firestore.apps.length) {
  firebaseApp = initializeApp(firebaseConfig);
  firestore = getFirestore(firebaseApp);
  firebaseFunctions = getFunctions(firebaseApp, "asia-northeast1");
  
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
    return docSnap.data().currentPrice;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

export async function getBidderCount({itemIndex} : {itemIndex: number}){
  const querySnapshot = await getDocs(collection(firestore, `items/item-${itemIndex}/bidLog`));
  return querySnapshot.docs.length - 1;
}

export async function test(){
  const checkIp = httpsCallable(firebaseFunctions, 'checkIp');
  try {
    const checkIpResult = await checkIp();
    console.log(checkIpResult);
    return checkIpResult.data;
  } catch(e) {
    console.log(e);
  }
}