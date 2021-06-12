import React from 'react';
import { View, StyleSheet, Text, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';

export default function viewMedicalinfo({route, navigation}) {
    const { fileURL } = route.params;
    const source = {uri: fileURL}
    return (
      
        <View style={styles.container}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                onPressLink={(uri)=>{
                    console.log(`Link presse: ${uri}`)
                }}
                style={styles.pdf}
            />
                  {/**<WebView
            source={{ uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${YOUR_URL}`}}
            startInLoadingState={true} 
        />**/}
        </View>
      
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        margin: 0
      },
      loading: {
        fontSize: 24,
        fontWeight: 'bold'
      },
   
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
