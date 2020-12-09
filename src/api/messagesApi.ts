import { instance } from "./api";
// import { APIResponseType } from "./api";

export const messagesAPI = {
  getDialogs() {
    return instance.get(`dialogs/`).then((response) => response.data);
  },
};
