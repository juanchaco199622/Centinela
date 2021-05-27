
import auth from '@react-native-firebase/auth'

export default function Exit({navigation}) {
    auth().signOut()
    navigation.navigate('AuthStackScreen');
    return null
}