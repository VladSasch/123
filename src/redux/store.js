import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sitebarReducer from "./sitebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: "1", message: "Hi,how are you?", likesCount: 15 },
        { id: "2", message: "It's my first post", likesCount: 20 },
        { id: "2", message: "blabla", likesCount: 78 },
        { id: "2", message: "blabla", likesCount: 90 },
      ],
      newPostText: "it-kamasutra.com",
    },
    dialogsPage: {
      messages: [
        { id: "1", message: "Hi" },
        { id: "2", message: "How is yuor It-kamasutra?" },
        { id: "3", message: "Yo" },
        { id: "4", message: "Yo" },
        { id: "5", message: "Yo" },
      ],
      dialogs: [
        {
          id: "1",
          name: "Dimych",
          img: (
            <img src="https://klike.net/1345-kartinki-na-avatarku-50-foto.html" />
          ),
        },
        { id: "2", name: "Sveta" },
        { id: "3", name: "Andrey" },
        { id: "4", name: "Sasha" },
        { id: "5", name: "Viktor" },
        { id: "6", name: "Valera" },
      ],
      newMessageBody: "",
    },
    sitebar: {},
  },

  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sitebar = sitebarReducer(this._state.sitebar, action);

    this._callSubscriber(this._state); //уведомление подписчиков,т.е. перерисовываем state
  },
};

export default store;
window.store = store;
