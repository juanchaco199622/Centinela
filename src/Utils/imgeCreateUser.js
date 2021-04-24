import { Platform } from 'react-native';
import { FireBaseStorage } from './api';
import { generateRandomString } from './random';
import auth from '@react-native-firebase/auth'

const user = auth().currentUser;
const getFileLocalPath = response => {
  const { path, uri } = response;
  return Platform.OS === 'android' ? path : uri;
};

const createStorageReferenceToFile = response => {
  const { fileName } = response;
  const id = generateRandomString();
  return FireBaseStorage.ref(`${user.email}/${fileName}`);
};

export const uploadImageCreateuserToFireBase = response => {
  const fileSource = getFileLocalPath(response);
  const storageRef = createStorageReferenceToFile(response);
  return storageRef.putFile(fileSource);
};