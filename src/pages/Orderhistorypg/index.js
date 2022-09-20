import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "./../../Redux/Orders/orders.actions";
import { firestore } from "./../../Firebase/utils";

import "./styles.scss";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
// import './styles.scss';
import Button from "./../../components/Forms/Button";
import Buttons2 from "../../components/Forms/Button2";
import { useIonToast } from "@ionic/react";

const mapState = ({ user, ordersData }) => ({
    // DESTRUCTURE USER FROM REDUX STORE,
    currentUser: user.currentUser,
});

const columns = [
    { id: "productThumbnail", label: "" },
    { id: "productName", label: "Name" },
    { id: "productPrice", label: "Original Price" },
    { id: "quantity", label: "Quantity" },
    { id: "createdDate", label: "Order Date" },
    { id: "tracker", label: "Tracking Status" },
];
const styles = { fontSize: "16px", width: "10%", maxheight: "200px" };
//   const formatText = (columnName, columnValue) => {
//     switch (columnName) {
//       case 'orderTotal':
//         return `$${columnValue}`;
//       case 'createdDate':
//         return moment(columnValue.nano).format('MM/DD/YYYY')
//         case 'tracker':
//                   if (columnValue)
//                 //  window.location.href = columnValue
//                 //   setTracker(columnValue)
//                 return <Button><a href={columnValue} >Track Package</a></Button>;
//                           // I could just put the tracker link in a small box for people to copy paste.

//                 else
//                 return null
//       default:
//         return columnValue;
//     }
//   };

// THE CONSOLIDATION OF ORDERHISTORY INTO ORDERHISTORYPG HAS CAUSED LOG IN LOG OUT ORDER HISTORY TO PERSIST ACROSS LOGIN FOR 0.2-0.5ms
const Orderhistorypg = () => {
    const { currentUser } = useSelector(mapState);
    //   const { orderTotal } = orderDetails;
    const history = useHistory();

    const [sellerOrders, setSellerOrders] = useState([]);
    const [ReturnReason, setReturnReason] = useState("");
    const [ReturnModal, setReturnModal] = useState(false);
    const [present, dismiss] = useIonToast();

    useEffect(async () => { // Probably needs to make a new Coll per user
        const productscollection = firestore.collection("sellerOrders");
        const snapshot = await productscollection
            .where("LagruniumID", "==", currentUser.id)
            .orderBy("createdDate")
            .limit(20)
            // .startAfter(new Date(Date.now()))
            .get();
        if (snapshot.empty) {
            console.log("No matching documents.");
            return
        }
        setSellerOrders(
            // COULD PROBS MAP FOR ORDERITEMS ARRAY AND RETURN THAT
            snapshot.docs.reverse().map((doc) => {
                return {
                    ...doc.data(),
                    // documentID: doc.id,
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

    const returnSubmit = () => {
        const timestamp = new Date();
        firestore.collection("returns").doc().set({
            submitterId: currentUser.id,
            reason: ReturnReason,
            createdDate: timestamp,
        });
        present("Return the item via USPS or UPS post office.", 2000);
        setReturnModal(false);

        // Shipping Label code here

        // history.push( `/returns/${documentID}`)


    };


    const formatText = (columnName, columnValue) => {
        switch (columnName) {
            case "productPrice":
                return `$${columnValue}`;
            case "productThumbnail":
                return <img src={columnValue} width={250} />;
            case "quantity":
                return columnValue + "x ct";

            case "createdDate":
                return moment(columnValue.nano).format("MM/DD/YYYY");
            case "tracker":
                if (columnValue)
                    return (
                        <Button>
                            <a href={columnValue} className="TrackPackageColor">
                                Track Package
                            </a>
                        </Button>
                    );
            default:
                return columnValue;
        }
    };
    console.log(sellerOrders);
    return (
        <div>
            <h1>Order History</h1>
            {/* {ReturnModal ? (

                <IonModal
                isOpen={true}
                swipeToClose={true}
                className="ReturnModalLayout"
                >
                <div className="ReturnModalLayoutPadding">
                    <div className="reportOptions">
                        <li
                            className="reportEachItem"
                            onClick={() => setReturnReason("Arrived Broken")}
                            >
                            Arrived Broken
                        </li>
                        <li
                            className="reportEachItem"
                            onClick={() => setReturnReason("Wrong item description") }
                            >
                            Wrong item description
                        </li>
                    </div>
                    <Buttons2 onClick={() => returnSubmit()}> Submit Return

                    </Buttons2>
                </div>
            </IonModal>
                ) : (
                    <></>
                )} */}
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

                    <TableBody className="reverseBody">
                        {Array.isArray(sellerOrders) &&
                            sellerOrders.length > 0 &&
                            sellerOrders.map((row, pos) => {
                                const { documentID } = row;
                                return (
                                    // <StylesProvider injectFirst>

                                    <TableRow
                                        key={pos}
                                        //   onClick={() => history.push(`/order/${documentID}`)}
                                        // className='reverseBody'
                                    >
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
                                                >
                                                    {formattedText}
                                                </TableCell>
                                            );
                                        })}
                                        <td className="RecordingOrdHist">
                                            <Button
                                                onClick={() => history.push(`/ReviewPost/${documentID}`)}
                                            >
                                                Record a Review
                                            </Button>
                                        </td>
                                        {/* <td className="RecordingOrdHist">
                                            <Button
                                                onClick={() =>
                                                    history.push(
                                                        `/Returns/${documentID}`
                                                    )
                                                }
                                            >
                                                Return
                                            </Button>
                                        </td> */}
                                    </TableRow>
                                    //   </StylesProvider>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Orderhistorypg;
