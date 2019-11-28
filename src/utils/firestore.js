import firestore from "@react-native-firebase/firestore";

let mapCollection = firestore().collection('maps');

export function saveMap (map) {
  return mapCollection.add(map);
};

export function retrieveMap (mapId) {
  return mapCollection.doc(mapId);
};

export function retrieveMaps () {
  return mapCollection.get();
}