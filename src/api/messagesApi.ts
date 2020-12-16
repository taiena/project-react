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

  // viewed messages
  viewedMessages(messageId: number) {
    return instance
      .get(`dialogs/messages/${messageId}/viewed`)
      .then((response) => response.data);
  },

  // add message to spam
  spamMessage(messageId: number) {
    return instance
      .post<APIResponseType>(`dialogs/messages/${messageId}/spam`)
      .then((response) => response.data);
  },

  // delete message
  deleteMessage(messageId: number) {
    return instance
      .delete(`dialogs/messages/${messageId}`)
      .then((response) => response.data);
  },

  // restore message from deleted and spam
  restoreMessage(messageId: number) {
    return instance
      .put<APIResponseType>(`dialogs/messages/${messageId}/restore`)
      .then((response) => response.data);
  },

  // return messages newest than date
  newMessages(userId: number, date: string) {
    return instance
      .get(`dialogs/${userId}/messages/new?newerThen=${date}`)
      .then((response) => response.data);
  },
};
