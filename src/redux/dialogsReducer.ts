import { messagesAPI } from "../api/messagesApi";
import { InferActionsTypes, BaseThunkType } from "./redux-store";

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

  messages: [] as Array<MessageType>,
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

    case "SET_MESSAGES":
      return {
        ...state,
        messages: [...action.messages],
      };

    default:
      return state;
  }
};

export const actions = {
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

  setMessages: (messages: Array<MessageType>) =>
    ({
      type: "SET_MESSAGES",
      messages,
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

export const getMessages = (
  userId: number
  // page: number,
  // count: number
): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.messagesPageIsLoading(true));

    // let data = await messagesAPI.getMessages(userId, page, count);
    let data = await messagesAPI.getMessages(userId);

    dispatch(actions.messagesPageIsLoading(false));
    dispatch(actions.setMessages(data.items));
  };
};

export const sendMessage = (userId: number, body: string): ThunkType => {
  return async (dispatch) => {
    let data = await messagesAPI.sendMessage(userId, body);

    if (data.resultCode === 0) {
      dispatch(getMessages(userId));
    }
  };
};

export const startChatting = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await messagesAPI.startChatting(userId);

    if (data.resultCode === 0) {
      dispatch(getMessages(userId));
    }
  };
};

// export const viewedMessages = (messageId: number): ThunkType => {
//   return async (dispatch) => {
//     let data = await messagesAPI.viewedMessages(messageId);

//     dispatch(getMessages(messageId));
//   };
// };

export const deleteMessage = (messageId: number): ThunkType => {
  return async (dispatch) => {
    let data = await messagesAPI.deleteMessage(messageId);

    // if (data.resultCode === 0) {
    //   dispatch(getMessages(userId));
    // }
  };
};

export default messagesReducer;
