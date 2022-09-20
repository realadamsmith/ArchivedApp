import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useIonToast } from "@ionic/react";
import { firestore, storage } from "./../../Firebase/utils";
import { apiInstance } from "./../../Utils";
import { resolve } from "dns";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr,
});
const SellerForm = (props) => {
    const [present, dismiss] = useIonToast();
    const { currentUser } = useSelector(mapState);
    const history = useHistory();
    const [countryData, setCountryData] = useState("US");
    // console.log(currentUser.HeroSellerID);
    // console.log(countryData);

    const CreateAccount = async () => {
        if (currentUser) {
            if (currentUser.userRoles.includes("seller")) {
                present("You are already a Seller, don't be silly!", 4000); //Make more Easter Eggs
                history.push("/Seller");
            } else {
                present("Going to Stripe Connect Signup...", 4000);
                const promise = new Promise((resolve, reject) => {
                    apiInstance
                    .post("/create-account-hosted", {
                        countryData: countryData,
                    })
                    .then((response) => {
                        console.log(response);
                        // const result = await response.json();
                        // console.log(result, "result ");

                        const HeroSellerID = response.data.account;
                        // console.log(HeroSellerID);
                        firestore
                        .collection("users")
                        .doc(`${currentUser.id}`)
                        .update({ HeroSellerID });
                        resolve(response);
                    });
                });
            const returnThis = await promise;
            console.log(returnThis);
            window.location.href = returnThis.data.accountLink;

            // present("Going to Stripe Connect Signup...", 4000);
            // const response = await fetch(
                //     "https://us-central1-mallshop-5fa49.cloudfunctions.net/api/create-account-hosted",
                //     {
            //         method: "POST",
            //         body: countryData,
            //         headers: {
            //             "Content-type": "application/x-www-form-urlencoded",
            //         },
            //     }
            // );
            // console.log(response);

            // const result = await response.json();
            // const HeroSellerID = await result.account;
            // console.log(HeroSellerID)
            // await firestore
            //     .collection("users")
            //     .doc(`${currentUser.id}`)
            //     .update({ HeroSellerID });
            // window.location.href = result.accountLink;
            }
        } else {

            present(
                "You must login or create an account first to become a seller",
                4000
            );
            history.push("/registration");
        }

        // We may need to add a person or any other Accounts that need to be set up
    };

    return (
        // <AuthWrapper {...configAuthWrapper}>
        <div className="Entirepg">
            <h2 className="textabovebox">
                We work with Stripe to have earnings delivered to you.
            </h2>
            <h2 className="textabovebox">
                Please have the following documents available when completing
                the application:
            </h2>

            <div className="reqcontainer">
                <ul>
                    <li>
                        <details>
                            <summary>Business and Contact address</summary>

                            <li>
                                - Please provide your company registration
                                number, registered business address, phone
                                number, and primary contact.
                            </li>
                            <li>
                                - Certified copies of documents that prove your
                                ownership of the business.
                            </li>
                            <li>
                                - It can be your latest Tax Returns, Memorandum
                                and Articles of Association, Shareholder List,
                                Business License with owner name and etc.
                            </li>
                            <li>
                                - Bank account statement or Credit Card
                                Statement.
                            </li>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary>Proof of Identification</summary>
                            <li>
                                - Must be valid & official. If the license has a
                                validity date, it must have at least 1 month of
                                validity remaining from the date of application.
                            </li>
                            <li>
                                - Written in English. English translation is
                                required for non-English documents.
                            </li>
                            <li>
                                - Passports, Bank Statements or Utility bills
                                are acceptable forms of identification as well
                                to provide details for citizenship, and birth.
                            </li>
                            <li>
                                - Declare whether you are a beneficial owner of
                                the business or a legal representative.
                            </li>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary>Mobile or Telephone Number</summary>
                            <li>
                                - Phone bill that shows either your company name
                                or a person’s name that is related to your
                                company. This person’s name should match with
                                one of the Contacts you created in “Contact
                                Information”.
                            </li>
                            <li>- Must be issued within the last 6 months.</li>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="CenterDropdown">
                <div>Please select the country you are being taxed from</div>
                <div class="dropdown">
                    <button class="dropbtn">{countryData}</button>
                    <div class="dropdown-content">
                        <div onClick={() => setCountryData("US")}>
                            United States
                        </div>
                        <div onClick={() => setCountryData("CA")}>Canada</div>
                        <div onClick={() => setCountryData("FR")}>France</div>
                    </div>
                </div>
            </div>
            <div className="MarginFromDropdown">
                <h5>
                    By clicking on the Button below, you agree to accept our
                    policies in selling responsibly to the community.
                </h5>

                <div className="beASeller">
                    <button
                        class="stripe-connect white"
                        onClick={CreateAccount}
                    >
                        <p className="SellerSignupText">Lagruni with</p>
                        <span className="Stripethingy"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerForm;
