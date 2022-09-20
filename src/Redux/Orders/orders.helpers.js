import { firestore } from './../../Firebase/utils';



// THIS FUNCTION SUCCESSFULLY MAKES separate sellerOrders, so that we can grab each for CustomerOrders
export const handleSaveOrder = async (order) => {
    const {orderItems} = await order
    const batch = firestore.batch()
try {
    // TEST THE EFFECT OF CHANGING CONST TO LET
    for (let document of orderItems) {
        const oneItem = await
        firestore
        .collection('sellerOrders')
        .doc();
        batch.set(oneItem, document)
    }
// console.log("get past for loop?")
    const userOrder =
    firestore
    .collection('orders')
    .doc();
    batch.set(userOrder, order)

    await batch.commit()

} catch (err){
    console.log(err) //Had a productHeight undefined error here once 4/6/22 under baum 4242 test api
}
};



export const handleGetUserOrderHistory = uid => {  // NEED TO CREATE AN INDEX WITH FIREBASE, CLICK LINK PROVIDED IN CONSOLE
  return new Promise((resolve, reject) => {        // What is uid passing? The uid somehow??
    let ref = firestore.collection('sellerOrders').orderBy('createdDate'); // The orderCreatedDate is fine, but is not being updated properly in people's Order histories
    ref = ref.where('LagruniumID', '==', uid);
    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.reverse().map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];
        resolve({ data });
      })
      .catch(err => {
        reject(err);
      });
  });
};



export const handleGetOrder = orderID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc(orderID)
      .get()
      .then(snap => {   // COULD BE USED FOR SEARCH FUNCTION TO SNAP, THEN FOR LOOP + COUNTER, THEN RESOLVE
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: orderID
          })
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}


export const handleGetSellerOrder = sellerOrdersIDGet => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('sellerOrders')
      .doc(sellerOrdersIDGet)
      .get()
      .then(snap => {   // COULD BE USED FOR SEARCH FUNCTION TO SNAP, THEN FOR LOOP + COUNTER, THEN RESOLVE
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: sellerOrdersIDGet
          })
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}