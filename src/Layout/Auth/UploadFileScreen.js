// #3 Uploading Files and Images to Firebase Cloud Storage in React Native
// https://aboutreact.com/react-native-firebase-cloud-storage/

// Import React in our code
import React, { useState } from "react";
import getPath from '@flyerhq/react-native-android-uri-path';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";

// Firebase Storage to upload file
import storage from "@react-native-firebase/storage";
// To pick the file from local file system
import DocumentPicker from "react-native-document-picker";

const UploadFileScreen = () => {
  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState("");

  const _chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      /*console.log(
        fileDetails.uri + '\n',
        fileDetails.type + '\n', // mime type
        fileDetails.name + '\n',
        fileDetails.size
        //"Detalles del archivo : " + JSON.stringify(fileDetails)
      );*/
      // Setting the state for selected File
      setFilePath(fileDetails);
    } catch (error) {
      setFilePath({});
      // If user canceled the document selection
      alert(
        DocumentPicker.isCancel(error)
          ? "Cancelado"
          : "Error desconocido: " + JSON.stringify(error)
      );
    }
  };

  const _uploadFile = async () => {
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0)
        return alert("Por favor selecciona un archivo");
      setLoading(true);

      // Create Reference
      //console.log(filePath.uri.replace("file://", ""));
      //console.log('este es el path ' + filePath.name);
      const reference = storage().ref(
        `/files/${filePath.name}`
      );
      //console.log('esta es la referencia ' + reference);
      // Put File
      //console.log('este es la URI ' + filePath.uri);
      const fileUri = getPath(filePath.uri);
      const task = reference.putFile(fileUri);
      /*const task = reference.putFile(
        filePath.uri.replace("file://", "")
      );*/
      // You can do different operation with task
      // task.pause();
      // task.resume();
      // task.cancel();

      task.on("state_changed", (taskSnapshot) => {
        setProcess(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`
        );
        console.log(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`
        );
      });
      task.then(() => {
        alert("Archivo cargado correctamente");
        setProcess("");
      });
      setFilePath({});
    } catch (error) {
      console.log("Error->", error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Adjuntar un archivo
            </Text>
            <View style={styles.container}>
              <Text>
                Selecciona un archivo para adjuntar
              </Text>
              <Text>{process}</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={_chooseFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Escoger adjunto (Selección Actual:{" "}
                  {Object.keys(filePath).length == 0
                    ? 0
                    : 1}
                  )
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_uploadFile}
              >
                <Text style={styles.buttonTextStyle}>
                  Subir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default UploadFileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: '#b31d1d',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
  },
});