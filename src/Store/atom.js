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

export const categoryState = atom({
  key : 'categoryState',
  default : 0,
})

export const filteredPageCountState = atom({
  key: 'filteredPageCountState',
  default : 1
})
export const filteredAlcoholListState = atom({
  key: 'filteredAlcoholListState',
  default : []
})
export const currentFilteredAlcoholListState = atom({
  key: 'currentFilteredAlcoholListState',
  default: []
})
export const filteredItemOffsetState = atom({
  key: 'filteredItemOffsetState',
  default: 0
})
export const filteredItemsIdState = atom({
  key: 'filteredItemsIdState',
  default : 0
})