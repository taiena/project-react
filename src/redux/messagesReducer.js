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
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    // добавление нового сообщения
    case SEND_MESSAGE:
      let body = action.newMessageBody; // достаем текст из textarea
      return {
        ...state, // возвращаем поверхностную копию стейта
        // возвращаем копию массива messages и добавляем в конце новый элемент
        messages: [...state.messages, { id: 6, message: body }],
      };

    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default messagesReducer;
