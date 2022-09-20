import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import { apiInstance } from "./../../Utils";
import { referralProduct } from "./../../Redux/Items/items.actions";

import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
  selectSellersTotal,
} from "./../../Redux/Cart/cart.selectors";
import { saveOrderHistory } from "./../../Redux/Orders/orders.actions";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { useIonToast } from "@ionic/react";
import { auth } from "./../../Firebase/utils";
import { firestore } from "./../../Firebase/utils";

const mapState = createStructuredSelector({
  sellers: selectSellersTotal,
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
  referral: referralProduct,
  // currentUser: user
});
const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};
const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const { total, itemCount, cartItems, sellers, referral, currentUser } =
    useSelector(mapState);
  const dispatch = useDispatch();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [email, setEmail] = useState("");
  const [guestOrUserConfEmail, setGuestOrUserConfEmail] = useState("");
  const [results, setResult] = useState("");
  const [disable, setDisable] = useState(false);
  const [present, dismiss] = useIonToast();
  const [points, setPoints] = useState("");
  const [newTotal, setnewTotal] = useState(null);
  // const [check, setCheck] = useState(false)

  useEffect(() => {
    if (itemCount < 1) {
      if (auth.currentUser) {
        history.push("/OrderHistory");
      } else {
        alert("Instead of a logged in user's order history, check your email for order details.")
        history.push("/Home")
      }
    }
  }, [itemCount]);

  useEffect(() => {
    apiInstance.post("/sellerConf", {
      testing: 3,
    })
  }, []);

  useEffect(async () => { // Where does the points Decrement come from?
    if (auth.currentUser) {
      setGuestOrUserConfEmail(auth.currentUser.email);
    }
    const pointsSnap = await firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get();
      const wholeDoc = {...pointsSnap.data(),
      documentID: auth.currentUser.uid
      }
      // console.log(wholeDoc)
    setPoints(wholeDoc.points)
  }, [auth.currentUser]);

  // JUST HOOKS FOR THESE FIELDS
  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
      country: "US",
    });
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
      country: "US",
    });
  };

  const myFunction = (evt) => {
    setNameOnCard(recipientName);
    setBillingAddress({
      // ...billingAddress,
      ...shippingAddress,
      country: "US",
    });
  };

  const performCalculation = () => {
    if (newTotal) {
      setnewTotal(null);
    } else {
      setnewTotal((total - points * 0.01).toFixed(2));
    }
  };
  // console.log(points);
  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      // console.log("Not enough details")
      present("Please complete all required fields", 5000);
      return;

    }
    setDisable(true);
    present("Payment Processing...", 5000);

    // console.log(newTotal)
    // console.log(total)

    // Possible security issue here with amount, instead lookup ID then price. https://www.youtube.com/watch?v=K7PHc6QNaoc
    apiInstance.post("/payments/create", {
      amount: Math.round(total.toFixed(2) * 100),
      theincrements: points.points,
      discounted: newTotal ? newTotal : null,
      shipping: {
        name: recipientName,
        address: {
          ...shippingAddress,
          country: "US",
        },
      },
      referralID: referral.payload.productsData.referral,
      confirmationEmail: guestOrUserConfEmail,
      })
      // rewardful('convert', { email: 'customer@example.com' }); // For Client Side
      .then(({ data: clientSecret }) => {
        stripe
        .createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: nameOnCard,
            address: {
              ...billingAddress,
              country: "US",
            },
          },
        })
        .then(async ({ paymentMethod }) => {
          const paymentIntentresult = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: paymentMethod.id,
              receipt_email: guestOrUserConfEmail, // Check if email is going thru. It is in the field.
            }
            );
            if (paymentIntentresult.error) {
              console.log(paymentIntentresult.error);
              // present(paymentIntentresult.error.message, 5000);
              alert(paymentIntentresult.error.message, 5000);
              return
            } else {
              console.log("Clear")
            }
            const responseTransfer = await apiInstance.post("/transfers", {
              sellers,
            });
            const createdDate = new Date();
            const childOrderID = await firestore.collection("orders").doc().id;
            const LagruniumID = await auth.currentUser.uid; // Guests wont have
            // const shipped = false
            const configOrder = {
              ParentOrderID: childOrderID,
              createdDate: createdDate,
              orderTotal: total,
              discounted: newTotal ? newTotal : null,
              orderItems: cartItems.map((item) => {
                const {
                  documentID,
                  productThumbnail,
                  productName,
                  productPrice,
                  quantity,
                  productHeroSellerID,
                  productHeight,
                  productWidth,
                  productLength,
                  productOunces,
                  color,
                  size,
                } = item;

                return {
                  documentID,
                  productThumbnail,
                  productName,
                  productPrice,
                  quantity,
                  productHeroSellerID,
                  recipientName,
                  shippingAddress,
                  createdDate,
                  productHeight,
                  productWidth,
                  productLength,
                  productOunces,
                  childOrderID,
                  LagruniumID,
                  color,
                  size,
                  // shipped
                };
              }),
            };
            dispatch(saveOrderHistory(configOrder)); // configOrder gets passed as "order" to handleSaveOrder
            // alert("Payment Processing...")
            apiInstance.post("/sellerConf", {
              testing: 3,
            })
          });
        });
      };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Address</h2>
          <div className="divider91"></div>{" "}
          {!auth.currentUser ? (
            <FormInput
              required
              placeholder="Confirmation Email Destination"
              name="confirmationemail"
              handleChange={(evt) => setGuestOrUserConfEmail(evt.target.value)}
              value={guestOrUserConfEmail}
              type="text"
            />
          ) : (
            <></>
          )}
          <FormInput
            required
            placeholder="Recipient Name"
            name="recipientName"
            handleChange={(evt) => setRecipientName(evt.target.value)}
            value={recipientName}
            type="text"
          />
          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line1}
            type="text"
          />
          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line2}
            type="text"
          />
          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.city}
            type="text"
          />
          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.state}
            type="text"
          />
          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.postal_code}
            type="text"
          />
          {/* <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            placeholder="United States"

                            // onChange={(val) =>
                            //     handleShipping({
                            //         target: {
                            //             name: "country",
                            //             value: "United States",
                            //         },
                            //     })
                            // }
                            disabled
                            // value={shippingAddress.country}
                            valueType="short"
                        />
                    </div> */}
        </div>

        <div className="group2">
          <h2>Billing Address</h2>
          <div className="gridCheckbox">
            <input
              className="something"
              type="checkbox"
              value="false"
              name="checkbox"
              onClick={myFunction} // Maybe we should also add handleBilling here to make it trigger evt
            />
            <div className="getCloser">Same as Shipping Address</div>
          </div>
          <FormInput
            required
            placeholder="Name on Card"
            name="nameOnCard"
            handleChange={(evt) => setNameOnCard(evt.target.value)}
            value={nameOnCard}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.postal_code}
            type="text"
          />

          {/* <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            placeholder="United States"

                            // onChange={(val) =>
                            //     handleBilling({
                            //         target: {
                            //             name: "country",
                            //             value: "United States",
                            //         },
                            //     })
                            // }
                            disabled
                            // value={billingAddress.country}
                            valueType="short"
                        />
                    </div> */}
        </div>
        <div className="bottomGridForm">
          <div className="ClipWrapperIncentive2">
            <h2>Card Details</h2>

            <CardElement options={configCardElement} />
          </div>
          {points ? (
            <div className="gridCheckbox">
              <input
                className="something"
                type="checkbox"
                value="false"
                name="checkbox"
                onClick={performCalculation}
              />
              <div className="getCloser">Redeem UNI points: <b>{points} Pts</b></div>
            </div>
          ) : (
            <div className="MiddleAnnouncement">
              <div className="CenterTextHeaderAnnouncement">
              New accounts earn 1000 points ($10) and posting video reviews earn 500 points each.
              </div>
              </div>
          )}
          {newTotal ? (
            <h3 className="order">Shopping Total with Pts: ${newTotal}</h3>
          ) : (
            <h3 className="order">Shopping Total: ${total}</h3>
          )}

          <Button disabled={disable} type="submit">
            Complete Purchase
          </Button>
        </div>
      </form>
      {!auth.currentUser ? (
        <>
          <div className="RegisterSpacer"></div>
          <div className="RegisterSpacer"></div>
          <div className="CenterPromoSignup">
            🇺🇳🚀 Tip - Visit the site with the same browser to stay logged in
            every time you visit!
          </div>
          <div className="RegisterSpacer"></div>

          <div className="CenterPromoSignup">
            ⭐️ Labor Day Deal until September 15, get 1000 UNI pts when you create an
            account, and 500 per vertical product video review!
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PaymentDetails;

