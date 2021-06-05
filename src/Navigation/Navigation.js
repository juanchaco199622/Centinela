import React from 'react';
import { NavigationContainer, StackActions, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Splash from '../Layout/Auth/Splash';
import Login from '../Layout/Auth/Login';
import Home from '../Layout/Auth/Home/Home';
import Profile from '../Layout/Auth/Profile/Profile';
import Exit from '../Layout/Exit/Exit';
import CreateUser from '../Layout/Auth/CreateUser';
import ListUsers from '../Layout/Auth/ListUsers';
import EditProfile from '../Layout/Auth/Profile/EditProfile';
import CreatePublication from '../Layout/Auth/CreatePublication';
import ListPublications from '../Layout/Auth/ListPublications';
import ListPublicationDetail from '../Layout/Auth/ListPublicationDetail';
import CreateActivity from '../Layout/Auth/CreateActivity';
import FilesListingScreen from '../Layout/Auth/FilesListingScreen';
import UploadFileScreen from '../Layout/Auth/UploadFileScreen';
import Notifications from '../Layout/Notifications/Notifications';
import ListActivities from '../Layout/Auth/ListActivities';
import ListActivitiesDetail from '../Layout/Auth/ListActivitiesDetail';
import auth from '@react-native-firebase/auth'
const AuthStack = createStackNavigator();

const AuthStackScreen = () =>(

    <AuthStack.Navigator
        initialRouteName="Login"
        headerMode = "none"
    >
            <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
)

const NotificationsStack = createStackNavigator();

const NotificationsStackScreen = () => (
    <NotificationsStack.Navigator
        headerMode="none"
        tabBarOptions={{
        activeTintColor:'#274040',
        inactiveTintColor:'grey',
        indicatorStyle: {
            backgroundColor:'#274040'
        }       
        }}
    >
        <NotificationsStack.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{
            title: 'Notificaciones',
            headerLeft:null,
            headerTitleAlign:'center',
            headerTitleStyle: {
            fontFamily: 'ProductSans-Bold',
            },
        }}
        />
    </NotificationsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();

const AppTabsScreen =() =>(
    <AppTabs.Navigator style={{backgroundColor:'#B10909'}}>
        
        <AppTabs.Screen
            name = 'Home'
            component={Home}
            options={{
                tabBarIcon:() =>(
                    <MaterialCommunityIcons name='home' color={'#949494'} size={30}/>
                )
            }}
        />

        <AppTabs.Screen
            name = 'Perfil'
            component={Profile}
            options={{
                tabBarIcon:() =>(
                    <MaterialCommunityIcons name='account-circle' color={'#949494'} size={30}/>
                )
            }}
        /> 

        <AppTabs.Screen
            name="Notificaciones" 
            component={NotificationsStackScreen} 
            options={{
                tabBarLabel: 'Notificaciones',
                headerStyle: {
                backgroundColor: '#ED1C24',
                },

                title:'Notificaciones',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={27} />
                ),
            }}
            /> 

        <AppTabs.Screen
            name='Cerrar sesión'
            component={Exit}
            options={{
                tabBarIcon:() =>(
                    <MaterialCommunityIcons name='exit-to-app' color={'#949494'} size={27}/>
                )
            }}
            
        />

    </AppTabs.Navigator>
)

// Stack root (Principal)
const RootStack = createStackNavigator();

const RootStackScreen = () =>{
    return(

        <RootStack.Navigator
            initialRouteName="Splash"
            headerMode = "none"
        >
            <RootStack.Screen name="Splash" component={Splash} />  
            <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
            <RootStack.Screen name="ListUsers" component={ListUsers}
                options={{
                    title: 'My home',
                    headerStyle: {
                    backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                    },
                }}
            />
            <RootStack.Screen name="AppTabsScreen" component={AppTabsScreen} />
            <RootStack.Screen name="EditProfile" component={EditProfile} />
            <RootStack.Screen name="CreatePublication" component={CreatePublication} />
            <RootStack.Screen name="ListPublications" component={ListPublications} />
            <RootStack.Screen name="CreateUser" component={CreateUser} />
            <RootStack.Screen name="ListPublicationDetail" component={ListPublicationDetail} />
            <RootStack.Screen name="CreateActivity" component={CreateActivity} />
            <RootStack.Screen name="UploadFileScreen" component={UploadFileScreen} />
            <RootStack.Screen name="ListActivities" component={ListActivities}/>
            <RootStack.Screen name="FilesListingScreen" component={FilesListingScreen} />
            <RootStack.Screen name="ListActivitiesDetail" component={ListActivitiesDetail}/>
        </RootStack.Navigator>
    )
}

export default () =>{
    return(
        <NavigationContainer>
            <RootStackScreen />
        </NavigationContainer>
    )
}