import profileReducer, { addPostActionCreator } from './profile-reducer';
//import React from "react";

test('new post should be added', () => {
  let action = addPostActionCreator('it-kamasutra.com');
  let state = {
    posts: [
      { id: '1', message: 'Hi,how are you?', likesCount: 15 },
      { id: '2', message: "It's my first post", likesCount: 20 },
      { id: '2', message: 'blabla', likesCount: 78 },
      { id: '2', message: 'blabla', likesCount: 90 },
    ],
  };
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});
