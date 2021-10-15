import { atom } from "recoil";
import * as key from "./atom";

export const chemistry = atom({
  key: key.CHEMISTRY,
  default: []
});

export const bill = atom({
  key: key.BILL,
  default: []
})
