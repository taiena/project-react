const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

let initialState = {
  dialogs: [
    { id: 1, name: "Lena" },
    { id: 2, name: "Vova" },
  ] as Array<DialogType>,

  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hello" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const messagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody; // take text from textarea
      return {
        ...state,
        // add a new message to a copy of the messages array
        messages: [...state.messages, { id: 6, message: body }],
      };

    default:
      return state;
  }
};

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageCreator = (
  newMessageBody: string
): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default messagesReducer;
