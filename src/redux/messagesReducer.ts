import { messagesAPI } from "../api/messagesApi";
import { InferActionsTypes, BaseThunkType } from "./redux-store";
import { Dispatch } from "redux";

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

let initialState = {
  dialogs: [] as Array<DialogType>,

  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hello" },
  ] as Array<MessageType>,
  isLoading: false as boolean,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

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
    case "MESSAGES_PAGE_IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case "SET_DIALOGS":
      return {
        ...state,
        dialogs: [...action.dialogs],
      };

    default:
      return state;
  }
};

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: "SEND_MESSAGE",
      newMessageBody,
    } as const),
  messagesPageIsLoading: (isLoading: boolean) =>
    ({
      type: "MESSAGES_PAGE_IS_LOADING",
      isLoading,
    } as const),
  setDialogs: (dialogs: Array<DialogType>) =>
    ({
      type: "SET_DIALOGS",
      dialogs,
    } as const),
};

export const getDialogs = (): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.messagesPageIsLoading(true));

    let data = await messagesAPI.getDialogs();

    dispatch(actions.messagesPageIsLoading(false));
    dispatch(actions.setDialogs(data));
  };
};

export default messagesReducer;
