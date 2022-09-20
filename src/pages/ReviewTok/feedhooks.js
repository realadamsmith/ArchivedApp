import { useEffect, useCallback, useRef } from "react";
import { firestore } from "./../../Firebase/utils";

export const useFetch =  (data, dispatch) => {
  // console.log("useFetch")

  const last = useRef(null);
  useEffect( async() => {
    // console.log("useEffect")

        dispatch({ type: "FETCHING_VIDEOS", fetching: true });
        if (last.current == null) {
          const first = firestore
          .collectionGroup("productMainESGFeedReviews")
          .orderBy("feedstamp")
          .limit(1);
            const snapshot = await first.get();
            last.current = snapshot.docs[snapshot.docs.length - 1]; // last doc
            const videos = [
                ...snapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        documentID: doc.id, // Getting documentID is to pass
                    };
                }),
            ];
        // theBlockedList.map((user) => user.documentID === videos.documentID) {
        // return finalFilteredVideos
        // }

            try { // Stack/Concat
                dispatch({ type: "concatNextVideos", videos });
                dispatch({ type: "FETCHING_VIDEOS", fetching: false });
            } catch (e) {
                dispatch({ type: "FETCHING_VIDEOS", fetching: false });
                return e;
            }
        } else {
            const next = firestore
                .collectionGroup("productMainESGFeedReviews")
                .orderBy(
                    "feedstamp"
                    // "likes"
                )
                .startAfter(last.current)
                .limit(4);
            const snapshot = await next.get();
            last.current = snapshot.docs[snapshot.docs.length - 1];

            const videos = [
                ...snapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        documentID: doc.id, // Getting documentID is to pass
                    };
                }),
            ];

            try {
                dispatch({ type: "concatNextVideos", videos });
                dispatch({ type: "FETCHING_VIDEOS", fetching: false });
            } catch (e) {
                dispatch({ type: "FETCHING_VIDEOS", fetching: false });
                return e;
            }
        }
        //     }
    }, [dispatch, data.page]);
};

export const usegetBlockedUsers = async (currentUser, dispatch ) => {
    const query = firestore.collection("users").doc(currentUser.id)
    .collection("blockedUsers")

    const snapshot = await query.get()
    const theBlockedList = [
        ...snapshot.docs.map((doc) => {
            return{
                ...doc.data(),
                documentID: doc.id,
            }
        })
    ]
    dispatch({ type: "getBlockedList", theBlockedList });
    // setgetBlockedUsersHook(theBlockedList)
}

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {

    const scrollObserverFunction = useCallback(
        (node) => {
            new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    if (en.intersectionRatio > 0) {
                        dispatch({ type: "ADVANCE_PAGE" });
                    }
                });
            }).observe(node);
            // console.log("useInfiniteScroll")

        },[dispatch]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollObserverFunction(scrollRef.current);
        }
    }, [scrollObserverFunction, scrollRef]);
};

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector, items) => {
  // console.log("uselazyloading")

    const imgObserver = useCallback((node) => {
      // console.log("lazyLoading2")

        const intObs = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.intersectionRatio > 0) {
                    const currentImg = en.target;
                    const newImgSrc = currentImg.dataset.src;

                    // only swap out the image source if the new url exists
                    if (!newImgSrc) {
                        console.error("Image source is invalid");
                    } else {
                        currentImg.src = newImgSrc;
                    }
                    intObs.unobserve(node);
                }
            });
        });
        intObs.observe(node);
    }, []);

    const imagesRef = useRef(null);

    useEffect(() => {
        imagesRef.current = document.querySelectorAll(imgSelector);

        if (imagesRef.current) {
            imagesRef.current.forEach((img) => imgObserver(img));
        }
    }, [imgObserver, imagesRef, imgSelector, items]);
};

