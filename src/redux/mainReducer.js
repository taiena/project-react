const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 3 },
    { id: 2, message: "It is so cool!", likesCount: 12 },
    { id: 3, message: "It is my first post", likesCount: 5 },
  ],
  newPostText: "Enter your post here", // value from textarea
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    // добавление нового поста на стену
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state, // возвращаем поверхностную копию стейта
        // возвращаем копию массива posts и добавляем в конце новый элемент
        posts: [...state.posts, newPost],
        newPostText: "", // обнуляем textarea
      };
    }

    // добавление в стейт нового впечатанного символа
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state, // возвращаем поверхностную копию стейта
        newPostText: action.newText, // добавляем впечатанный символ из textarea
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export default mainReducer;
