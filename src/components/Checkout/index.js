import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotal,
} from "./../../Redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import Buttons from "./../Forms/Button";
import Buttons2 from "./../Forms/Button2";
import Item from "./Item";
import FormInput from "./../../components/Forms/FormInput";
import Modal from "./../../components/Modal";
import Modal2 from "./../../components/Modal2";
import { addShippingInfo } from "./../../Redux/User/user.actions";

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
});

// const mapState = ({ user }) => ({
//   usershipping: user.shippinginfo,
// });

// const mapState = ({ productsData }) => ({
//   products: productsData.products
// });

// const mapState = ({ addShippingInfo }) => ({
//   products: productsData.products
// });

// HAVE A COOL CHECKOUT COMPLETE PURCHASE ANIMATION OR CSS SWIPE/SHINE, SIMPLE

const Checkout = ({}) => {
    // THE /CART OR REVIEW YOUR ORDER PAGE
    // const { products } = useSelector(mapState);  // THIS STATE IS ALSO USED ON ITEMRESULTS PAGE
    const dispatch = useDispatch();
    const [fullname, setFullName] = useState("");
    const [credit, setCredit] = useState("");
    const [phnnumber, setPhnNumber] = useState("");
    const [address, setAddress1] = useState("");
    const [city, setCity] = useState("");
    const [state, setUserState] = useState("");
    const [zip, setZip] = useState("");
    const toggleModal = () => setHideModal(!hideModal);

    const history = useHistory();
    const { cartItems, total } = useSelector(mapState);
    // const { fullname, phnnumber, address, city, state, zip } = usershipping

    const errMsg = "You have no items in your cart.";
    const [hideModal, setHideModal] = useState(true);

    const configModal = {
        hideModal,
        toggleModal,
    };

    const resetForm = () => {
        setHideModal(true);
        setFullName("");
        setPhnNumber("");
        setAddress1("");
        setCity("");
        setUserState("");
        setZip("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            addShippingInfo({
                // REMOVE THE PART WHERE IT ASKS FOR SELLERID, CHECK FOR IS USER
                fullname,
                phnnumber,
                address,
                city,
                state,
                zip,
            })
        );
        resetForm();
    };
    // const handleSubmitCard = (e) => {
    //     e.preventDefault();

    //     dispatch(
    //         addShippingInfo({
    //             // REMOVE THE PART WHERE IT ASKS FOR SELLERID, CHECK FOR IS USER
    //             fullname,
    //             phnnumber,
    //             address,
    //             city,
    //             state,
    //             zip,
    //         })
    //     );
    //     resetForm();
    // };

    return (
        <div className="checkoutLayout1">
            <h2>Review your order</h2>
            <div className="BackButton">
                <Buttons2 onClick={() => history.goBack()}>
                    Previous
                </Buttons2>
            </div>
            <div className="grids">
                <div className="cart">
                    {cartItems.length > 0 ? (
                        <table border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <table
                                            border="0"
                                            cellSpacing="0"
                                            cellPadding="0"
                                        >
                                            <tbody>
                                                {cartItems.map((item, pos) => {
                                                    return (
                                                        <tr key={pos}>
                                                            <td>
                                                                <Item
                                                                    {...item}
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table
                                            border="0"
                                            cellSpacing="0"
                                            cellPadding="0"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table
                                                            border="0"
                                                            cellPadding="10"
                                                            cellSpacing="0"
                                                        >
                                                            {/* <tbody>
                              <tr>
                                <td>
                                <h3>
                                  Total: ${total}
                                </h3>
                                </td>
                              </tr>
                            </tbody> */}
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table
                                                            border="0"
                                                            cellPadding="10"
                                                            cellSpacing="0"
                                                        >
                                                            <tbody>
                                                                <tr>
                                                                    {/* <td>
                                <Button onClick={() => history.push('/payment')}>                                    Checkout
                                  </Button>
                                </td> */}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>{errMsg}</p>
                    )}
                </div>

                <div className="FINALCHECKOUT">
                    <div className="finalcheckoutbox">
                        <p>
                            By placing your order, you agree to Lagruni's
                            privacy notice and conditions of use.
                        </p>
                        <div className="ShippingandTaxes">
                            <div>
                                <th className="lefttotal" scope="row">
                                    Item(s) total
                                </th>
                                <td className="rightotal">
                                    <span class="money">${total}</span>
                                </td>
                            </div>
                            <div>
                                <th className="lefttotal" scope="row">
                                    Delivery Fee
                                </th>
                                <td className="rightotal">
                                    <span class="money">Free</span>
                                </td>
                            </div>
                            <div>
                                <th className="lefttotal" scope="row">
                                    Estimated Taxes
                                </th>
                                <td className="rightotal">
                                    <span class="money">Included</span>
                                </td>
                            </div>
                            <div class="Box2Text">2-4 Day Shipping</div>
                            <div class="Box2Text">Free Returns</div>

                        </div>
                            <Buttons onClick={() => history.push("/payment")}>
                                Review Order Details
                            </Buttons>
                            <h3 className="order">Shopping Total: ${total}</h3>
                    </div>
                </div>
                {/* <div className="customerdetails"> */}
                    {/* <div className="card1-shipping">
                        <div className="s1details">
                            <p>Shipping Info</p>
                        </div>
                        <div className="DBSavedshipping">
                            <div className="AddNewProductBtns">
                                <ul>
                                    <li className="AddShippingbtn">
                                        <Buttons onClick={() => toggleModal()}>
                                            Add New Address
                                        </Buttons>
                                    </li>
                                </ul>
                            </div>

                            <Modal {...configModal}>
                                <div className="addNewProductForm">
                                    <form onSubmit={handleSubmit}>
                                        <h2>Save Your Shipping Address</h2>

                                        <FormInput
                                            className="field"
                                            label="Full Name"
                                            type="text"
                                            value={fullname}
                                            handleChange={(e) =>
                                                setFullName(e.target.value)
                                            }
                                        />

                                        <FormInput
                                            className="field"
                                            label="Phone Number"
                                            type="number"
                                            value={phnnumber}
                                            handleChange={(e) =>
                                                setPhnNumber(e.target.value)
                                            }
                                        />

                                        <FormInput
                                            className="field"
                                            label="Address Line 1"
                                            type="text"
                                            // min="0.00"
                                            // max="10000.00"
                                            // step="0.01"
                                            value={address}
                                            handleChange={(e) =>
                                                setAddress1(e.target.value)
                                            }
                                        />

                                        <FormInput
                                            className="field"
                                            label="City"
                                            type="text"
                                            value={city}
                                            handleChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                        <FormInput
                                            className="field"
                                            label="State"
                                            type="text"
                                            value={state}
                                            handleChange={(e) =>
                                                setUserState(e.target.value)
                                            }
                                        />
                                        <FormInput
                                            className="field"
                                            label="Zip Code"
                                            type="number"
                                            value={zip}
                                            handleChange={(e) =>
                                                setZip(e.target.value)
                                            }
                                        />

                                        <br />

                                        <Buttons type="submit">
                                            Save Your Shipping Address
                                        </Buttons>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div> */}
                    {/* <div className="card2-payment">
                        <div className="s2details">
                            <p>Payment Method</p>
                        </div>
                        <div className="PayChoiceHolder">
                            <details>
                                <summary className="paymentChoiceBoxes">
                                    Credit Card
                                </summary>
                                    <details>
                                        <summary className="addNewCard">
                                            Add new Credit/Debit Card
                                        </summary>
                                    <details>
                                        <summary className="Cardform">
                                          <div className="psuedoModal">
                                            <form onSubmit={handleSubmit} className="cardback">
                                        <strong>Card Information</strong>

                                        <FormInput
                                            className="fieldcard"
                                            label="Card Number*"
                                            type="text"
                                            value={fullname}
                                            handleChange={(e) =>
                                                setFullName(e.target.value)
                                            }
                                        />

                                        <FormInput
                                            className="fieldcard"
                                            label="Name on Card*"
                                            type="number"
                                            value={phnnumber}
                                            handleChange={(e) =>
                                                setPhnNumber(e.target.value)
                                            }
                                        />

                                        <FormInput
                                            className="fieldcard"
                                            label="Expiration Date*"
                                            type="select"
                                            // min="0.00"
                                            // max="10000.00"
                                            // step="0.01"
                                            value={address}
                                            handleChange={(e) =>
                                                setAddress1(e.target.value)
                                            }
                                        />

                                        <Buttons type="submit" >
                                            Save
                                        </Buttons>

                                    </form>
                                    </div>
                                        </summary>

                                    </details>
                                    </details>
                                    </details>


                            <details>
                                <summary className="paymentChoiceBoxes">
                                    Gift Card
                                </summary>
                                <li>Add new Credit/Debit Card</li>
                            </details>
                            <details>
                                <summary className="paymentChoiceBoxes">
                                    + More
                                </summary>
                                <li>Add new Credit/Debit Card</li>
                            </details>


                        </div>
                    </div> */}

                    {/* <div className="card3-extra">
                        <div className="s3details">
                            <p>Extra</p>
                        </div>
                    </div> */}
                {/* </div> */}
            </div>
            <td className="PlaceOrderMobile">
                <Buttons onClick={() => history.push("/payment")}>
                    Place your order
                </Buttons>
                <h3 className="order">Shopping Total: ${total}</h3>
            </td>
        </div>
    );
};

export default Checkout;
