import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { apiInstance } from "./../../Utils";

import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../Redux/Items/items.actions";
import Modal from "./../../components/Modal";
import Modal2 from "./../../components/Modal2";
import FormInput from "./../../components/Forms/FormInput";
import FormSelect from "./../../components/Forms/FormSelect";
import Button from "./../../components/Forms/Button";
import CKEditor from "ckeditor4-react";
import { storage,firestoreNo } from "./../../Firebase/utils";

import "./styles.scss";
import { firestore } from "./../../Firebase/utils";
import { useIonToast } from "@ionic/react";
import { RiVideoUploadLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import firebase from "firebase";
import imageCompression from "browser-image-compression";
import { promises } from "dns";

const mapState = ({ user }) => ({
  // productsData }) => ({
  currentUser: user.currentUser,
});

const Admin = (props) => {
  const { currentUser } = useSelector(mapState); // THIS STATE IS ALSO USED ON ITEMRESULTS PAGE
  const dispatch = useDispatch();
  const history = useHistory();
  const [present, dismiss] = useIonToast();

  const [hideModal, setHideModal] = useState(true);
  const [hideModal2, setHideModal2] = useState(true);
  const [productCategory, setProductCategory] = useState("");
  const [subClothingCategory, setsubClothingCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [preproductThumbnail, setpreProductThumbnail] = useState([]);
  const [preproductVideo, setpreProductVideo] = useState([]);
  const [productThumbnail, setProductThumbnail] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productHeight, setProductHeight] = useState(0);
  const [productWidth, setProductWidth] = useState(0);
  const [productOunces, setProductOunces] = useState(0);
  const [productLength, setProductLength] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [iPhoneSizeArray, setiPhoneSizeArray] = useState([]);
  const productHeroSellerID = currentUser.HeroSellerID;
  const [errors, setError] = useState("");

  const [seller, setSeller] = useState([]);
  const [showOptionsBox, setOptionsBox] = useState(false);
  const [showPreOptionsBox, setshowPreOptionsBox] = useState(false);
  const [itemToUploadVideo, setitemToUploadVideo] = useState("");
  const [itemToEdit, setitemToEdit] = useState("");
  const [compareColors, setCompareColors] = useState([]);

  //   const { data, queryDoc, isLastPage } = products; // From the Products Redux store we are dstr data, queryDoc, isLastPage
  useEffect(async () => {
    const productscollection = firestore.collection("products");

    const snapshot = await productscollection
      .where("productHeroSellerID", "==", currentUser.HeroSellerID)
      .orderBy("createdDate")
      .get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return <h2>You don't have any products yet!</h2>;
    }
    setSeller(
      snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          documentID: doc.id,
        };
      })
    );
  }, []);

  // TO ANIMATE MODAL https://www.youtube.com/watch?v=vUe91uOx7R0&t=1485s
  const toggleModal = () => setHideModal(!hideModal);
  const toggleModal2 = () => setHideModal2(!hideModal2);

  const configModal = {
    hideModal,
    toggleModal,
  };
  const configModal2 = {
    hideModal,
    toggleModal,
  };

  const types = ["image/png", "image/jpeg", "image/avif", "image/webp"];

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("");
    setProductName("");
    setpreProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
    setProductQuantity("");
    setProductHeight("");
    setProductLength("");
    setProductWidth("");
    setProductOunces("");
    setSizeArray([]);
    setiPhoneSizeArray([]);
    setColorArray([]);
    setshowPreOptionsBox(false);
  };

  const productImgHandler = async (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 10e6) {
        window.alert("Please upload a file smaller than 10 MB");
        return false;
      }
      const options = {
        maxSizeMB: 3, // 3
        maxWidthOrHeight: 1920, //1920
        useWebWorker: true,
      };

      const selectedFiles = e.target.files[i];
      if (selectedFiles && types.includes(selectedFiles.type)) {
        // console.log(`${selectedFiles.size / 1024 / 1024} MB`);
        try {
          const compressedFile = await imageCompression(selectedFiles, options);
          // console.log(`${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          setpreProductThumbnail((prevState) => [...prevState, compressedFile]);
        } catch (error) {
          console.log(error);
        }
      } else {
        window.alert("Please upload JPEG, PNG, WEBP, or AVIF image files");
        return false;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    present("Refresh to see uploaded product!", 4000);
    const promises = [];
    preproductThumbnail.map(async (image) => {
      const uploadTask = storage().ref(`prodimages/${image.name}`).put(image);
      async function uploadTaskPromise() {
        return new Promise(function (resolve, reject) {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (err) => {
              setError(err.message);
              reject();
            },
            () => {
              storage()
                .ref("prodimages")
                .child(image.name)
                .getDownloadURL() // 2 images
                .then((urls) => {
                  resolve(urls);
                });
            }
          );
        });
      }
      promises.push(uploadTaskPromise());
    });
    Promise.all(promises).then((values) => {
      dispatch(
        addProductStart({
          productCategory,
          productName,
          productThumbnail: values,
          productPrice,
          productDesc,
          productHeroSellerID, // we could add currentuser.herosellerID
          productLength,
          productWidth,
          productHeight,
          productOunces,
          productQuantity,
          colorArray,
          sizeArray,
        })
      );
    });
    resetForm();
  };

  const handleEditFormSubmit = (e) => {
    console.log(preproductThumbnail);
    e.preventDefault();
    console.log(productHeight);
    console.log(productOunces);
    present("Saving, Refresh page to see changes", 4000);
    const listingReference = firestore.collection("products").doc(itemToEdit);
    // for (x in state) {
    // listingReference.update({x: x})
    // }
    if (productName) {
      listingReference.update({ productName: productName });
    }
    if (preproductThumbnail) {
      const promises = [];
      preproductThumbnail.map((image) => {
        const uploadTask = storage().ref(`prodimages/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (err) => {
            setError(err.message);
          },
          () => {
            storage()
              .ref("prodimages")
              .child(image.name)
              .getDownloadURL() // 2 images
              .then((productThumbnail) => {
                setProductThumbnail((prevState) => [
                  ...prevState,
                  productThumbnail,
                ]);
                console.log("PRODTHUMB2", productThumbnail);
                listingReference.update({ productThumbnail: productThumbnail });
              });
          }
        );
      });
    }
    if (productDesc) {
      listingReference.update({ productDesc: productDesc });
    }
    if (productQuantity) {
      listingReference.update({ productQuantity: productQuantity });
    }
    if (productCategory) {
      listingReference.update({ productCategory: productCategory });
    }
    if (productHeight) {
      listingReference.update({ productHeight: productHeight });
    }
    if (productLength) {
      listingReference.update({ productLength: productLength });
    }
    if (productWidth) {
      listingReference.update({ productWidth: productWidth });
    }
    if (productOunces) {
      listingReference.update({ productOunces: productOunces });
    }
    if (productPrice) {
      listingReference.update({ productPrice: productPrice });
    }
    // if (colorArray) {
    //   for (color in colorArray)
    //   console.log(color)
    //     // listingReference.update({colorArray: FieldValue.arrayUnion(x)})
    // }
    // if (sizeArray) {
    //   // for (x in sizeArray)
    //   // console.log(x)

    //     listingReference.update({sizeArray: productPrice})
    // }
    // if (preproductThumbnail) {
    //   console.log("There is a picture Chosen")
    // }
    // preproductThumbnail.map((image) => {
    //   const uploadTask = storage().ref(`prodimages/${image.name}`).put(image);
    //   promises.push(uploadTask);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (err) => {
    //       setError(err.message);
    //     },
    //     () => {
    //       storage()
    //         .ref("prodimages")
    //         .child(image.name)
    //         .getDownloadURL() // 2 images
    //         .then((productThumbnail) => {
    //           setProductThumbnail((prevState) => [
    //             ...prevState,
    //             productThumbnail,
    //           ]);
    //           console.log("PRODTHUMB2", productThumbnail);
    //         }, );
    //     }
    //   );
    // });
    resetForm();
    setitemToEdit("");
  };
  const colorUpdateListing = async (e) => {
    const listingReference = firestore.collection("products").doc(itemToEdit);
    const allListingData = await listingReference.get();
    // const colorsInDoc =
    const compareColors = [...allListingData.data().colorArray];

    if (compareColors.includes(e)) {
      listingReference.update({
        colorArray: firebase.firestore.FieldValue.arrayRemove(e),
      });
    } else {
      listingReference.update({
        colorArray: firebase.firestore.FieldValue.arrayUnion(e),
      });
    }

    //   if (compareColors.length < 1) {
    //     listingReference.update({colorArray: firebase.firestore.FieldValue.arrayUnion(e)})

    //   } else {

    //     for (var color of compareColors) {
    //       // iterate through, and if theres a match, THEN we do the IF ELSE
    //       if (e == color) {
    //       listingReference.update({colorArray: firebase.firestore.FieldValue.arrayRemove(e)})
    //     } else {
    //           listingReference.update({colorArray: firebase.firestore.FieldValue.arrayUnion(e)})
    //     }
    //   }
    // }
  };
  const sizeUpdateListing = async (e) => {
    const listingReference = firestore.collection("products").doc(itemToEdit);
    const allListingData = await listingReference.get();
    // const colorsInDoc =
    const compareSize = [...allListingData.data().sizeArray];

    if (compareSize.includes(e)) {
      listingReference.update({
        sizeArray: firebase.firestore.FieldValue.arrayRemove(e),
      });
    } else {
      listingReference.update({
        sizeArray: firebase.firestore.FieldValue.arrayUnion(e),
      });
    }
  };

  const resetAllMenuStates = () => {
    setshowPreOptionsBox("");
  };
  const buttonToSubmitVideoUpload = (index) => {
    setOptionsBox(false);
    setpreProductVideo([]);

    // if (showPreOptionsBox == true) {
    //   setshowPreOptionsBox(false);
    //   // Maybe Reset State for setvidIdForCommentsFunc
    // } else {
    //   setshowPreOptionsBox(true);
    // }
    // console.log(index)
    // setitemToUploadVideo(item)
    if (showPreOptionsBox == index) {
      setshowPreOptionsBox("");
    } else {
      setshowPreOptionsBox(index);
    }
  };
  const showVideoUploadButton = (item) => {
    // setshowPreOptionsBox(index)
    setitemToUploadVideo(item);
    console.log(item);
    if (showOptionsBox == true) {
      setOptionsBox(false);
      setpreProductVideo([]);

      // Maybe Reset State for setvidIdForCommentsFunc
    } else {
      setOptionsBox(true);
      // setshowPreOptionsBox(documentID)
    }
  };
  const productVideoReviewHandler = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 50e6) {
        window.alert("Please upload a file smaller than 50 MB");
        return false;
      }
      const selectedFiles = e.target.files[i];
      selectedFiles["id"] = Math.random();

      setpreProductVideo(selectedFiles);
    }
    // setshowPreOptionsBox(true)
  };
  const handleVideoReviewSubmit = async (e) => {
    const increment = firestoreNo.FieldValue.increment(250);

    e.preventDefault();
    setOptionsBox(false); // This should close the box after Submit is hit, and still upload
    setshowPreOptionsBox(false);

    const {
      productName,
      productThumbnail,
      productPrice,
      productDesc,
      documentID,
      productHeroSellerID,
    } = itemToUploadVideo;

    present("Uploading video to Reviews Feed...", 2000);
    // const IDofProduct = item.documentID
    const promises = [];
    const randomId = firestore.collection("test").doc().id;
    const reviewRef = await storage().ref(`prodReviews/${randomId}`);

    const uploadTask = await storage()
      .ref(`prodReviews/${randomId}`)
      .put(preproductVideo);
    await promises.push(uploadTask);
    const videoUrl = await reviewRef.getDownloadURL();

    const timestamp = new Date();
    const feedstamp = timestamp * -1;
    //   const productscollectiondoc = firestore.collection('products').doc(IDofProduct);
    //   const document = await productscollectiondoc.get();
    //   if (!document.exists) {
    //     console.log("No such document")
    // } else {
    //     const productDetails = document.data()
    //     const {productName, productThumbnail, productPrice, productDesc } = productDetails

    await firestore
      .collection("products")
      .doc(documentID)
      .collection("productMainESGFeedReviews") // Decide whether it's smart to set DocID as productID or etc.
      .doc()
      .set({
        videoUrl,
        userID: currentUser.id,
        createdDate: timestamp,
        feedstamp: feedstamp,
        likes: 0,
        productID: documentID,
        comments: 0,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
        productHeroSellerID,
        // }); // ALSO NEED A RANDOM ID EACH UPLOAD, AND THEN MAP THE WHOLE COLLECTION
      });

      await firestore
      .collection('users')
      .doc(currentUser.id)
      .update({
        points: increment,
        Totalpoints: increment
      })
    present("Review Uploaded Successfully!", 4000);
    setpreProductVideo([]);
    setOptionsBox(false);
  };

  const StrpExpLogin = async () => {
    present("Going to Payouts Dashboard...", 4000);

    const loginResponse = await apiInstance.post("/login_links", {
      productHeroSellerID,
    });
    // console.log(loginResponse)
    const link = await loginResponse.data.url;
    // window.open(link)
    window.location.href = link;
  };
  const handleFilter = (e) => {
    setsubClothingCategory(e.target.value);
  };
  const chooseVariation = {
    defaultValue: subClothingCategory,
    options: [
      {
        name: "Choose",
        value: "Choose",
      },
      {
        name: "Color",
        value: "Color",
      },
      {
        name: "Size",
        value: "Size",
      },
    ],
    handleChange: handleFilter,
  };

  const colorArrayChange = (e) => {
    const newColor = e;
    //  console.log(newColor)

    //  setFilteredArray(colorArray.filter((e,b) => colorArray.indexOf(e) === b))
    setColorArray((oldArray) => [...oldArray, newColor]);
    //  console.log(colorArray)
    //  const finalColors = new Set(colorArray)
    //  const finalColorsArray = [...finalColors]
    //  const finalColors = [...new Set(colorArray)]
    //  console.log(finalColors)
    //  setColorArray(finalColors)
    // setFilteredArray(
    //      colorArray.filter(colors => colors !== newColor)
    //      )

    //  console.log(finalColorsArray)
    // console.log(filteredArray);
  };
  const TestSizeArray = (e) => {
    const newSize = e;
    setSizeArray((oldArray) => [...oldArray, newSize]);
  };
  const selectiPhoneSizes = (e) => {
    const newSize = e;
    setiPhoneSizeArray((oldArray) => [...oldArray, newSize]);
  };

  const editListingFunction = (item) => {
    // setshowPreOptionsBox(false) Don't, so people can see what they're editing
    if (itemToEdit) {
      setitemToEdit("");
      // Maybe Reset State for setvidIdForCommentsFunc
    } else {
      setitemToEdit(item.documentID);
    }
    const {
      productName,
      productThumbnail,
      productDesc,
      productCategory,
      productHeight,
      productLength,
      productWidth,
      productOunces,
      productPrice,
      productQuantity,
    } = itemToUploadVideo;
    window.scrollTo(300, 1000);
    // console.log("did it scroll")
  };

  const deleteListingFunction = () => {
    present("This feature is currently unavailable", 4000);
  };

  return (
    <div className="admin">
      <div className="PaySummary">
        <p>Seller Summary</p>
        <div className="SummaryGrid">
          <p className="PHeader">
            <Button onClick={StrpExpLogin} className="SellerSummary">
              See Payouts
            </Button>
          </p>
          {/* <p className="Value"></p> */}

          <p className="PHeader">
            <Button
              onClick={() => history.push("/CustomerOrders")}
              className="SellerSummary"
            >
              Orders
            </Button>
          </p>
          {/* <p className="Value"></p> */}

          <p className="PHeader">
            <Button
              onClick={() => history.push("/Seller")}
              className="SellerSummary"
            >
              Products
            </Button>
          </p>
          {/* <p className="Value"></p> */}
        </div>
      </div>
      <div className="AccountHeaderStats">
        <div>
          <h1 className="centerText">Seller News Feed</h1>
        </div>
        <div className="oneLongBlockWithListOfPromos">
          <li>
            July 26 2022 - We are working on a 3PL "FBA" program with integrations with Deliverr and Shipbob as 3PL providers to be an for your products. Please email adam@lagruni.com for more details on the program.
          </li>
          <li>
            June 28 2022 - As a Seller, you can now upload a video for each of your products and also earn points just like a customer, with likes and comments if it is a good quality video review of the product or funny or has viral potential. This will appear on the Reviews tab on mobile and desktop just like customer uploaded videos to promote your product on Lagruni and the Lagruni Network which includes TikTok, Instagram Reels, Facebook Reels, Pinterest, Youtube Shorts, etc.
          </li>
          <li>
            May 24 2022 - When shipping orders, please email adam@lagruni.com if
            you are shipping using your own system. Our shipping label system
            with Shippo gives Customers' accounts a tracking link as soon as the
            printed label is shipped. This does not happen if you use an
            external system.
          </li>
          <li>
            May 2 2022 - The encouraged standard Seller routine is to list your
            top products here, check your Orders tab 1/day, and continue
            focusing on your other channels.
          </li>
          <li>
            Apr 28 2022 - Product Listing notes - Multiple images for products
            is currently unavailable. Stay tuned for next week's updates.
          </li>
          <li>
            Apr 15 2022 - Shipping Details - Self-fulfill or "FBM" orders by
            using our "Print Shipping Label" system in "Orders". Sending your
            inventory to our 3PL partners Shipbob and Deliverr as our version of
            "FBA" or "WFS" is coming soon for 2-3 day shipping.
          </li>
        </div>
      </div>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h2>
                  Manage Products
                  <div className="AddNewProductBtns">
                    <div className="gridAddProducts">
                      <Button onClick={() => toggleModal()}>
                        Add new product
                      </Button>
                    </div>
                    <div className="gridAddProducts2">
                      <Button>Add an Existing Product</Button>
                    </div>
                  </div>
                  <Modal {...configModal}>
                    <div className="addNewProductForm">
                      <form onSubmit={handleSubmit}>
                        <h2>Add New Product</h2>

                        <FormSelect
                          className="field"
                          label="Category"
                          required
                          options={[
                            {
                              name: "",
                              value: "",
                            },
                            {
                              name: "Clothing, Shoes, Jewelry & Watches",
                              value: "Clothing, Shoes, Jewelry & Watches",
                            },
                            {
                              name: "Electronics",
                              value: "Electronics",
                            },
                            {
                              name: "Computers",
                              value: "Computers",
                            },
                            {
                              name: "Smart home",
                              value: "Smart Home",
                            },
                            {
                              name: "Home, Garden & Tools",
                              value: "Home, Garden & Tools",
                            },
                            {
                              name: "Beauty & Health",
                              value: "Beauty & Health",
                            },
                            {
                              name: "Accessories",
                              value: "Accessories",
                            },
                            // { //   name: "Handmade", //   value: "Handmade", // }, // { //   name: "Sports", //   value: "Sports", // }, // { //   name: "Outdoors", //   value: "Outdoors", // }, // { //   name: "Automotive & Industrial", //   value: "Automotive & Industrial", // },
                          ]}
                          handleChange={(e) =>
                            setProductCategory(e.target.value)
                          }
                        />
                        {/* <div className="2ndRowOfAddProductForm"></div> */}
                        {productCategory ==
                          "Clothing, Shoes, Jewelry & Watches" ||
                        "Electronics" ? (
                          <FormSelect {...chooseVariation} />
                        ) : (
                          <></>
                        )}
                        {(productCategory == "Electronics" &&
                          subClothingCategory == "Size") ||
                        iPhoneSizeArray.length > 0 ? (
                          <div className="ColorRow">
                            <input
                              type="checkbox"
                              value="iPhone 14"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 14
                            <input
                              type="checkbox"
                              value="iPhone 13 Pro Max"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 13 Pro Max
                            <input
                              type="checkbox"
                              value="iPhone 13 Pro"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 13 Pro
                            <input
                              type="checkbox"
                              value="iPhone 13"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 13
                            <input
                              type="checkbox"
                              value="iPhone 12 Pro Max"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 12 Pro Max
                            <input
                              type="checkbox"
                              value="iPhone 12 Pro"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 12 Pro
                            <input
                              type="checkbox"
                              value="iPhone 12"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 12
                            <input
                              type="checkbox"
                              value="iPhone 11 Pro Max"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 11 Pro Max
                            <input
                              type="checkbox"
                              value="iPhone 11 Pro"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 11 Pro
                            <input
                              type="checkbox"
                              value="iPhone 11"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 11
                            <input
                              type="checkbox"
                              value="iPhone XR"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone XR
                            <input
                              type="checkbox"
                              value="iPhone XS Max"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone XS Max
                            <input
                              type="checkbox"
                              value="iPhone XS"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone XS
                            <input
                              type="checkbox"
                              value="iPhone 8 Plus"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 8 Plus
                            <input
                              type="checkbox"
                              value="iPhone 8"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 8
                            <input
                              type="checkbox"
                              value="iPhone 7 Plus"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 7 Plus
                            <input
                              type="checkbox"
                              value="iPhone 7"
                              name="checkbox"
                              onClick={(e) => selectiPhoneSizes(e.target.value)}
                            />{" "}
                            iPhone 7
                          </div>
                        ) : (
                          <>
                            {(productCategory ==
                              "Clothing, Shoes, Jewelry & Watches" &&
                              subClothingCategory == "Size") ||
                            sizeArray.length > 0 ? (
                              <div className="ColorRow">
                                <input
                                  type="checkbox"
                                  value="Extra Small"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                XS
                                <input
                                  type="checkbox"
                                  value="Small"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                S
                                <input
                                  type="checkbox"
                                  value="Medium"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                M
                                <input
                                  type="checkbox"
                                  value="Large"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                L
                                <input
                                  type="checkbox"
                                  value="Extra Large"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                XL
                                <input
                                  type="checkbox"
                                  value="8"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                8
                                <input
                                  type="checkbox"
                                  value="8.5"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                8.5
                                <input
                                  type="checkbox"
                                  value="9"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                9
                                <input
                                  type="checkbox"
                                  value="9.5"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                9.5
                                <input
                                  type="checkbox"
                                  value="10"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                10
                                <input
                                  type="checkbox"
                                  value="10.5"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                10.5
                                <input
                                  type="checkbox"
                                  value="11"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                11
                                <input
                                  type="checkbox"
                                  value="11.5"
                                  name="checkbox"
                                  onClick={(e) => TestSizeArray(e.target.value)}
                                />{" "}
                                11.5
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        )}

                        {subClothingCategory == "Color" ||
                        colorArray.length > 0 ? (
                          <div className="ColorRow">
                            <input
                              type="checkbox"
                              value="White"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            White
                            <input
                              type="checkbox"
                              value="Black"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Black
                            <input
                              type="checkbox"
                              value="Grey"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Grey
                            <input
                              type="checkbox"
                              value="Red"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Red
                            <input
                              type="checkbox"
                              value="Blue"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Blue
                            <input
                              type="checkbox"
                              value="Green"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Green
                            <input
                              type="checkbox"
                              value="Yellow"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Yellow
                            <input
                              type="checkbox"
                              value="Light Blue"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Light Blue
                            <input
                              type="checkbox"
                              value="Violet"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Violet
                            <input
                              type="checkbox"
                              value="Pink"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Pink
                            <input
                              type="checkbox"
                              value="Watermelon"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Watermelon
                            <input
                              type="checkbox"
                              value="Gold"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Gold
                            <input
                              type="checkbox"
                              value="Silver"
                              name="checkbox"
                              onClick={(e) => colorArrayChange(e.target.value)}
                            />{" "}
                            Silver
                          </div>
                        ) : (
                          // <FormSelect {...chooseColor} />
                          <></>
                        )}

                        <FormInput
                          className="field"
                          label="Name"
                          type="text"
                          value={productName}
                          required
                          handleChange={(e) => setProductName(e.target.value)}
                        />

                        <FormInput
                          className="field"
                          label="Upload Product Image File"
                          type="file"
                          required
                          multiple
                          onChange={productImgHandler}
                        />
                        {errors && <h6>{errors}</h6>}

                        <FormInput
                          className="field"
                          label="Price"
                          type="number"
                          min="0"
                          max="1000.00"
                          placeholder="ex: 55.99"
                          step="0.01"
                          required
                          value={productPrice}
                          handleChange={(e) => setProductPrice(e.target.value)}
                        />
                        <div className="Dimensiondiv">
                          <FormInput
                            className="field"
                            label="Length (in)"
                            type="number"
                            min="0"
                            max="200"
                            placeholder="3"
                            step="0.1"
                            required
                            value={productLength}
                            handleChange={(e) =>
                              setProductLength(e.target.value)
                            }
                          />
                        </div>
                        <div className="Dimensiondiv">
                          <FormInput
                            className="field"
                            label="Width (in)"
                            type="number"
                            min="0"
                            max="200"
                            placeholder="3"
                            step="0.1"
                            required
                            value={productWidth}
                            handleChange={(e) =>
                              setProductWidth(e.target.value)
                            }
                          />
                        </div>
                        <div className="Dimensiondiv">
                          <FormInput
                            className="field"
                            label="Height (in)"
                            type="number"
                            min="0"
                            max="200"
                            placeholder="3"
                            step="0.1"
                            required
                            value={productHeight}
                            handleChange={(e) =>
                              setProductHeight(e.target.value)
                            }
                          />
                        </div>
                        <div className="Dimensiondiv2">
                          <FormInput
                            className="field"
                            label="Weight (oz)"
                            type="number"
                            min="0"
                            max="500"
                            placeholder="3.5"
                            step="0.1"
                            required
                            value={productOunces}
                            handleChange={(e) =>
                              setProductOunces(e.target.value)
                            }
                          />
                          <FormInput
                            className="field"
                            label="Quantity"
                            type="number"
                            min="0"
                            max="5000"
                            placeholder="100"
                            step="1"
                            required
                            value={productQuantity}
                            handleChange={(e) =>
                              setProductQuantity(e.target.value)
                            }
                          />
                        </div>
                        <CKEditor
                          onChange={(evt) =>
                            setProductDesc(evt.editor.getData())
                          }
                        />

                        <br />

                        <Button type="submit">Add New Product</Button>
                      </form>
                    </div>
                  </Modal>
                </h2>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  {itemToEdit ? (
                    // itemToEdit.map((item,pos) => {
                    //   const {productName, productThumbnail, productPrice, productHeight, productLength, productWidth, productQuantity, productOunces, productCategory} = item
                    //   return (

                    <div
                    // key={pos}
                    >
                      <div
                        className="modalOverlay"
                        onClick={() => editListingFunction()}
                      />
                      <div className="EditItemModal">
                        <AiOutlineCloseCircle
                          className="ExitButton"
                          onClick={() => editListingFunction()}
                        />

                        <div className="addNewProductForm">
                          <form onSubmit={handleEditFormSubmit}>
                            <h2>Type/Paste in your New Edits and Submit</h2>

                            <FormSelect
                              className="field"
                              label="Category"
                              // value={productCategory}
                              // required
                              options={[
                                {
                                  name: "",
                                  value: "",
                                },
                                {
                                  name: "Clothing, Shoes, Jewelry & Watches",
                                  value: "Clothing, Shoes, Jewelry & Watches",
                                },
                                {
                                  name: "Electronics",
                                  value: "Electronics",
                                },
                                {
                                  name: "Computers",
                                  value: "Computers",
                                },
                                {
                                  name: "Smart home",
                                  value: "Smart Home",
                                },
                                {
                                  name: "Home, Garden & Tools",
                                  value: "Home, Garden & Tools",
                                },
                                {
                                  name: "Beauty & Health",
                                  value: "Beauty & Health",
                                },
                                {
                                  name: "Accessories",
                                  value: "Accessories",
                                },
                                // { //   name: "Handmade", //   value: "Handmade", // }, // { //   name: "Sports", //   value: "Sports", // }, // { //   name: "Outdoors", //   value: "Outdoors", // }, // { //   name: "Automotive & Industrial", //   value: "Automotive & Industrial", // },
                              ]}
                              handleChange={(e) =>
                                setProductCategory(e.target.value)
                              }
                            />
                            {/* <div className="2ndRowOfAddProductForm"></div> */}
                            {productCategory ==
                            "Clothing, Shoes, Jewelry & Watches" ? (
                              <FormSelect {...chooseVariation} />
                            ) : (
                              <></>
                            )}
                            {subClothingCategory == "Size" ||
                            sizeArray.length > 0 ? (
                              <div className="ColorRow">
                                <input
                                  type="checkbox"
                                  value="Extra Small"
                                  name="checkbox"
                                  onClick={(e) =>
                                    sizeUpdateListing(e.target.value)
                                  }
                                />{" "}
                                XS
                                <input
                                  type="checkbox"
                                  value="Small"
                                  name="checkbox"
                                  onClick={(e) =>
                                    sizeUpdateListing(e.target.value)
                                  }
                                />{" "}
                                S
                                <input
                                  type="checkbox"
                                  value="Medium"
                                  name="checkbox"
                                  onClick={(e) =>
                                    sizeUpdateListing(e.target.value)
                                  }
                                />{" "}
                                M
                                <input
                                  type="checkbox"
                                  value="Large"
                                  name="checkbox"
                                  onClick={(e) =>
                                    sizeUpdateListing(e.target.value)
                                  }
                                />{" "}
                                L
                                <input
                                  type="checkbox"
                                  value="Extra Large"
                                  name="checkbox"
                                  onClick={(e) =>
                                    sizeUpdateListing(e.target.value)
                                  }
                                />{" "}
                                XL
                                <input
                                  type="checkbox"
                                  value="8"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                8
                                <input
                                  type="checkbox"
                                  value="8.5"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                8.5
                                <input
                                  type="checkbox"
                                  value="9"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                9
                                <input
                                  type="checkbox"
                                  value="9.5"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                9.5
                                <input
                                  type="checkbox"
                                  value="10"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                10
                                <input
                                  type="checkbox"
                                  value="10.5"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                10.5
                                <input
                                  type="checkbox"
                                  value="11"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                11
                                <input
                                  type="checkbox"
                                  value="11.5"
                                  name="checkbox"
                                  onClick={(e) => sizeUpdateListing(e.target.value)}
                                />{" "}
                                11.5
                              </div>
                            ) : (
                              <></>
                            )}

                            {subClothingCategory == "Color" ||
                            colorArray.length > 0 ? (
                              <div className="ColorRow">
                                <input
                                  type="checkbox"
                                  value="White"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                White
                                <input
                                  type="checkbox"
                                  value="Black"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Black
                                <input
                                  type="checkbox"
                                  value="Grey"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Grey
                                <input
                                  type="checkbox"
                                  value="Red"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Red
                                <input
                                  type="checkbox"
                                  value="Blue"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Blue
                                <input
                                  type="checkbox"
                                  value="Green"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Green
                                <input
                                  type="checkbox"
                                  value="Yellow"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Yellow
                                <input
                                  type="checkbox"
                                  value="Light Blue"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Light Blue
                                <input
                                  type="checkbox"
                                  value="Violet"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Violet
                                <input
                                  type="checkbox"
                                  value="Pink"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Pink
                                <input
                                  type="checkbox"
                                  value="Watermelon"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Watermelon
                                <input
                                  type="checkbox"
                                  value="Gold"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Gold
                                <input
                                  type="checkbox"
                                  value="Silver"
                                  name="checkbox"
                                  onClick={(e) =>
                                    colorUpdateListing(e.target.value)
                                  }
                                />{" "}
                                Silver
                              </div>
                            ) : (
                              // <FormSelect {...chooseColor} />
                              <></>
                            )}

                            <FormInput
                              className="field"
                              label="Product Name"
                              type="text"
                              // value={productName}
                              // required
                              handleChange={(e) =>
                                setProductName(e.target.value)
                              }
                            />

                            <FormInput
                              className="field"
                              label="Change current product Image"
                              type="file"
                              // required
                              // value={productThumbnail}
                              multiple
                              onChange={productImgHandler}
                            />
                            {errors && <h6>{errors}</h6>}

                            <FormInput
                              className="field"
                              label="Price"
                              type="number"
                              min="0"
                              max="1000.00"
                              placeholder="ex: 55.99"
                              step="0.01"
                              // required
                              // value={productPrice}
                              handleChange={(e) =>
                                setProductPrice(e.target.value)
                              }
                            />
                            <div className="Dimensiondiv">
                              <FormInput
                                className="field"
                                label="Length (in)"
                                type="number"
                                min="0"
                                max="200"
                                placeholder="3"
                                step="0.1"
                                // required
                                // value={productLength}
                                handleChange={(e) =>
                                  setProductLength(e.target.value)
                                }
                              />
                            </div>
                            <div className="Dimensiondiv">
                              <FormInput
                                className="field"
                                label="Width (in)"
                                type="number"
                                min="0"
                                max="200"
                                placeholder="3"
                                step="0.1"
                                // required
                                // value={productWidth}
                                handleChange={(e) =>
                                  setProductWidth(e.target.value)
                                }
                              />
                            </div>
                            <div className="Dimensiondiv">
                              <FormInput
                                className="field"
                                label="Height (in)"
                                type="number"
                                min="0"
                                max="200"
                                placeholder="3"
                                step="0.1"
                                // required
                                // value={productHeight}
                                handleChange={(e) =>
                                  setProductHeight(e.target.value)
                                }
                              />
                            </div>
                            <div className="Dimensiondiv2">
                              <FormInput
                                className="field"
                                label="Weight (oz)"
                                type="number"
                                min="0"
                                max="500"
                                placeholder="3.5"
                                step="0.1"
                                // required
                                // value={productOunces}
                                handleChange={(e) =>
                                  setProductOunces(e.target.value)
                                }
                              />
                              <FormInput
                                className="field"
                                label="Quantity"
                                type="number"
                                min="0"
                                max="5000"
                                placeholder="100"
                                step="1"
                                // required
                                // value={productQuantity}
                                handleChange={(e) =>
                                  setProductQuantity(e.target.value)
                                }
                              />
                            </div>
                            <CKEditor
                              // value={productDesc}
                              onChange={(evt) =>
                                setProductDesc(evt.editor.getData())
                              }
                            />

                            <br />

                            <Button type="submit">
                              Save Changes to Listing
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    //   )
                    //  })
                    <></>
                  )}

                  <tbody>
                    {seller.map((item, index) => {
                      const {
                        productName,
                        productThumbnail, // POSSIBLY USED FOR SEARCH FUNCTION
                        productPrice,
                        // productRemaining,  // CAN ADD OTHER FIELDS TO DASHBOARD
                        documentID,
                        productQuantity,
                      } = item;

                      return (
                        <tr key={index}>
                          <td>
                            <img
                              className="thumb"
                              src={productThumbnail}
                              alt="thumb"
                            />
                          </td>
                          <td
                            className="ClickableField"
                            onClick={() =>
                              history.push(`/product/${documentID}`)
                            }
                          >
                            {productName}
                          </td>
                          <td className="MarginPrice">${productPrice}</td>
                          <td>Quantity {productQuantity}</td>
                          <td>
                            {/* <Button
                                onClick={() =>
                                  dispatch(
                                    // SHOULD BE EDIT BUTTON, BRING UP FORM, AND DISPATCH UPDATE
                                    deleteProductStart(documentID)
                                  )
                                }
                              >
                                Delete
                              </Button> */}
                          </td>
                          <td>
                            {/* In the future, use ShowCommentBox instead */}
                            <div>
                              {/* <div className="ClickAnywhereResetStates" onClick={() => resetAllMenuStates()} /> */}

                              <div
                                className={
                                  showPreOptionsBox == documentID
                                    ? "singleDropdownShow"
                                    : "ActualHolderoftheDropdown-content"
                                }
                              >
                                {/* // style={{display: showPreOptionsBox ? 'block' : 'none' }}> */}
                                {preproductVideo.length !== 0 ? (
                                  <div className="GridOfFieldAndSubmitButton">
                                    <div
                                      className="Justwhatever"
                                      onClick={showVideoUploadButton}
                                    >
                                      Cancel
                                    </div>
                                    <div
                                      className="UploadButton"
                                      onClick={(e) =>
                                        handleVideoReviewSubmit(e)
                                      }
                                    >
                                      Submit
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => showVideoUploadButton(item)}
                                  >
                                    Upload Video to Feed
                                  </div>
                                )}

                                {showOptionsBox ? (
                                  <div>
                                    <input
                                      className="custom-file-upload"
                                      id="file-upload"
                                      type="file"
                                      onChange={productVideoReviewHandler}
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div onClick={deleteListingFunction}>
                                  View/Edit Videos
                                </div>
                                <div onClick={() => editListingFunction(item)}>
                                  Edit Listing
                                </div>
                                <div onClick={deleteListingFunction}>
                                  Delete Listing
                                </div>
                              </div>
                              <div
                                class="ActualHolderoftheDropdown"
                                onClick={() =>
                                  buttonToSubmitVideoUpload(documentID)
                                }
                              >
                                Options
                                {/* ):(
                                  <></>
                                )} */}
                              </div>
                            </div>
                            {/* <form onSubmit={handleVideoReviewSubmit}>
                            <div className="FullSize">
                              <div>
                            <div className="aUpload">Upload a Video to Reviews Feed</div>
                              <label
                                for="file-upload"
                                className="custom-file-upload"
                              //   {`custom-file-upload ${
                              //     preproductVideo !== []
                              //         ? "custom-file-upload-loaded"
                              //         : ""
                              // }`}
                              >
                              </label>

                              <input className="custom-file-upload" id="file-upload" type="file"
                              onChange={productVideoReviewHandler}
                              />
                              </div>

                            <Button   className="UploadButton"
                              type="submit">
                            <RiVideoUploadLine
                              className="IconVideoReviewButton"
                              // onClick={handleVideoReviewSubmit(item)}
                              >

                            </RiVideoUploadLine>
                            </Button>
                            </div>
                            </form> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      {/* <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td> */}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
