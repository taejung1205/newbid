import { json, TypedResponse } from "@remix-run/node";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  addDoc,
  DocumentData,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import itemsJson from "~/data/items.json";

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

const bidMessageTemplate = "TK_0617";
const higherBidMessageTemplate = "TK_0618";

// Initialize Firebase
let firebaseApp: any;
let firestore: any;
let firebaseFunctions: any;

if (!firebaseApp?.apps.length || !firestore.apps.length) {
  firebaseApp = initializeApp(firebaseConfig);
  firestore = getFirestore(firebaseApp);
  firebaseFunctions = getFunctions(firebaseApp, "asia-northeast1");
}

// export async function createDatabase() {
//   for (let i = 0; i < itemsJson.items.length; i++) {
//     try {
//       // const docRef = await addDoc(collection(firestore, "users"), {
//       //   first: "Ada",
//       //   last: "Lovelace",
//       //   born: 1815,
//       // });
//       if(i !== 8){
//         const docRef = await setDoc(doc(firestore, "items", `item-${i}`), {
//           currentPrice: itemsJson.items[i].startPrice,
//           itemName: itemsJson.items[i].title,
//         });
//         console.log("Document written: ", i);
//       }
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   }
// }

export async function getCurrentPrice({ itemIndex }: { itemIndex: number }) {
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

// export async function getBidderCount({ itemIndex }: { itemIndex: number }) {
//   const querySnapshot = await getDocs(
//     collection(firestore, `items/item-${itemIndex}/bidLog`)
//   );
//   return querySnapshot.docs.length - 1;
// }

export async function getBiddingList({ phone }: { phone: string }) {
  const querySnapshot = await getDocs(
    collection(firestore, `bidders/bidder-${phone}/biddingList`)
  );
  const list: { index: string; isHighest: any; biddingPrice: any }[] = [];
  querySnapshot.forEach((doc) => {
    const indexStr = doc.id.substring(5);
    const isHighest = doc.data().isHighest;
    const biddingPrice = doc.data().biddingPrice;
    list.push({
      index: indexStr,
      isHighest: isHighest,
      biddingPrice: biddingPrice,
    });
  });
  return list;
}

export async function requestBidding({
  itemIndex,
  name,
  phone,
  email,
  biddingPrice,
}: {
  itemIndex: number;
  name: string;
  phone: string;
  email: string;
  biddingPrice: number;
}) {
  const itemDocRef = doc(firestore, `items/item-${itemIndex}`);
  const docSnap = await getDoc(itemDocRef);
  if (docSnap.exists()) {
    const prevBidderPhone = docSnap.data().bidderPhone;
    //같은 경매자가 연속으로 시도하는 것일 경우 오류
    if (prevBidderPhone === phone) {
      return { result: "fail", detail: "duplicate" };
    }
    const prevBiddingPrice = docSnap.data().currentPrice;
    //이전 경매값이 제출한 경매값 이상일 경우 오류
    if (prevBiddingPrice >= biddingPrice) {
      return { result: "fail", detail: "bidding price" };
    }

    //경매 갱신 실행
    await updateDoc(itemDocRef, {
      currentPrice: biddingPrice,
      bidderPhone: phone,
      bidderName: name,
    });

    //경매자 정보 추가
    await setDoc(doc(firestore, `bidders/bidder-${phone}`), {
      name: name,
      email: email,
    });

    //경매자 정보에 해당 경매 이력 추가
    await setDoc(
      doc(firestore, `bidders/bidder-${phone}/biddingList/item-${itemIndex}`),
      {
        biddingPrice: biddingPrice,
        isHighest: true,
      }
    );

    //이전 경매자의 경매 이력에 최고가 여부 수정
    if (prevBidderPhone !== undefined) {
      await updateDoc(
        doc(
          firestore,
          `bidders/bidder-${prevBidderPhone}/biddingList/item-${itemIndex}`
        ),
        {
          isHighest: false,
        }
      );
    }

    //제품에 경매 로그 추가
    await addDoc(collection(firestore, `items/item-${itemIndex}/bidLog`), {
      bidderPhone: phone,
      biddingPrice: biddingPrice,
    });

    return { result: "success" };
  } else {
    return { result: "fail", detail: "cannot find item" };
  }
}
