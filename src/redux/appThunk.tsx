import { store } from "./store";
import { alliancesByIdFetch, charactersFetch, constellationsByIdFetch, corporationsFetch, systemsFetch } from "./slicer";

export const fetchSystem = (solarSystemId: number) => {
  store.dispatch(systemsFetch(solarSystemId));
};

export const fetchCorporation = (corporationId: number) => {
  store.dispatch(corporationsFetch(corporationId));
};

export const fetchCharacter = (ceoId: number) => {
  store.dispatch(charactersFetch(ceoId));
};

export const fetchAllianceById = (allianceId: number) => {
  store.dispatch(alliancesByIdFetch(allianceId));
}

export const fetchConstellationsById = (constellationId: number) => {
  store.dispatch(constellationsByIdFetch(constellationId));
}

