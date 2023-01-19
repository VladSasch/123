import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';

let initialState = {
  posts: [
    { id: '1', message: 'Hi,how are you?', likesCount: 15 },
    { id: '2', message: "It's my first post", likesCount: 20 },
    { id: '2', message: 'blabla', likesCount: 78 },
    { id: '2', message: 'blabla', likesCount: 90 },
  ],

  profile: null,
  profileStatus: false,
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
    case SET_PROFILE_STATUS:
      return { ...state, profileStatus: action.profileStatus };

    case SET_STATUS:
      return { ...state, status: action.status };
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } };

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

export const setProfileStatus = (x) => {
  return {
    type: SET_PROFILE_STATUS,
    profileStatus: x,
  };
};

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
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
  try {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const response = await profileAPI.saveProfile(profile);

  let userId = getState().auth.id;
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
    dispatch(setProfileStatus(false));
  } else {
    dispatch(
      stopSubmit(
        'edit-profile',
        { _error: response.data.messages[0] } //обработка общей ошибки для всей формы
        //{ contacts: { facebook: response.data.messages[0] } }   //обработка ошибки для поля "facebook"
      )
    );
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
