import { useState, useCallback } from 'react';
import storage from '@react-native-firebase/storage';
import { uploadImageCreateuserToFireBase } from '../Utils';

export const useUploadImageCrearUsuario = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const monitorUpload = useCallback(response => {
    setUploading(true);
    setSuccess(false);
    setProgress(0);
    setError(null);

    const uploadTask = uploadImageCreateuserToFireBase(response);

    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED,
      async snapshot => {
        setProgress(
          snapshot.bytesTransferred / snapshot.totalBytes
        );
        if (snapshot.state === storage.TaskState.SUCCESS) {
          setDownloadURL(await snapshot.ref.getDownloadURL());
          setSuccess(true);
          setUploading(false);
          setProgress(0);
        }
      },
      error => {
        setError(error);
      }
    );
  }, []);

  const state = {
    progress,
    uploading,
    downloadURL,
    success,
    error,
  };

  return [state, monitorUpload];
};