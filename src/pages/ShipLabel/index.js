import React, { useState, useEffect } from "react";
import Button from "./../../components/Forms/Button";
import "./styles.scss";
import { apiInstance } from "./../../Utils";
import FormInput from "./../../components/Forms/FormInput";
import { useParams, useHistory, Link } from "react-router-dom";
import { firestore } from "./../../Firebase/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerOrderDetailsStart,
  setSellerOrderDetails,
} from "./../../Redux/Orders/orders.actions";
import { auth } from "./../../Firebase/utils";
import { useIonToast } from "@ionic/react";

const mapState = ({ ordersData }) => ({
  orderSellerDetails: ordersData.orderSellerDetails,
});

const ShipLabel = () => {
  const { sellerOrdersIDGet } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [present, dismiss] = useIonToast();

  const { orderSellerDetails } = useSelector(mapState);
  const { shippingAddress } = orderSellerDetails;

  const [recipientName, setRecipientName] = useState("");
  const [company1, setCompany1] = useState("");
  const [email1, setEmail1] = useState("");
  const [line1, setLine1] = useState("");
  const [line11, setLine11] = useState("");
  const [phone1, setPhone1] = useState("");
  const [city1, setCity1] = useState("");
  const [state1, setState1] = useState("");
  const [zip1, setZip1] = useState("");
  const [sellerData, setSellerData] = useState({});
  const [connectedSellerID, setConnectedSellerID] = useState("");
  const [senderName, setSenderName] = useState("");
  const [company2, setCompany2] = useState("");
  const [email2, setEmail2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [line2, setLine2] = useState("");
  const [line22, setLine22] = useState("");
  const [city2, setCity2] = useState("");
  const [state2, setState2] = useState("");
  const [zip2, setZip2] = useState("");

  const [productLength, setProductLength] = useState(0);
  const [productWidth, setProductWidth] = useState(0);
  const [productHeight, setProductHeight] = useState(0);
  const [productOunces, setProductOunces] = useState(0);
  const [numberofItems, setNumberofItems] = useState(0);
  const [ratesShippo, setRatesShippo] = useState({});
  const [desiredLabel, setDesiredLabel] = useState({});
  const [valTo, setvalTo] = useState({});
  const [valFrom, setvalFrom] = useState({});
  const [validated, setValidated] = useState(false);
  const [printLink, setPrintLink] = useState(""); // const [disable, setDisable] = useState(true);
  const [purchasePrice, setPurchasePrice] = useState(0);

  useEffect(() => {
    dispatch(getSellerOrderDetailsStart(sellerOrdersIDGet));
    return () => {
      // console.log("this component unmounted");
    };
  }, []);

  useEffect(() => {
    // Feature: 1 - setState the sellerOrderID, so we can use for storage when label is Printed
    return () => {
      // console.log("this component unmounted");
      dispatch(setSellerOrderDetails({}));
    };
  }, []);

  useEffect(async () => {
    const sellerDataDoc = firestore
      .collection("users")
      .doc(auth.currentUser.uid); // Grabs the seller's "/users" details
    const snapshot = await sellerDataDoc.get();
    setSellerData({
      ...snapshot.data(),
      documentID: auth.currentUser.uid,
    });
  }, []);

  const autofill = async () => {
    setRecipientName(orderSellerDetails.recipientName);
    setCompany1(shippingAddress.company);
    setPhone1(shippingAddress.phone);
    setLine1(shippingAddress.line1);
    setCity1(shippingAddress.city);
    setState1(shippingAddress.state);
    setZip1(shippingAddress.postal_code);
    setSenderName(sellerData.displayName);
    setConnectedSellerID(sellerData.HeroSellerID);
    setCompany2(sellerData.company);
    setPhone2(shippingAddress.phone);
    setEmail2(sellerData.email);
    setCity2(sellerData.city);
    setLine2(sellerData.line1);
    setLine22(sellerData.line2);
    setState2(sellerData.state);
    setZip2(sellerData.postal_code);
    setProductLength(orderSellerDetails.productLength);
    setProductWidth(orderSellerDetails.productWidth);
    setProductHeight(orderSellerDetails.productHeight);
    setProductOunces(orderSellerDetails.productOunces);
    setNumberofItems(orderSellerDetails.quantity);
  };
  // console.log(orderSellerDetails); // contains recipName, prodThumb, prodName

  const valAndGenRates = async (e) => {
    e.preventDefault();
    present("Getting Rates...", 4000);

    const validatedTo = await apiInstance.post("/shippoValidateTo", {
      senderName,
      company2,
      email2,
      phone2,
      line2,
      line22,
      city2,
      state2,
      zip2,
    });

    const validatedFrom = await apiInstance.post("/shippoValidateFrom", {
      recipientName,
      company1,
      email1,
      line1,
      line11,
      phone1,
      city1,
      state1,
      zip1,
    });
    const vF = await validatedFrom.data;
    const vT = await validatedTo.data;
    const vFVal = await vF.validation_results;
    const vTVal = await vF.validation_results;

    if (vTVal.is_valid == true && vFVal.is_valid == true) {
      setValidated(true);
      var shipmentMade = await apiInstance.post("/shipposhipment", {
        vF,
        vT,
        productLength,
        productWidth,
        productHeight,
        productOunces,
        numberofItems,
      });
      const data = shipmentMade.data.rates;

      // console.log(data);
      setRatesShippo(data);
      // console.log(ratesShippo);
    } else {
      console.log("Shipment Error");
    }
  };

  const PayLabel = async (e) => {
    e.preventDefault();
    present("Purchasing Label from your Stripe Account Balance", 4000);

    // Perform some Stripe API payments
    // We need to have the Seller bank information,
    // But instead we will just let them input it,
    // console.log(desiredLabel.object_id);
    // console.log(desiredLabel.amount);
    // console.log(connectedSellerID);
    const charge = await apiInstance.post("/v1/charges", {
      amount: desiredLabel.amount,
      SellerHeroID: connectedSellerID,
    });

    // console.log(charge.data);
    // console.log(charge.data.captured);

    if (charge.data.captured == true) {
      const shippoTrxLabelPrint = await apiInstance.post("/shippoTransaction", {
        desiredLabel: desiredLabel.object_id,
      });
      // console.log(JSON.stringify(shippoTrxLabelPrint.data));
      // console.log(JSON.stringify(shippoTrxLabelPrint) + " YES");

      const tracker = await shippoTrxLabelPrint.data.tracking_url_provider;
      // console.log(tracker + " The Tracker");

      setPrintLink(shippoTrxLabelPrint.data.label_url);
      const timestamp = new Date();

      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("TrackingLabels")
        .doc.set({
          TrackingLabelURL: printLink,
          TrackingLabelURLhook: tracker,
          createdDate: timestamp,
        });

      const orderToTrack = await firestore
        .collection("sellerOrders")
        .doc(sellerOrdersIDGet);
      orderToTrack.update({ tracker });

      // present("Opening Label PDF to Print", 4000);
    }
  };

  const columns = [
    { id: "provider_image_200", lable: "Image" },
    // { id: "servicelevel.name", lable: "Service" },
    { id: "amount", lable: "Amount" },
    { id: "estimated_days", lable: "Estimated Ship time" },
  ];
  const formatText = (columnName, columnValue) => {
    switch (columnName) {
      case "amount":
        const value = Number(columnValue).toFixed(2);
        // setPurchasePrice(value);
        return `$${value}`;
      case "estimated_days":
        return columnValue + " Days";
      case "provider_image_200":
        return <img src={columnValue} width={50} />;
      // case "servicelevel.name":
      //     return columnValue;
      default:
        return columnValue;
    }
  };

  return (
    <div>
      <div className="gridautofill">
        <div className="centerthebox">
          <input
            type="checkbox"
            value="false"
            name="checkbox"
            onClick={autofill}
          />
        </div>

        <div className="shiplabelimport2">Import fields from order</div>
      </div>
      {validated ? (
        <div className="AddValidated">Addresses Validated</div>
      ) : (
        <div className="AddValidated">
          Please enter UPS, USPS, and FedEx Valid Addresses
        </div>
      )}

      <form onSubmit={valAndGenRates}>
        <div className="EPFields">
          <div className="borderlabel">
            {" "}
            Shipping to{" "}
            <FormInput
              label="Name"
              type="text"
              required
              handleChange={(e) => setRecipientName(e.target.value)}
              value={recipientName}
            />{" "}
            <FormInput
              className="field"
              label="Company"
              type="text"
              handleChange={(e) => setCompany1(e.target.value)}
              value={company1}
            />{" "}
            <FormInput
              className="field"
              label="Phone"
              type="text"
              value={phone1}
              handleChange={(e) => setPhone1(e.target.value)}
            />{" "}
            <FormInput
              className="field"
              label="Email"
              type="text"
              value={email1}
              handleChange={(e) => setEmail1(e.target.value)}
            />{" "}
            <FormInput
              className="field"
              label="Street 1"
              type="text"
              value={line1}
              required
              handleChange={(e) => setLine1(e.target.value)}
            />{" "}
            <FormInput
              className="field"
              label="Street 2"
              type="text"
              value={line11}
              handleChange={(e) => setLine11(e.target.value)}
            />{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="City"
                type="text"
                value={city1}
                required
                handleChange={(e) => setCity1(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="State"
                type="text"
                value={state1}
                required
                handleChange={(e) => setState1(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="Zip"
                type="number"
                required
                value={zip1}
                handleChange={(e) => setZip1(e.target.value)}
              />{" "}
            </div>{" "}
          </div>
          <div className="borderlabel">
            {" "}
            Shipping from{" "}
            <FormInput
              label="Name"
              type="text"
              required
              handleChange={(e) => setSenderName(e.target.value)}
              value={senderName}
            />{" "}
            <FormInput
              className="field"
              label="Company"
              type="text"
              handleChange={(e) => setCompany2(e.target.value)}
              value={company2}
            />{" "}
            <FormInput
              className="field"
              label="Phone"
              type="text"
              value={phone2}
              handleChange={(e) => setPhone2(e.target.value)}
            />{" "}
            <FormInput
              className="field"
              label="Email"
              type="text"
              value={email2}
              handleChange={(e) => setEmail2(e.target.value)}
            />{" "}
            <FormInput
              className="field"
              label="Street 1"
              type="text"
              required
              value={line2}
              handleChange={(e) => setLine2(e.target.value)}
            />{" "}
            <FormInput
              className="field"
              label="Street 2"
              type="text"
              value={line22}
              handleChange={(e) => setLine22(e.target.value)}
            />{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="City"
                type="text"
                required
                value={city2}
                handleChange={(e) => setCity2(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="State"
                type="text"
                required
                value={state2}
                handleChange={(e) => setState2(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="Zip"
                type="number"
                required
                value={zip2}
                handleChange={(e) => setZip2(e.target.value)}
              />{" "}
            </div>{" "}
          </div>
          <div className="borderlabel">
            {" "}
            Package Dimensions <div className="divider90"></div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="Length"
                type="text"
                required
                value={productLength}
                handleChange={(e) => setProductLength(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="Width"
                type="text"
                required
                value={productWidth}
                handleChange={(e) => setProductWidth(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="Height"
                type="text"
                required
                value={productHeight}
                handleChange={(e) => setProductHeight(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="Ounces"
                type="text"
                required
                value={productOunces}
                handleChange={(e) => setProductOunces(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="divider90"></div>{" "}
            <div className="shrink">
              {" "}
              <FormInput
                className="field"
                label="Quantity"
                type="text"
                required
                value={numberofItems}
                handleChange={(e) => setNumberofItems(e.target.value)}
              />{" "}
            </div>
            <div className="divider90"></div>
            <Button type="submit">Generate Rates</Button>
          </div>
          <div className="borderlabel">
            Choose Rate
            {Array.isArray(ratesShippo) &&
              ratesShippo.length > 0 &&
              ratesShippo.map((row, pos) => {
                return (
                  <button
                    type="button"
                    className="HoldsAllRates"
                    onClick={() => setDesiredLabel(row)}
                  >
                    {columns.map((column, pos) => {
                      const columnName = column.id;
                      const columnValue = row[columnName];
                      const formattedText = formatText(columnName, columnValue);

                      return (
                        // This is the actual list of Orders
                        <div className="EachRatesField" key={pos}>
                          {formattedText}
                        </div>
                      );
                    })}
                  </button>
                );
              })}
          </div>
        </div>
      </form>

      <div className="PrintNow">
        <Button onClick={PayLabel}>Purchase Label</Button>
        <br></br>
        {printLink ? (
          <div className="SpacingPrint">
            <Button>
              <a href={printLink}>Print Label</a>
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>

    // Put the Shippo Fields in here somehow
    // And have the Shippo print button available with all the details of the order
  );
};

export default ShipLabel;
