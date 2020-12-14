import { instance } from "./api";
import { APIResponseType } from "./api";

export const messagesAPI = {
  //get all dialogs
  getDialogs() {
    return instance.get(`dialogs/`).then((response) => response.data);
  },

  // start chatting with user
  startChatting(userId: number) {
    return instance
      .put<APIResponseType>(`dialogs/${userId}`)
      .then((response) => response.data);
  },

  // get message list with user
  // getMessages(userId: number, page: number, count: number) {
  getMessages(userId: number) {
    return instance
      .get(`dialogs/${userId}/messages`)
      .then((response) => response.data);
  },

  // send message to user
  sendMessage(userId: number, body: string) {
    return instance
      .post<APIResponseType>(`dialogs/${userId}/messages`, {
        body,
      })
      .then((response) => response.data);
  },
};
