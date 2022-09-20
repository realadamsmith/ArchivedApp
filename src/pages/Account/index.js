import React, { useState, useEffect, useMemo } from "react";
import Button from "../../components/Forms/Button";
import { useDispatch, useSelector } from "react-redux";
// import { getUserOrderHistory } from './../../Redux/Orders/orders.actions';
// import OrderHistory from './../../components/OrderHistory';
import { useHistory, Link } from "react-router-dom";
import { firestore } from "./../../Firebase/utils";
import Video from "../../components/Video";
import ReactPlayer from "react-player";
import UpArrowGreen from "../../Assets/UpArrowGreen.png";
import { firestoreNo } from "./../../Firebase/utils";

import "./styles.scss";

const mapState = ({ user, ordersData }) => ({
  // DESTRUCTURE USER FROM REDUX STORE,
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Account = (props) => {
  const history = useHistory();
  const [accountData, setAccountData] = useState("");
  const { currentUser } = useSelector(mapState);
  const [showVideos, setVideos] = useState("Account Details");
  const [userVideos, setUserVideos] = useState([]);

  useEffect(async () => { // User Account Data
    const accountReference = firestore.collection("users").doc(currentUser.id);
    const snapshot = await accountReference.get();
    setAccountData({
      ...snapshot.data(),
      documentID: currentUser.id,
    });
  }, []);

  useEffect(async () => { // User Videos
    // const productscollection = await firestore
    //   .collection("users")
    //   .doc(currentUser.id)
    //   .collection("videos")
    //   .orderBy("createdDate")
    //   .startAfter(new Date(0))
    //   .get();

    const productscollection = await firestore
      .collectionGroup("productMainESGFeedReviews")
      .where("userID", "==", currentUser.id)
      .orderBy("createdDate")
      .limit(10);
    const snapshot = await productscollection.get();
    // .then((snap) => {
    //   const datavideos
    if (snapshot.empty) {
    }
    const testing = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        documentID: doc.id, // Getting documentID is to pass
      };
    });
    // Not needed because of Cron Job
    // for (const productVideo of testing) {
    //   const newTotal = Number((productVideo.likes * 2) + Number(productVideo.comments * 10)) + Number(250);
    //   if (newTotal == productVideo.points) {
    //   } else {
    //     const ish = newTotal - productVideo.points;
    //     const increment = firestoreNo.FieldValue.increment(ish);
    //     firestore.collection("products").doc(productVideo.productID)
    //     .collection("productMainESGFeedReviews")
    //     .doc(productVideo.documentID)
    //     .update({
    //       points: increment
    //     })
    //   }
    //   // console.log(productVideo)
    // }

    // console.log("Using sorter1 - Hardcoded sort property last_name", testing);
    const sorter1 = (a, b) => (a.feedstamp > b.feedstamp ? 1 : -1);
    testing.sort(sorter1);
    setUserVideos(testing);
  }, []);

  // const reviewVids = useMemo(() => slowFunction(showVideos) [showVideos]);
  console.log(userVideos);

  return (
    <div className="WrapWholeDash">
      <div className="MainExploreOtherBarHome">
        {showVideos == "Videos" ? (
          <>
            <div onClick={() => setVideos("Account Details")}>
              {" "}
              Account Details
            </div>
            <div onClick={() => setVideos("Videos")}>
              {" "}
              Videos
              <div className="ThinUnderline"></div>
            </div>
          </>
        ) : (
          <>
            <div onClick={() => setVideos("Account Details")}>
              {" "}
              Account Details
              <div className="ThinUnderline"></div>
            </div>
            <div onClick={() => setVideos("Videos")}> Videos</div>
          </>
        )}
      </div>

      <div className="AccountHeaderStats">
        <h1 className="centerText">Total lifetime UNI points</h1>
        <div className="oneBigBoxForNumber2">{accountData.Totalpoints}</div>
        <div className="centerText2">
          <a onClick={() => history.push("/LagrangeNetwork")}>
            See how getting points on the Lagrange Network works
          </a>
        </div>
      </div>

      {showVideos == "Videos" ? (
        <>
          {userVideos ? (
            <>
              <div className="videoGrid">
                {userVideos.map((clip, pos) => {
                  const {
                    videoUrl,
                    likes,
                    comments,
                    documentID,
                    productName,
                    productPrice,
                    productThumbnail,
                    productDesc,
                    points
                  } = clip;
                  const configProduct = { ...clip };

                  return (
                    <div className="NiceWrapper" key={pos}>
                      <ReactPlayer
                        className="EachVideo"
                        url={videoUrl}
                        {...configProduct}
                        audio
                        controls
                        muted
                        loop
                        preload="none"
                      ></ReactPlayer>
                      <div className="UserVideoOverlay">
                        <div className="overlayBackground">
                          <div className="TopRow">
                          <div className="separateFromArrow"> {points}</div>
                          <img className="upArrowImg" src={UpArrowGreen}></img>{" "}

                          </div>
                        </div>
                        <div className="overlayBackground">
                          <div className="BottomRow">{likes} Likes</div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>Upload your first review to earn UNI points!!</>
          )}
        </>
      ) : (
        <>
          <div className="OtherStatsWrap">
            <div className="accountStatBox">
              <h1>Track your Deliveries</h1>
              <div className="AccountActionBtns">
                <Button onClick={() => history.push("/OrderHistory")}>
                  Track{" "}
                </Button>
              </div>
            </div>

            <div className="accountStatBox">
              <h1>Number of Purchases</h1>
            </div>

            <div className="accountStatBox">
              <h1>Short Reviews Voted Up</h1>
              <div className="oneBigBoxForNumber">
                {accountData.VideosVotedUp}
              </div>
            </div>
            <div className="accountStatBox">
              <h1>Uni Points Available</h1>
              <div className="oneBigBoxForNumber">{accountData.points}</div>
            </div>
          </div>
          <div className="AccountHeaderStats">
            <div>
              <h1 className="centerText">Random Account Feed</h1>
            </div>
            <div className="oneLongBlockWithListOfPromos">
              <li>
                August 25 2022 - Tracking Link button and Record a Review in your Order History!
              </li>
              <li>
                July 25 2022 - When recording a video review from your Order History, or the Product Page from your iOS or Android phone, pause and resume the video by tapping the record button to get multiple takes! - Points system
              </li>
              <li>
                June 15 2022 - Use your points today on purchases from your video reviews, or just from any likes, or comments you have made on the Reviews feed in the app or Desktop video feed. - Points system
              </li>
              <li>
                May 28 2022 - Using your UNI points from posting videos or other
                activity at checkout is coming soon! - Points system
              </li>
              <li>
                May 5 2022 - Create a video review of your order and get $2.00
                (200pts) off next purchase! - Creator Program
              </li>
              <li>
                May 1 2022 - Have questions about your order? Find the support
                link at the bottom footer and send an email!
              </li>
              <li>
                Apr 3 2022 - Liking video review Clips will help share great
                products with the community and other users
              </li>
            </div>
          </div>
        </>
      )}

      {/* <OrderHistory orders={orderHistory} /> */}
    </div>
  );
};

export default Account;
