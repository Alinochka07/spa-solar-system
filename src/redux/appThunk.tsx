import { store } from "./store";
import { charactersFetch, corporationsFetch, systemsFetch } from "./slicer";

export const fetchSystem = (solarSystemId: number) => {
  store.dispatch(systemsFetch(solarSystemId));
};

export const fetchCorporation = (corporationId: number) => {
  store.dispatch(corporationsFetch(corporationId));
};

export const fetchCharacter = (ceoId: number) => {
  store.dispatch(charactersFetch(ceoId));
};