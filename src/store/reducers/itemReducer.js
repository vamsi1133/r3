import { ADD_ITEM, ADD_ON } from "../util";

const initalState = {
  item: 0,
  addons: [],
};

const itemReducer = (state = initalState, action) => {
  const data = action.payload;
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, item: data.item };
    case ADD_ON:
      return { ...state, addons: data.addon };
    default:
      return { ...state };
  }
};

export default itemReducer;
