const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
  dialogs: [
    { id: 1, name: "Lena" },
    { id: 2, name: "Vova" },
  ],

  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hello" },
  ],

  newMessageBody: "",
};

const messagesReducer = (state = initialState, action) => {
  // мы не имеем права менять стейт, поэтому делаем его копию для перерисовки
  let stateCopy = {
    ...state,
    // нам не надо делать копию массива messages,
    // т.к. уже скопировали state.messagesPage в messagesContainer,
    // messages: [...state.messages],
  };

  switch (action.type) {
    case SEND_MESSAGE:
      let body = stateCopy.newMessageBody;
      stateCopy.newMessageBody = "";
      stateCopy.messages.push({ id: 6, message: body });
      return stateCopy;

    case UPDATE_NEW_MESSAGE_BODY:
      stateCopy.newMessageBody = action.body;
      return stateCopy;

    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default messagesReducer;
