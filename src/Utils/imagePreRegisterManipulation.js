import { Platform } from 'react-native';
import { FireBaseStorage } from './api';
import { generateRandomString } from './random';


const getFileLocalPath = response => {
  const { path, uri } = response;
  return Platform.OS === 'android' ? path : uri;
};

const createStorageReferenceToFile = response => {
  const { fileName } = response;
  const id = generateRandomString();
  return FireBaseStorage.ref(`PreRegister/${fileName}`);
};

export const uploadImageProfilePreRegisterToFireBase = response => {
  const fileSource = getFileLocalPath(response);
  const storageRef = createStorageReferenceToFile(response);
  return storageRef.putFile(fileSource);
};