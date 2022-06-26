import { createStore } from "redux";

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "clearCart":
      return {};
    case "updateCart":
      // return {};
      if (action.restaurant in state) {
        const foodName = action.value.Name;
        // console.log({
        //   ...state,
        //   [action.restaurant]: [
        //     ...state[action.restaurant].filter((obj) => foodName !== obj.Name),
        //     action.value,
        //   ],
        // });
        return {
          ...state,
          [action.restaurant]: [
            ...state[action.restaurant].filter((obj) => foodName !== obj.Name),
            action.value,
          ],
        };
      } else {
        // console.log({ ...state, [action.restaurant]: [action.value] });
        return { ...state, [action.restaurant]: [action.value] };
      }
    default:
      return state;
  }
};

const store = createStore(rootReducer);
export default store;
