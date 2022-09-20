import feedTypes from './feed.types';


// const initialStates = {
//     user: [],
//     JusttheOneVideo: []
// };

// export interface Post {
//     index: number;
//     content: any;
//     liked: boolean;
//   }

//   likePost(indexOfPost: number){
//     // in redux in this point youll have access to the state and payload
//     const { posts } = state;
//     posts[indexOfPost].liked = true;
//     state.posts = posts;
//   }

// export const users = (state = initialStates, action) => {

//     switch (action.type) {
//         case USERS_POSTS_STATE_CHANGE:
//             return {
//                 ...state,
//                 usersFollowingLoaded: state.usersFollowingLoaded + 1,
//                 feed: [...state.feed, ...action.posts]
//             }
//         case feedTypes.USERS_LIKES_STATE_CHANGE:
//             return {
//                 ...state,
//                 JusttheOneVideo: state.JusttheOneVideo.map(post => post.id == action.postId ?
//                     { ...post, currentUserLike: action.currentUserLike } :
//                     post)
//             }
//         case CLEAR_DATA:
//             return initialStates
//         default:
//             return state;

//     }


// }