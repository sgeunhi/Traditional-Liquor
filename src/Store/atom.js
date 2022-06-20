import {atom} from "recoil";
import * as React from "react";

export const pageCountState = atom({
  key: 'pageCountState',
  default: 1
});

export const currentAlcoholListState = atom({
  key: 'currentAlcoholListState',
  default: []
});

export const itemOffsetState = atom({
  key: 'itemOffsetState',
  default: 0
});

export const dummyAlcoholListState = atom({
  key: 'dummyAlcoholListState',
  default: require('../Asset/dummy-alcohols.json')
})
export const currentAlcoholIdState =atom({
  key:'currentAlcoholIdState',
  default:''
});