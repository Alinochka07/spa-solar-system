import { store } from "./store";
import { systemsFetch } from "./slicer";

export const fetchSystem = (solarSystemId: number) => {
  store.dispatch(systemsFetch(solarSystemId));
};