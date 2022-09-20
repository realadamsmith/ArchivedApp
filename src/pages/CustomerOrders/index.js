import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { publishableKey } from "./../../stripe/config";
import { loadStripe } from "@stripe/stripe-js";
import { apiInstance } from "./../../Utils";
import "./styles.scss";
import { firestore } from "./../../Firebase/utils";
import Button from "./../../components/Forms/Button";
import moment from "moment";
import { useIonToast } from "@ionic/react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";

const stripePromise = loadStripe(publishableKey);

const mapState = ({ user }) => ({
  // productsData }) => ({
  currentUser: user.currentUser,
});

const columns = [ { id: "productThumbnail", label: "", }, { id: "productName", label: "Name", }, { id: "quantity", label: "Quantity", }, { id: "color", label: "Color", }, { id: "size", label: "Size", }, { id: "productPrice", label: "Price", }, { id: "createdDate", label: "Order Date", }, { id: "shipped", label: "Shipped", }, { id: "tracker", label: "Track", }, ];
const styles = {
  fontSize: "16px",
  // cursor: 'pointer',
  width: "15%",
};

const CustomerOrders = (props) => {
  const { currentUser } = useSelector(mapState); // THIS STATE IS ALSO USED ON ITEMRESULTS PAGE
  const history = useHistory();
  const [present, dismiss] = useIonToast();

  const productHeroSellerID = currentUser.HeroSellerID;

  const [sellerOrders, setSellerOrders] = useState([]);
  const [trackerlink, setTrackerlink] = useState(null);
  //   const { data, queryDoc, isLastPage } = products; // From the Products Redux store we are dstr data, queryDoc, isLastPage
  useEffect(async () => {
    const productscollection = firestore.collection("sellerOrders");
    const snapshot = await productscollection
      .where("productHeroSellerID", "==", currentUser.HeroSellerID)
      .orderBy("createdDate")
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return <h2>You don't have any products yet!</h2>;
    }
    // const unProcessedOrders =
    // snapshot.docs.reverse().map((doc) => {
    //   return {
    //     ...doc.data(),
    //     documentID: doc.id,
    //   };
    // })

    // https://flaviocopes.com/how-to-sort-array-by-date-javascript/
    // console.log(unProcessedOrders);
    // for ( const order of unProcessedOrders ) {
    //   if (order.childOrderID) {
    //     console.log(order.childOrderID);
    //   }
    // }

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

  const trackButton = async (columnValue) => {
    console.log("tracking redirecting");
    console.log("Tracker = orderDetails");

    console.log(columnValue);

    // const orderDoc = await sellerOrders.documentID
    // const link = await documentID.tracker
    // window.location.href = (link);

    // Need the tracking link from sellerOrders
    // const Trackinglink = await firestore.collection("sellerOrders").doc()
  };
  // We could make separate DOC ID for each order,
  // Then bring that order into the Seller Ship Label Feed

  const formatText = (columnName, columnValue) => {
    switch (columnName) {
      case "productPrice":
        return `$${columnValue}`;
      case "productThumbnail":
        return <img src={columnValue} width={250} />;
      case "quantity":
        return columnValue + "x ct";
      case "color":
        return columnValue;
      case "size":
        return columnValue;
      case "createdDate":
        return moment(columnValue.nano).format("MM/DD/YYYY");
      // case 'shipped':
      //     return <Button><a href={} >Mark shipped</a></Button>;
      case "tracker":
        if (columnValue)
          //  window.location.href = columnValue
          //   setTracker(columnValue)
          return (
            <Button>
              <a href={columnValue} className="TrackPackageColor">
                Track Package
              </a>
            </Button>
          );
        // I could just put the tracker link in a small box for people to copy paste.
        else return null;
      default:
        return columnValue;
    }
  };

  const StrpExpLogin = async () => {
    const loginResponse = await apiInstance.post("/login_links",
      {
        productHeroSellerID,
      }
    );
    console.log(loginResponse);
    const link = await loginResponse.data.url;
    window.location.href = link;
    // window.open(link)
  };

  return (
    <div className="admin">
      <div className="PaySummary">
        <p>Seller Summary</p>
        <div className="SummaryGrid">
          <p className="PHeader">
            <button onClick={StrpExpLogin} className="SellerSummary">
              See Payouts
            </button>
          </p>
          {/* <p className="Value"></p> */}
          <p className="PHeader">
            <button
              onClick={() => history.push("/CustomerOrders")}
              className="SellerSummary"
            >
              Orders
            </button>
          </p>
          {/* <p className="Value"></p> */}
          <p className="PHeader">
            <button
              onClick={() => history.push("/Seller")}
              className="SellerSummary"
            >
              Products
            </button>
          </p>
          {/* <p className="Value"></p> */}
        </div>
      </div>
      <div className="manageProducts">
        <h2>Orders to Ship</h2>

        <TableContainer>
          <Table className="results">
            <TableHead>
              <TableRow>
                {columns.map((column, pos) => {
                  const { label } = column;

                  return (
                    <TableCell // This is only for the Labels at the Top of Order History pg
                      key={pos}
                      style={styles}
                    >
                      {label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(sellerOrders) &&
                sellerOrders.length > 0 &&
                sellerOrders.map((row, pos) => {
                  const { documentID } = row;

                  // {sellerOrders.map((documentID, index) => {
                  // const {
                  //     productName,
                  //     productThumbnail, // POSSIBLY USED FOR SEARCH FUNCTION
                  //     productPrice,
                  //     // productRemaining,  // CAN ADD OTHER FIELDS TO DASHBOARD
                  // } = documentID;

                  return (
                    <TableRow key={pos}>
                      {columns.map((column, pos) => {
                        const columnName = column.id;
                        const columnValue = row[columnName];
                        const formattedText = formatText(
                          columnName,
                          columnValue
                        );

                        return (
                          // This is the actual list of Orders
                          <TableCell
                            key={pos}
                            style={styles}

                            //   sx={{
                            //     bgcolor: 'background.paper',
                            //     boxShadow: 1,
                            //     borderRadius: 2,
                            //     p: 2,
                            //     minWidth: 300,
                            //     flexDirection: "column-reverse"
                            //   }}
                          >
                            {formattedText}
                          </TableCell>
                        );
                      })}
                      <td className="ShipButton">
                        {/* <Link to="${documentID}.tracker`"
                                                        >
                                                            Track
                                                        </Link> */}
                        <Button
                          onClick={() =>
                            history.push(`/ShipLabel/${documentID}`)
                          }
                        >
                          Print Shipping Label
                        </Button>
                      </td>
                      <td className="ShipButton">
                        <Button
                          onClick={() =>
                            present("Feature currently unavailable!", 4000)
                          }
                        >
                          Check ShipBob Shipping Status
                        </Button>
                      </td>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CustomerOrders;
