import { ADD_ITEM, ADD_ON } from "../util";

export const addItem = (data) => {
  return { type: ADD_ITEM, payload: { item: data } };
};

export const addAddon = (data) => {
  return { type: ADD_ON, payload: { addon: data } };
};
