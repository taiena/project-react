import { InferActionsTypes } from "./redux-store";

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
type ActionsTypes = InferActionsTypes<typeof actions>;

const messagesReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SEND_MESSAGE":
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

export const actions = {
  sendMessageCreator: (newMessageBody: string) =>
    ({
      type: "SEND_MESSAGE",
      newMessageBody,
    } as const),
};

export default messagesReducer;
