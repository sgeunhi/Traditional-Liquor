import {selector} from "recoil";
import * as React from "react";
import getAllAlcohols from "../Api/getAllAlcohols";
import getRate from "../Api/getRate";
import {currentAlcoholIdState} from "./atom";

export const alcoholListState = selector({
  key: 'alcoholListState',
  get: async () => {
    const response = await getAllAlcohols();
    console.log(response);
    return response;
  },
});

export const rateListState = selector({
  key: 'rateListState',
  get: async ({get}) => {
    const alcoholId = get(currentAlcoholIdState);
    const response = await getRate(alcoholId);
    const sortedByTimeStamp = response.sort(function (a, b) {
      return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
    })
    return sortedByTimeStamp;
  }
})
