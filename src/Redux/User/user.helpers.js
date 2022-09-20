import { auth } from "./../../Firebase/utils";
import { firestore } from "./../../Firebase/utils";
// import firebase from 'firebase/app';

export const handleUserShippingSave = (userShipping) => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser.uid;
    firestore
      .collection("users")
      .doc(currentUser)
      .update(userShipping)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

///////////////      FOR USER SHIPPING FETCHING TO SAGA fetchUserShippingInfo
export const handleFetchUserShipping = (userShipping) => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser.uid;
    let ref = firestore.collection("users").doc(currentUser);
    // console.log("We made the ref = the data " + ref + currentUser);
    ref
      // .get()
      .onSnapshot((snapshot) => {
        // console.log("We made the ref = the data " + ref + currentUser);
        // const totalCount = snapshot.size;
        const data = [
          // ...persistProducts,
          ...snapshot.docs.map((doc) => {
            // console.log(
            //   "We made the ref = the data " + ref + currentUser + [data]
            // );

            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        //   console.log("We made the ref = the data " + ref + currentUser),
        ];
        // console.log("We made the ref = the data" + data + currentUser);
        resolve({
          data,
          // queryDoc: snapshot.docs[totalCount - 1],
          // isLastPage: totalCount < 1
        });
        console.log("This is all", { data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//////////////////     FOR USER SHIPPING FETCHING TO SAGA fetchUserShippingInfo

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "https://Lagruni.com/Login", // WHERE YOU NEED TO PUT THE LIVE SITE FOR PW RESET
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again."];
        reject(err);
      });
  });
};
