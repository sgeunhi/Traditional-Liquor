import {selector} from "recoil";
import * as React from "react";
import getAllAlcohols from "../Api/getAllAlcohols";

export const alcoholListState = selector({
  key: 'alcoholListState',
  get: async () => {
    const response = await getAllAlcohols();
    console.log(response);
    return response;
  },
});
