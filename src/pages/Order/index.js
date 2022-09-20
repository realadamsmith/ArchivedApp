import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getSellerOrderDetailsStart,setSellerOrderDetails } from './../../Redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
// import OrderDetails from './../../components/OrderDetails';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import { setOrderDetails } from './../../Redux/Orders/orders.actions';
import Button from '../../components/Forms/Button';
import { apiInstance } from "./../../Utils";
import { firestore } from "./../../Firebase/utils";


const mapState = ({ user }) => ({
  currentUser: user.currentUser
});


const columns = [
  {
    id: 'productThumbnail',
    label: ''
  },
  {
    id: 'productName',
    label: 'Name'
  },
  {
    id: 'productPrice',
    label: 'Price'
  },
  {
    id: 'quantity',
    label: 'Quantity'
  },
  {
    id: 'tracker',
    label: 'Tracking Status'
  }

]
const styles = {
  fontSize: '16px',
  width: '10%'
};

// ----------------- Actual Order Details when Clicked

// ---- THIS PAGE IS NOT BEING USED
// ---- THIS PAGE IS NOT BEING USED
// ---- THIS PAGE IS NOT BEING USED
// ---- THIS PAGE IS NOT BEING USED

const Order = () => {
  const { currentUser } = useSelector(mapState);
//   const { orderTotal } = orderDetails;
const [sellerOrders, setSellerOrders] = useState([]);


  useEffect(async () => {
    const productscollection = firestore.collection("sellerOrders");
    const snapshot = await productscollection
        .where("LagruniumID", "==", currentUser.HeroSellerID)
        .orderBy("createdDate")
        .get();
    if (snapshot.empty) {
        console.log("No matching documents.");
        return <h2>You don't have any products yet!</h2>;
    }
    setSellerOrders(

        // COULD PROBS MAP FOR ORDERITEMS ARRAY AND RETURN THAT
        snapshot.docs.reverse().map((doc) => {
            return {
                ...doc.data(),
                documentID: doc.id,
            };
        })
    );
    // const customerOrderDetails = firestore.collection("orders")
    // .doc.where('productHeroSellerID', '==', currentUser.HeroSellerID)
    // // GRAB ONLY ORDER IDS WHERE THERE ARE DOCS INSIDE THE ORDER
    // // THAT MATCH THE CURRENTUSER'S SELLERID
    // // this is Franks suggestion
    // .collection("orderitems").where('productSellerID', '==', currentUser.HeroSellerID)
}, []);

  const formatText = (columnName, columnValue) => {
    switch(columnName) {
      case 'productPrice':
        return `$${columnValue}`;
      case 'productThumbnail':
        return <img src={columnValue} width={250} />;
      case 'tracker':
        return <Button onClick={trackButton}>Track</Button>;
      default:
        return columnValue;
    }
  }

  const trackButton = () => {
    console.log("tracking redirecting")
    console.log("Tracker = orderDetails")
//     const Trackinglink = await apiInstance.post("/shippoValidateTo", {
//         LinkFromOrder
// })
}


  return (
    <div>
      <h1>
        {/* Order ID: #{sellerOrdersIDGet} */}
      </h1>
      <TableContainer>
      <Table>

        <TableHead>
          <TableRow>

            {columns.map((col, pos) => {
              return (
                <TableCell
                  key={pos}
                  style={styles}
                >
                  {col.label}
                </TableCell>
              )
            })}

          </TableRow>
        </TableHead>

        <TableBody>

          {(Array.isArray(sellerOrders) && sellerOrders.length > 0) && sellerOrders.map((row, pos) => {
            //   if (orderItems.productHeroSellerID == "acct_1K48aBQn9KC4I581" )
            // orderItems.where(productHeroSellerID == "acct_1K4rDxQfUeq9We6W")
            const { documentID } = row;


            return (
              <TableRow key={pos}>


                {columns.map((col, pos) => {
                  const columnName = col.id;
                  const columnValue = row[columnName];

                  return (
                    <TableCell
                      key={pos}
                      style={styles}
                    >
                      {formatText(columnName, columnValue)}
                    </TableCell>
                  )
                })}

              </TableRow>
            )
          })}

        </TableBody>

      </Table>
    </TableContainer>
      <h3>
        {/* Total: {orderTotal} */}
      </h3>
    </div>
  )
}



export default Order;