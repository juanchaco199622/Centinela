// #3 Uploading Files and Images to Firebase Cloud Storage in React Native
// https://aboutreact.com/react-native-firebase-cloud-storage/

// Import React in our code
import React, { useState, useEffect } from "react";

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";

import storage from "@react-native-firebase/storage";
const FilesListingScreen = () => {
  // State Defination
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listFilesAndDirectories("");
  }, []);

  const listFilesAndDirectories = (pageToken) => {
    const reference = storage().ref("myfiles");
    reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
        console.log("ref  ->>  ", JSON.stringify(ref));
      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(
          reference,
          result.nextPageToken
        );
      }
      setListData(result.items);
      setLoading(false);
    });
  };

  const ItemView = ({ item }) => {
    return (
      // FlatList Item
      <View style={{ padding: 10 }}>
        <Text
          style={styles.item}
          onPress={() => getItem(item.fullPath)}
        >
          File Name: {item.name}
          {"\n"}
          File Full Path: {item.fullPath}
          {"\n"}
          Bucket: {item.bucket}
        </Text>
        <Text style={{ color: "red" }}>
          Click to generate Signed URL and Open it in
          browser
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = async (fullPath) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch((e) => {
        console.error(e);
      });
    Linking.openURL(url);
    console.log(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        ARCHIVOS
      </Text>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={listData}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <Text style={styles.footerHeading}>
        React Native Firebase Cloud Storage
      </Text>
      <Text style={styles.footerText}>
        www.aboutreact.com
      </Text>
    </SafeAreaView>
  );
};

export default FilesListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
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