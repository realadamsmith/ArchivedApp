import { firestore, storage } from "./../../Firebase/utils";
import React, { useState, useEffect } from "react";
import Product from "../../components/ItemResults/Items";

//     if (term) = !undefined || term === ItemPageRef {
//       Array.isArray

//  const SearchBarProducts = ({ term, startAfterDoc, persistProducts=[] }) => {
//   // const [data, setData] = useState(null);
//   return new Promise((resolve, reject) => {
//     const pageSize = 10;
//     let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
//     if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
//     if (startAfterDoc) ItemPageRef = ItemPageRef.startAfter(startAfterDoc);
//     ItemPageRef
//       .get()
//       .then(snapshot => {
//         const totalCount = snapshot.size;

//         const data = [
//           ...persistProducts,
//           ...snapshot.docs.map(doc => {
//             return {
//               ...doc.data(),
//               documentID: doc.id
//             }
//           })
//         ];
//         resolve({
//           data,
//           queryDoc: snapshot.docs[totalCount - 1],
//           isLastPage: totalCount < 1
//         });
//       })
//       .catch(err => {
//         reject(err);
//       })
//   })
// }
// WE NEED TO INSTEAD OF USING AN IMAGE URL, USE A JPG FILE
// WE NEED TO THEN REFER TO THAT IMAGE FILE WITH productThumbnail, so it can be fetched.
// THERE IS LIKELY DIFF CODE FOR
// NEED TO
export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      // .then(() =>)
      .catch((err) => {
        reject(err);
      });
  });
};
// NO NEED TO EDIT TO GET FULL PRODUCT DOCID FOR MULTIPLE IMAGES
export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
  input,
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 20;
    let ref = firestore.collection("products").orderBy("createdDate");
    // .limit(pageSize);
    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        const data = [
          ...persistProducts,
          ...snapshot.docs.reverse().map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id, // Getting documentID is to pass
            };
          }),
        ];

        if (input) {
          const filteredData = data.filter((product) => {
            return product.productName.toLowerCase().includes(input.toLowerCase());
          })
          resolve({
            data: filteredData,
            queryDoc: snapshot.docs[totalCount - 1],
            isLastPage: totalCount < 1,
          })
        } else {
          resolve({
            data,
            queryDoc: snapshot.docs[totalCount - 1],
            isLastPage: totalCount < 1,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProduct = (productID) => {
  // adding this helper function in order to FETCH THE DOC WE NEED FROM FIRESTORE
  return new Promise((resolve, reject) => {
    // Apply details to the product, with more specific Firebase needs
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // IF IT EXISTS, RESOLVE THE DATA FROM PRODUCTID
          resolve({
            ...snapshot.data(),
            documentID: productID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// ░██████╗███████╗██╗░░░░░██╗░░░░░███████╗██████╗░  ██████╗░██████╗░░█████╗░██████╗░██╗░░░██╗░█████╗░████████╗░██████╗
// ██╔════╝██╔════╝██║░░░░░██║░░░░░██╔════╝██╔══██╗  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░██║██╔══██╗╚══██╔══╝██╔════╝
// ╚█████╗░█████╗░░██║░░░░░██║░░░░░█████╗░░██████╔╝  ██████╔╝██████╔╝██║░░██║██║░░██║██║░░░██║██║░░╚═╝░░░██║░░░╚█████╗░
// ░╚═══██╗██╔══╝░░██║░░░░░██║░░░░░██╔══╝░░██╔══██╗  ██╔═══╝░██╔══██╗██║░░██║██║░░██║██║░░░██║██║░░██╗░░░██║░░░░╚═══██╗
// ██████╔╝███████╗███████╗███████╗███████╗██║░░██║  ██║░░░░░██║░░██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝░░░██║░░░██████╔╝
// ╚═════╝░╚══════╝╚══════╝╚══════╝╚══════╝╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═════╝░░╚═════╝░░╚════╝░░░░╚═╝░░░╚═════╝░

export const handleFetchSellerProducts = (uid) => {
  // WE PASSED IN UID DUE TO PASSING IN currentUser.id to fetchSellerProductsStart, and mapSelector and mapState
  return new Promise((resolve, reject) => {
    const pageSize = 20;
    let ref = firestore
      .collection("products")
      .orderBy("createdDate")
      .limit(pageSize);
    // console.log("dude", uid);
    ref = ref.where("productSellerUserID", "==", uid);
    // console.log("were here", uid);
    ref
      .get()
      .then((snap) => {
        const data = [
          // ...persistProducts,
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
          // console.log("4th", uid),
        ];
        // console.log("Do it ", uid);

        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        // console.log(documentID, 2);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// 1) MAYBE FOR ADDING REVIEW TO PRODUCT
// export const handleAddReview = documentID => {
//   return new Promise((resolve, reject) => {
//     firestore
//       .collection('products')
//       .doc(documentID)
//       .add()
//       .then(() => {
//         console.log(documentID, 2)
//         resolve();
//       })
//       .catch(err => {
//         reject(err);
//       })
//   });
// }
