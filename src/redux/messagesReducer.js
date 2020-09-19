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

  newMessageBody: "", // value from textarea
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    // добавление нового сообщения
    case SEND_MESSAGE:
      let body = state.newMessageBody; // достаем текст из textarea
      return {
        ...state, // возвращаем поверхностную копию стейта
        newMessageBody: "", // обнуляем textarea
        // возвращаем копию массива messages и добавляем в конце новый элемент
        messages: [...state.messages, { id: 6, message: body }],
      };

    // добавление в стейт нового впечатанного символа
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state, // возвращаем поверхностную копию стейта
        newMessageBody: action.body, // добавляем впечатанный символ из body (textarea)
      };

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
