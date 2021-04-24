
import auth from '@react-native-firebase/auth'

export default function Exit() {
    auth().signOut()
    return null
}