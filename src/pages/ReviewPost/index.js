import { React, useState, useEffect, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { auth } from "./../../Firebase/utils";
import "./styles.scss";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { firestoreNo, firestore, storage } from "./../../Firebase/utils";
import {
  MdOutlineFlipCameraIos,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { ImRadioUnchecked } from "react-icons/im";
import { IoRadioButtonOn } from "react-icons/io5";
import { AiFillCheckCircle } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import Backdrop from "@mui/material/Backdrop";
import { useIonToast, IonActionSheet, IonFabButton, IonIcon, IonFabList, } from "@ionic/react";
import { add, alarm, } from "ionicons/icons";
const ReviewPost = () => {
  const screenshotRef = useRef(null);
  const webcamRef = useRef(null);
  const { productID } = useParams();
  const history = useHistory();

  // Moz Morris capture stream example
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [present, dismiss] = useIonToast();
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [stopVideo, setStopVideo] = useState(false);

  const [hideModal, setHideModal] = useState(true);
  const toggleModal = () => setHideModal(!hideModal);
  const configModal = {
    hideModal,
    toggleModal,
  };
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const videoConstraints = {
    // Probs good Zoom resource https://web.dev/camera-pan-tilt-zoom/
    facingMode: FACING_MODE_USER,
    mirrored: true,
    width: 1280, // Maybe 1500x1000, or flip 1080x1920 like Tiktok, or down to 720p
    height: 720,
  };

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const handleClick = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  const resetForm = () => {
    setHideModal(true);
  };

  // useEffect(() => {
  //     // console.log(productID);
  // }, []);
  // Video Stream PERFECT
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      // DON'T FORGET TO CHANGE THIS
      mimeType: "video/mp4",
      // DON'T FORGET TO CHANGE THIS
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handlePauseCaptureClick = useCallback(() => {
    mediaRecorderRef.current.pause();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);
  const handleResumeCaptureClick = useCallback(() => {
    mediaRecorderRef.current.resume();
    setCapturing(true);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  // Stop Video Stream
  // const handleStopCaptureClick = useCallback(() => {
  //   mediaRecorderRef.current.stop();
  //   setCapturing(false);
  // }, [mediaRecorderRef, webcamRef, setCapturing]);
  useEffect(() => {
    if (stopVideo == true) {
      // console.log("RECORD STOPPED");
      mediaRecorderRef.current.stop();
      setCapturing(false);
    } else {
      // console.log("RECORD != STOPPED");
    }
  }, [stopVideo]);
  useEffect(() => {
    if (stopVideo == true && recordedChunks.length > 0) {
      // console.log("SUBMITTED");
      handleSubmitUpload();
    } else {
      // console.log("NOT SUBMITTED");
    }
  }, [recordedChunks]);

  // console.log("Base Render")
  // console.log(mediaRecorderRef.current);
  // console.log(recordedChunks);
  // console.log("Capturing is " + capturing);
  // console.log("stopVideo is " + stopVideo);

  // Replace this with firebase upload, then this will display on the screen.
  async function handleSubmitUpload() {
    // const {productName, productThumbnail} = productID
    // console.log(productName) // FOR FUTURE ELIMINATION OF BELOW FIREBASE CALL
    // if (recordedChunks.length) {
    // console.log("triggered, and theres chunks");
    setDisable(true);
    history.push(`/product/${productID}`);

    // setLoading(true);

    // setTimeout(() => {
    //   setLoading(false);
    // }, 4000);

    present("Uploading...", 7000);
    const increment = firestoreNo.FieldValue.increment(250);

    // console.log("clicked Obama");
    const promises = [];
    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    // https://roytuts.com/download-file-from-server-using-react/
    // fetch(window.location.href)

    const randomId = firestore.collection("test").doc().id;
    const reviewRef = await storage().ref(`prodReviews/${randomId}`);

    // STORING THE BLOB IN STORAGE TO ALLOW ADDING TO COLL
    const uploadTask = await storage().ref(`prodReviews/${randomId}`).put(blob);
    await promises.push(uploadTask);

    // ADDING A CLIP TO THE COLL > COLL
    const videoUrl = await reviewRef.getDownloadURL();
    const timestamp = new Date();
    const feedstamp = timestamp * -1;
    const productscollectiondoc = firestore
      .collection("products")
      .doc(productID);
    const document = await productscollectiondoc.get();
    if (!document.exists) {
      console.log("No such document");
    } else {
      const productDetails = document.data();

      const { productName, productThumbnail, productPrice, productDesc } =
        productDetails;

      await firestore
        .collection("products")
        .doc(productID)
        .collection("productMainESGFeedReviews") // Decide whether it's smart to set DocID as productID or etc.
        .doc()
        .set({
          videoUrl,
          userID: auth.currentUser.uid,
          // tiktokUsername: auth.currentUser.tiktokUsername,
          createdDate: timestamp,
          feedstamp: feedstamp,
          likes: 0,
          productID,
          comments: 0,
          points: 250,
          productName,
          productThumbnail,
          productPrice,
          productDesc,
          downloadStoreID: randomId,
        }); // ALSO NEED A RANDOM ID EACH UPLOAD, AND THEN MAP THE WHOLE COLLECTION

      await firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .update({
        points: increment,
        Totalpoints: increment
      })
    // What is this actually Resolving? Will this allow us to pass to Page?
    present("Review Uploaded Successfully!", 3000);

    // console.log("Review for item uploaded successfully");
    setRecordedChunks([]);
    // }
    }
  }

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 99999,
        }}
        open={loading}
        height="100vh"
      >
        <ClipLoader size={100} />
      </Backdrop>

      <div className="RecordNow">
        <Webcam
          className="Clips"
          audio={true}
          videoConstraints={{
            ...videoConstraints,
            facingMode,
            mirrored: true,
          }}
          ref={webcamRef}
          style={{
            height: "92vh",
            width: "100vw",
            objectFit: "fill",
            position: "relative",
          }}
          //  duration={imageConstraints.duration}
        />
        <div className="FlipCameraRow">
          <IonFabButton className="FlipCamera" onClick={handleClick}>
            <MdOutlineFlipCameraIos className="IconSize" />
          </IonFabButton>

          <IonFabButton
            className="FlipCamera"
            // onClick={ChooseSeconds}
            expand="block"
            onClick={() => setShowActionSheet(true)}
          >
            <IonIcon className="IconSize" icon={alarm} />
          </IonFabButton>
        </div>

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          buttons={[
            {
              text: "Timer Currently Disabled",
              role: "destructive",
              id: "delete-button",
              data: { type: "delete" },
              handler: () => {},
            },
            { text: "", data: 10, handler: () => {} },
            { text: "", handler: () => {} },
            { text: "Cancel", role: "cancel", handler: () => {} },
          ]}
        ></IonActionSheet>

        {/* start when “null”, resume when != null, and pause when capturing */}
        {mediaRecorderRef.current != null ? (
          <>
            {capturing ? (
              <MdRadioButtonUnchecked
                className="btn2Clips"
                onClick={handlePauseCaptureClick}
              ></MdRadioButtonUnchecked>
            ) : (
              <MdRadioButtonUnchecked
                className="btn2Resume"
                onClick={handleResumeCaptureClick}
              ></MdRadioButtonUnchecked>
            )}
          </>
        ) : (
          <MdRadioButtonUnchecked
            className="btn1Clips"
            onClick={handleStartCaptureClick}
          ></MdRadioButtonUnchecked>
        )}

        {/* we just need to remove the Stop function, that will be moved
       to the handlesubmitupload  */}

        {/* {capturing ? (
          <MdRadioButtonUnchecked
            className="btn2Clips"
            onClick={handleStopCaptureClick}
          ></MdRadioButtonUnchecked>
        ) : (
          <MdRadioButtonChecked
            className="btn1Clips"
            onClick={handleStartCaptureClick}
          ></MdRadioButtonChecked>
        )} */}
        {mediaRecorderRef.current != null && capturing == false && (
            <button
              className="btn3button"
              onClick={() => setStopVideo(true)}
              disabled={disable}
            >
              <AiFillCheckCircle
                className="btn3Clips"

                // onClick={handleDownload}
              >
                Preview
              </AiFillCheckCircle>
            </button>
          )}

        {/*
            <Modal {...configModal}>things
                <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>
            </Modal> */}
      </div>
    </div>
  );
};

export default ReviewPost;
