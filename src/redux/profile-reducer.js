import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
  posts: [
    { id: '1', message: 'Hi,how are you?', likesCount: 15 },
    { id: '2', message: "It's my first post", likesCount: 20 },
    { id: '2', message: 'blabla', likesCount: 78 },
    { id: '2', message: 'blabla', likesCount: 90 },
  ],

  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };

    case SET_USERS_PROFILE:
      return { ...state, profile: action.profile };

    case SET_STATUS:
      return { ...state, status: action.status };

    default:
      return state;
  }
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const addPostActionCreator = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

export const setUsersProfile = (profile) => {
  return { type: SET_USERS_PROFILE, profile: profile };
};

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUsersProfile(response));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
