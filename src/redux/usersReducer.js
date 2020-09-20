const A = "A";
const B = "B";

let initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    //
    case A: {
      return {
        ...state, // возвращаем поверхностную копию стейта
      };
    }

    //
    case B: {
      return {
        ...state, // возвращаем поверхностную копию стейта
      };
    }
    default:
      return state;
  }
};

export const aActionCreator = () => ({ type: A });
export const bActionCreator = () => ({ type: B });

export default usersReducer;
