

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

console.log("Re-rendered");

//  https://www.npmjs.com/package/hammerjs
// CANVASSING
// https://peterxjang.com/blog/a-functional-canvas-approach-with-redux-part-2.html
// https://jsfiddle.net/peterxjang/yvypt2w6
// https://jsfiddle.net/peterxjang/woufx97b
// https://codepen.io/chengarda/pen/wRxoyB

const feedReducer = (state, action) => {

  switch (action.type) {
    case "concatNextVideos":
      return {
        ...state,
         //  we need to get the data from the FIREStore, to compare to the videos' UserID
        allHelpfulVideos: state.allHelpfulVideos.concat(action.videos),
        // state.allHelpfulVideos.map((todo, index) =>
        // action.index === index
        //   ? { text: todo.text, completed: !todo.completed }
        //   : todo
        // videosUserHasLiked: state.allHelpfulVideos.map(video =>)
      };
    case "userLikeStateChange":
      return {
        ...state,
        videosUserHasLiked: state.videosUserHasLiked.concat(action.videoID),
      };
    case "userCommentLikeStateIncrement":
      // console.log(typeof action.commentArray, "CommentLikeIncrement"); //just sending the string
      return {
        ...state,
        commentsUserHasLiked: state.commentsUserHasLiked.concat(
          action.commentArray
        ),
      };
    case "userLikeStateDecrement":
      return {
        ...state,
        videosUserHasLiked: state.videosUserHasLiked.filter(
          ({ documentID }) => documentID !== action.videoID
        ),
      };
    case "userCommentLikeStateDecrement":
      // console.log(typeof action.commentArray, "CommentLikeDecrement"); //just sending the string
      return {
        ...state,
        commentsUserHasLiked: state.commentsUserHasLiked.filter(
          ({ documentID }) => documentID !== action.commentArray
        ),
      };
    // case "userCommentToReportAdd":
    //     return {
    //         ...state,
    //         commentToReport: state.commentToReport.concat(
    //            action.commentIDToReport
    //         ),
    //     };
    // case "userCommentToReportRemove":
    //     return {
    //         ...state,
    //         commentToReport: state.commentToReport.filter(
    //             ({ documentID }) => documentID !== action.commentIDToReport
    //         ),
    //     };
    case "FETCHING_VIDEOS":
      return { ...state, fetching: action.fetching };
    case feedTypes.CLEAR_DATA:
      return state;
    default:
      return state;
  }
};

// const blockReducer = (state, action) => {
//     switch (action.type) {
//         case "getBlockedList":
//             return {
//                 ...state,
//                 getBlockedUsersHook: state.getBlockedUsersHook.concat(
//                     action.theBlockedList
//                 )
//             };
//         default:
//             return state;
//     }
// };
const pageReducer = (state, action) => {
  switch (action.type) {
    case "ADVANCE_PAGE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};
const ReviewTok = () => {
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [present, dismiss] = useIonToast();

  const [userComment, setUserComment] = useState("");
  const [feedOfUsersComments, setfeedOfUsersComments] = useState([]);
  const [vidIdForCommentsFunc, setvidIdForCommentsFunc] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [optionsBox, setoptionsBox] = useState(false);
  const [showReplyCommentBar, setShowReplyCommentBar] = useState(false);
  const [userReply, setUserReply] = useState("");
  const longPressVideoRef = useRef(null);
  const [longPressBox, setlongPressBox] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [blockModal, setblockModal] = useState(false);
  const [reportedContentUser, setreportedContentUser] = useState("");
  const [reportedReason, setreportedReason] = useState("");
  const [getBlockedUsersHook, setgetBlockedUsersHook] = useState([]);
  const [posts, setPost] = useState([]);
  const [filteredComments, setfilteredComments] = useState([]);


  const [hideModal, setHideModal] = useState(true);
  const toggleModal = () => setHideModal(!hideModal);
  const configModal = {
    hideModal,
    toggleModal,
  };
  const resetForm = () => {
    setHideModal(true);
  };
  // useEffect(() => {  // Reference https://codesandbox.io/s/ionic-react-gesture-forked-3ysxt0?file=/src/App.js || https://codepen.io/Errinwright/pen/WNdObGJ?editors=1111
  // // let vidWrapperRef = document.querySelector('Topinteractions');
  // if(longPressVideoRef.current != null){
  //     console.log("Ref", longPressVideoRef.current)
  //   } else {
  //       console.log("No reference")
  //   }
  // const gesture = createGesture({
  //     el: longPressVideoRef,
  //     threshold: 0,
  //     onStart: (event) => {
  //         console.log("We got the gesture!!")
  //         if (longPressBox == true) {
  //             setlongPressBox(false);
  //         } else {
  //             setlongPressBox(true);
  //         }
  //      },
  // });
  // gesture.enable(true);

  // }, [])
  const blockFunc = async () => {
    if (currentUser) {
      await firestore
        .collection("users")
        .doc(currentUser.id)
        .collection("blockedUsers")
        .get()
        .then((snapshot) => {
          // const snapshot =  query.get()
          // console.log(snapshot)
          const theBlockedList = [
            ...snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                documentID: doc.id,
              };
            }),
          ];
          // const allVideoData = vidData.allHelpfulVideos.map(video => (video.userID))
          const finalFilteredPosts = vidData.allHelpfulVideos.filter(
            (videos) =>
              !theBlockedList.some(
                (blockedItem) => blockedItem.documentID === videos.userID
              )
          );
          // vidData.allHelpfulVideos.filter(video => video.userID !== theBlockedList.documentID);
          setPost(finalFilteredPosts);
        });
    } else {
      setPost(vidData.allHelpfulVideos);
    }
  };
  const commentsFilter = async () => {
    if (currentUser) {
      await firestore
        .collection("users")
        .doc(currentUser.id)
        .collection("blockedUsers")
        .get()
        .then((snapshot) => {
          // const snapshot =  query.get()
          // console.log(snapshot)
          const theBlockedList = [
            ...snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                documentID: doc.id,
              };
            }),
          ];
          // const allVideoData = vidData.allHelpfulVideos.map(video => (video.userID))
          const finalFilteredPosts = feedOfUsersComments.filter(
            (comments) =>
              !theBlockedList.some(
                (blockedItem) => blockedItem.documentID === comments.userID
              )
          );
          // vidData.allHelpfulVideos.filter(video => video.userID !== theBlockedList.documentID);
          // console.log(finalFilteredPosts, "Final Data")
          setfilteredComments(finalFilteredPosts);
        });
    } else {
      setfilteredComments(feedOfUsersComments);
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
  // const [theBlockedList, blockedListDispatch] = useReducer(blockReducer, {
  //     getBlockedUsersHook: [],
  // });
  const [vidData, shareVidDispatch] = useReducer(feedReducer, {
    allHelpfulVideos: [],
    comments: [],
    fetching: true,
    commentsUserHasLiked: [],
    videosUserHasLiked: [],
    commentToReport: [],
    // currentUser: currentUser.id
  });
  const transformData = useMemo(() => {
    return blockFunc(vidData.allHelpfulVideos);
    // return mapThisDataFeed
  }, [vidData.allHelpfulVideos]);
  const transformComments = useMemo(() => {
    return commentsFilter(feedOfUsersComments);
    // return mapThisDataFeed
  }, [feedOfUsersComments]);

  // useEffect(async () => {
  //     // return new Promise((resolve, reject) => {
  //     // resolve(transformData)
  //     // })
  //     // setPost(transformData);
  //     // console.log(transformData)
  // }, [transformData])

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, shareVidDispatch);
  // console.log("useFetch")
  useLazyLoading(".video_player", vidData.allHelpfulVideos);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);
  // usegetBlockedUsers(theBlockedList, blockedListDispatch);
  // console.log(vidData.allHelpfulVideos );

  const likesFunction = (video) => {
    if (currentUser == undefined) {
      return null;
    } else {
      const timestamp = new Date();
      const docRef = firestore.doc(
        `products/${video.productID}/productMainESGFeedReviews/${video.documentID}`
      );
      docRef.update({ likes: increment });
      // console.log(docRef)
      // firestore
      //     .collectionGroup("productMainESGFeedReviews")
      //     .where(video.documentID, "==", "documentID")
      //     .update({ likes: increment });
      const docRef2 = firestore.doc(
        `products/${video.productID}/productMainESGFeedReviews/${video.documentID}/wasValuable/${currentUser.id}`
      );
      docRef2.set({
        createdDate: timestamp,
        likedVideoId: video.documentID,
      });
      const docRef3 = firestore.collection("users").doc(currentUser.id);
      docRef3.update({ VideosVotedUp: increment });

      const { documentID } = video;
      const videoID = [{ documentID }];
      shareVidDispatch({ type: "userLikeStateChange", videoID });
      // dispatch();
    }
  };

  const likeComment = async (documentID) => {
    if (currentUser == undefined) {
      return null;
    } else {
      const timestamp = new Date();
      // console.log(video.documentID); // R4
      const commentArray = [{ documentID }];
      firestore
        .collection("products")
        .doc(vidIdForCommentsFunc.productID)
        .collection("productMainESGFeedReviews")
        .doc(vidIdForCommentsFunc.documentID)
        .collection("wasCommented")
        .doc(documentID)
        .update({ likes: increment });
      // const { documentID } = video;
      // console.log(documentID);
      // const videoID = [{ documentID }];
      // shareVidDispatch({ type: "userCommentLikeStateIncrement", videoID });
      shareVidDispatch({
        type: "userCommentLikeStateIncrement",
        commentArray,
      });
    }
  };

  const dislikeFunction = (video) => {
    const docRef = firestore.doc(
      `products/${video.productID}/productMainESGFeedReviews/${video.documentID}`
    );
    docRef.update({ likes: decrement });
    const docRef2 = firestore.doc(
      `products/${video.productID}/productMainESGFeedReviews/${video.documentID}/wasValuable/${currentUser.id}`
    );
    docRef2.delete();
    const { documentID } = video;
    const videoID = documentID;

    shareVidDispatch({ type: "userLikeStateDecrement", videoID });
  };

  const dislikeComment = (documentID) => {
    const commentArray = documentID;
    // const docRef = firestore.doc(`products/${video.productID}/productMainESGFeedReviews/${documentID}`);
    // docRef.update({ likes: decrement });

    firestore
      .collection("products")
      .doc(vidIdForCommentsFunc.productID)
      .collection("productMainESGFeedReviews")
      .doc(vidIdForCommentsFunc.documentID)
      .collection("wasCommented")
      .doc(documentID)
      .update({ likes: decrement });
    // // const { documentID } = video;
    // // const videoID = documentID;
    // // console.log(videoID);
    shareVidDispatch({
      type: "userCommentLikeStateDecrement",
      commentArray,
    });
  };

  const commentsFunction = async (video) => {
    setvidIdForCommentsFunc(video);

    if (showCommentBox == true) {
      setShowCommentBox(false);
      setShowReplyCommentBar(false);
      // Maybe Reset State for setvidIdForCommentsFunc
    } else {
      setShowCommentBox(true);
      setShowReplyCommentBar(false);
      // const docRef = firestore.doc(`products/${video.productID}/productMainESGFeedReviews/${video.documentID}/wasCommented/${currentUser.id}`);
      const docRef = firestore
        .collection("products")
        .doc(video.productID)
        .collection("productMainESGFeedReviews")
        .doc(video.documentID)
        .collection("wasCommented");
      docRef
        .orderBy("feedstamp")
        .limit(15)
        .get()
        .then((snapshot) => {
          const data = [
            ...snapshot.docs.reverse().map((doc) => {
              return {
                ...doc.data(),
                documentID: doc.id,
              };
            }),
          ];
          setfeedOfUsersComments(data);
        });
    }
  };

  const createComment = (video) => {
    const { id, displayName } = currentUser; // ERR Cannot destructure prop 'id' of 'curr' as it is null
    const createdDate = new Date();
    const feedstamp = createdDate * -1;

    const createCommentRef = firestore
      .collection("products")
      .doc(vidIdForCommentsFunc.productID)
      .collection("productMainESGFeedReviews")
      .doc(vidIdForCommentsFunc.documentID)
      .collection("wasCommented")
      .doc();
    createCommentRef.set({
      comment: userComment,
      userID: id, // this should fix our naming conventions
      createdDate: createdDate,
      feedstamp: feedstamp,
      displayName: displayName,
      likes: 0,
      comments: 0,
    });
    firestore
      .collection("products")
      .doc(vidIdForCommentsFunc.productID)
      .collection("productMainESGFeedReviews")
      .doc(vidIdForCommentsFunc.documentID)
      .update({ comments: increment });
    //When we post a comment, update the comments state
    //Put on top
    setUserComment("");
    setShowCommentBox(false);
  };

  const optionsFunction = (video) => {
    if (optionsBox == true) {
      setoptionsBox(false);
    } else {
      setoptionsBox(true);
    }
  };

  const reportSubmit = () => {
    const timestamp = new Date();

    firestore.collection("reports").doc().set({
      submitterId: currentUser.id,
      reportedId: reportedContentUser,
      reason: reportedReason,
      createdDate: timestamp,
    });
    present("Thank you for helping improve our platform", 2000);
    setReportModal(false);
    setoptionsBox(false);
    setblockModal(true);
  };

  //  -----------------         Reporting

  const replyComment = (singleComment) => {
    const { documentID, user } = singleComment;
    setreportedContentUser(singleComment);
    const commentIDToReport = [{ documentID }];
    if (showReplyCommentBar == true) {
      setShowReplyCommentBar(false);
      // shareVidDispatch({ type: "userCommentToReportRemove", commentIDToReport, });
    } else {
      setShowReplyCommentBar(true);
      // shareVidDispatch({ type: "userCommentToReportAdd", commentIDToReport, });
    }
  };
  const reportBoxOpen = (video) => {
    setreportedContentUser(video);
    if (reportModal == true) {
      setReportModal(false);
    } else {
      setReportModal(true);
    }
  };
  const commentReportBoxOpen = (video) => {
    // setreportedContentUser(video.documentID);
    if (reportModal == true) {
      setReportModal(false);
    } else {
      setReportModal(true);
    }
  };
  const reportUserBlock = async () => {
    const timestamp = new Date();
    firestore
      .collection("users")
      .doc(currentUser.id)
      .collection("blockedUsers")
      .doc(reportedContentUser.userID)
      .set({
        // blockedUser: reportedContentUser.userID, // Only comment reporting works. //should not work on comments now
        createdDate: timestamp,
      });
    setblockModal(false);
  };

  const downloadFile = (video) => {
    console.log(video.videoUrl)

    // const ref = storage().ref(`prodReviews/${video.videoUrl}`);
    // const ref = storage().refFromURL("gs://mallshop-5fa49.appspot.com/prodReviews/7Puo8TTXxaofzzKVeRRO");

    // const ref = storage().ref("prodReviews/7Puo8TTXxaofzzKVeRRO");
    // ref.getDownloadURL()
    // .then((url) => {
    // console.log(url)
    // const xhr = new XMLHttpRequest();
    //   xhr.responseType = 'blob';
    //   xhr.onload = (event) => {
    //   const blob = xhr.response;

    //   };
    //   xhr.open('GET', url);
    //   xhr.send();

    // }).catch(error => {
    //   alert(error, 4000);

    //   console.log(error)
    // })

    // const toBase64 = (blob) => new Promise((resolve,reject) => {
    //     const reader = new FileReader;
    //     reader.onerror = reject;
    //     reader.onload = () => {
    //         resolve(reader.result);
    //     }
    // })
    // console.log(video)
    //create videoRef
    // video.videoUrl
    // Create Blob
    //Some Package that allows native download storage.
    present("Feature not currently available", 4000);
    // present("Downloading video to Photos", 5000);
  };

  //  -----------------         Reporting

  const FeedTabSwitch = () => {
    present("Only Random Feed Currently Available", 2000);
    window.location.reload();
  };
  const ExploreTabSwitchDesktop = () => {
    window.location.reload();
  };

  // console.log(vidData.allHelpfulVideos)

  return (
    // <center>
    <div>
      <div className="MainExploreOtherBar">
        <div>
          <Link to="Home">Main</Link>
        </div>
        <div onClick={ExploreTabSwitchDesktop}>
          Explore
          <div className="ThinUnderline"></div>
        </div>
      </div>
      <div className="Feed">
        {longPressBox ? <div>LONG PRESS REPORTED</div> : <div></div>}
        <div>
          {reportModal ? (
            <IonModal
              isOpen={true}
              swipeToClose={true}
              className="reportModalWrapper"
            >
              <div className="reportModalPadding">
                <div className="optionsHeader">
                  <AiOutlineCloseCircle
                    className="ExitButtonTok"
                    onClick={reportBoxOpen}
                  />
                </div>
                <div className="reportModalFields">
                  <div>
                    <div className="reportModalTextHeader">Send a Report</div>
                    <div className="reportModalText">
                      We're contrite if this content has negatively affected you
                      or others in any way. The goal of Lagruni is to provide a
                      free space to review and empower products with high value
                      for customers and reduce fake reviews. Please choose a
                      reason for the flagging and click report to submit. Thank
                      you.
                    </div>
                  </div>
                  <div className="reportOptions">
                    <li
                      className="reportEachItem"
                      onClick={() => setreportedReason("Not Helpful")}
                    >
                      Not Helpful
                    </li>
                    <li
                      className="reportEachItem"
                      onClick={() => setreportedReason("Innapropriate acts")}
                    >
                      Innapropriate acts
                    </li>
                    <li
                      className="reportEachItem"
                      onClick={() =>
                        setreportedReason("Violent or Graphic Content")
                      }
                    >
                      Violent or Graphic Content
                    </li>
                    <li
                      className="reportEachItem"
                      onClick={() => setreportedReason("Minor Safety")}
                    >
                      Minor Safety
                    </li>
                    <li
                      className="reportEachItem"
                      onClick={() =>
                        setreportedReason("Intellectual Property Infringement")
                      }
                    >
                      Intellectual Property Infringement
                    </li>
                  </div>
                </div>
                <div>
                  <Button onClick={() => reportSubmit()}>Submit</Button>
                </div>
              </div>
            </IonModal>
          ) : (
            <></>
          )}
          {blockModal ? (
            <IonModal
              isOpen={true}
              swipeToClose={true}
              className="reportUserModalWrapper"
            >
              <div className="reportModalPadding">
                <div className="optionsHeader">
                  <AiOutlineCloseCircle
                    className="ExitButtonTok"
                    onClick={() => setblockModal(false)}
                  />
                </div>
                <div className="reportUserModalFields">
                  <div>
                    <div className="reportUserModalTextHeader">
                      Block this account?
                    </div>
                    <div className="reportModalText">
                      Your content report has been saved.
                    </div>
                    <div className="reportUserModalText">
                      You can unblock this account at any time by going to their
                      profile, or contacting support.
                    </div>
                  </div>
                </div>
                <div className="reportUserBlockButtonsPadding">
                  <Button onClick={() => reportUserBlock()}>Block</Button>
                </div>
                <div className="reportUserBlockButtonsPadding">
                  <Buttons2 onClick={() => setblockModal(false)}>No</Buttons2>
                </div>
              </div>
            </IonModal>
          ) : (
            <></>
          )}
        </div>
        <div className="BatchVids">
          <div className="Topinteractions" ref={longPressVideoRef}>
            <BsChevronLeft
              className="TopInterBackArrow"
              onClick={() => history.push("/Home")}
            >
              Left Arrow
            </BsChevronLeft>
            <div className="FeedHolder">
              <div onClick={FeedTabSwitch}>Reviews</div>
              <div onClick={FeedTabSwitch} className="Random">
                Random
              </div>
            </div>
            {/* <span> */}
            <SearchIcon className="ReviewSearchIcon"></SearchIcon>
            {/* </span> */}
          </div>
          {posts.map((video, pos) => {
            const {
              videoUrl,
              likes,
              comments,
              documentID,
              productName,
              productPrice,
              productThumbnail,
              productDesc,
            } = video;
            const configProduct = { ...video };

            return (
              <div className="VidandProductWrapper">
                <div className="EachVidWrapper">
                  <Video
                    key={pos}
                    data-src={videoUrl}
                    // likes={likes}
                    // comments={comments}
                    {...configProduct}
                    onStart
                  />
                  <div className="ReviewsTokVideosPage"></div>
                  {/* <Modal2 {...configModal}> */}
                  {showCommentBox ? (
                    <div className="WrapperCommentFloat">
                      <div className="CommentsHeader">
                        Comments
                        <AiOutlineCloseCircle
                          className="ExitButtonTok"
                          onClick={commentsFunction}
                        />
                      </div>
                      <div className="CommentBox">
                        {filteredComments.map((singleComment, pos) => {
                          const {
                            comment,
                            displayName,
                            likes,
                            comments,
                            documentID,
                          } = singleComment;
                          return (
                            <div className="commentPadding" key={pos}>
                              <div
                                className="userCommentBox1_2"
                                onClick={() => replyComment(singleComment)}
                              >
                                <div className="smallDisplayName">
                                  {displayName}
                                </div>
                                <div>{comment}</div>
                              </div>
                              <div
                                className="CenterCommentLikes"
                                // onClick={()=>likeComment({video, documentID})}
                              >
                                {vidData.commentsUserHasLiked.some(
                                  (likedComment) =>
                                    likedComment.documentID == documentID
                                ) ? (
                                  <div>
                                    <TiThumbsUp
                                      className="sizeOfThumbsUpFilled"
                                      onClick={() => dislikeComment(documentID)}
                                    ></TiThumbsUp>
                                    {likes + 1}
                                  </div>
                                ) : (
                                  <div>
                                    <TiThumbsUp
                                      className="sizeOfThumbsUp"
                                      onClick={() => likeComment(documentID)}
                                    ></TiThumbsUp>
                                    {likes}
                                  </div>
                                )}
                                {/* <TiThumbsUp className="sizeOfThumbsUp" ></TiThumbsUp>{likes} */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {showReplyCommentBar ? (
                        <div className="commentField">
                          <FormInput
                            className="CommentInput"
                            type="text"
                            placeholder="Reply to their Comment or Review"
                            value={userReply}
                            handleChange={(e) => setUserReply(e.target.value)}
                          ></FormInput>
                          <BsFlagFill
                            className="commmentTinyReport"
                            onClick={() => commentReportBoxOpen(video)}
                          ></BsFlagFill>
                          <BsFillArrowUpCircleFill
                            className="commentSubmitArrowButtonInsideBox"
                            onClick={() => createComment(video)}
                          ></BsFillArrowUpCircleFill>
                        </div>
                      ) : (
                        <div className="commentField">
                          <FormInput
                            className="CommentInput"
                            type="text"
                            placeholder="Add a Helpful Review or Comment"
                            value={userComment}
                            handleChange={(e) => setUserComment(e.target.value)}
                          ></FormInput>
                          <BsFillArrowUpCircleFill
                            className="commentSubmitArrowButtonInsideBox"
                            onClick={() => createComment(video)}
                          ></BsFillArrowUpCircleFill>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {optionsBox ? (
                    <div className="WrapperOptionsFloat">
                      <div className="optionsHeader">
                        <AiOutlineCloseCircle
                          className="ExitButtonTok"
                          onClick={optionsFunction}
                        />
                      </div>
                      <div className="optionsGrid1">
                        <div
                          onClick={() =>
                            history.push(`/product/${video.productID}`)
                          }
                        >
                          <div className="optionsGridButtons">
                            <RiShoppingBag3Fill className="optionIconsSize"></RiShoppingBag3Fill>
                          </div>
                          <div>See item</div>
                        </div>
                        <div onClick={() => reportBoxOpen(video)}>
                          <div className="optionsGridButtons">
                            <BsFlagFill className="optionIconsSize"></BsFlagFill>
                          </div>
                          <div>Report/Block</div>
                        </div>
                        <div onClick={() => downloadFile(video)}>

                          <div className="optionsGridButtons">
                            <RiDownloadCloud2Line className="optionIconsSize"></RiDownloadCloud2Line>
                          </div>
                          <div>Download</div>

                        </div>
                        {/* <div>
                                        <div className="optionsGridButtons"></div>
                                            <div>Future Button</div>
                                        </div>
                                        <div>
                                        <div className="optionsGridButtons"></div>
                                            <div>Future Button</div>
                                        </div> */}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {/* </Modal2> */}
                  <div className="interactions">
                    <div
                      className="TranslateYXDetailsButton"
                      onClick={() =>
                        history.push(`/product/${video.productID}`)
                      }
                    >
                      <div className="MobileVidProductThumbnail">
                        <img
                          className="ImageBorderRadius"
                          src={productThumbnail}
                        />
                      </div>
                      {/* <div className="DescPadding">
                                                <div className="MobileVidProductDesc">
                                                    {productDesc}
                                                    In the future add video.Desc for the POSTERS desc of product
                                                    </div>
                                                    </div> */}
                    </div>
                    <div className="InteractionsBottomBarWrapper">
                      <div className="InteractionsButtons">
                        {vidData.videosUserHasLiked.some(
                          (likedVideos) =>
                            likedVideos.documentID === video.documentID
                        ) ? (
                          <div>
                            <AiFillHeart
                              className="InteractionsIconsFilled"
                              onClick={() =>
                                dislikeFunction(video, currentUser.id)
                              }
                            ></AiFillHeart>
                            <p>{likes + 1} </p>
                          </div>
                        ) : (
                          <div>
                            <AiOutlineHeart
                              className="InteractionsIcons"
                              onClick={() =>
                                likesFunction(video, currentUser.id)
                              }
                            ></AiOutlineHeart>
                            <p>{likes} </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="InteractionsButtons"
                      // onClick={commentsOpen}
                    >
                      <RiChat3Line
                        className="InteractionsIcons"
                        onClick={() =>
                          commentsFunction(
                            video
                            // currentUser.id
                          )
                        }
                      ></RiChat3Line>
                      <p>{comments}</p>
                    </div>
                    <div className="InteractionsButtons">
                      <BsThreeDots
                        className="InteractionsIcons"
                        onClick={() =>
                          optionsFunction(
                            video
                            // currentUser.id
                          )
                        }
                      ></BsThreeDots>
                      <p>0 </p>
                    </div>
                  </div>
                </div>
                <div className="DesktopVidProduct">
                  <div className="VideoProductName">{productName}</div>
                  <div className="VideoProductPrice">${productPrice}</div>
                  {/* <div className="reviews">Guaranteed Best Price</div> */}

                  <div className="VideoProductImages">
                    <div className="VideoProductImageSizing">
                      <img src={productThumbnail} />
                    </div>
                  </div>
                  <div
                    className="TranslateYXDetailsButtonDesktop"
                    onClick={() => history.push(`/product/${video.productID}`)}
                  >
                    {/* <div className="alignself">
                                                    {ShippingTime}
                                                    2-3 Day Shipping
                                                </div> */}
                    <Button>Full Details</Button>
                  </div>
                </div>
              </div>
            );
          })}
          {vidData.fetching && (
            <div>
              <p className="m-0 text-white"></p>
            </div>
          )}
          <div
            id="page-bottom-boundary"
            className="BottomBoundary"
            ref={bottomBoundaryRef}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTok;
