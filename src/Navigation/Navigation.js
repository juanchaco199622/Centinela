import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
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

const AuthStack = createStackNavigator();

const AuthStackScreen = () =>(

    <AuthStack.Navigator
        initialRouteName="Login"
        headerMode = "none"
    >
            <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
)

/*const Stack = createStackNavigator();

const Mystack = () =>{
    <Stack.Navigator>
        <Stack.Screen name='ListUsers' component={ListUsers} />
    </Stack.Navigator>
}*/


const AppTabs = createBottomTabNavigator();

const AppTabsScreen =() =>(
     <AppTabs.Navigator>
        
        <AppTabs.Screen
            name = 'Perfil'
            component={Profile}
            options={{
                tabBarIcon:() =>(
                    <MaterialCommunityIcons name='account-circle' color={'black'} size={30}/>
                )
            }}
         />

        <AppTabs.Screen
            name = 'home'
            component={Home}
            options={{
                tabBarIcon:() =>(
                    <MaterialCommunityIcons name='home' color={'black'} size={30}/>
                )
            }}
         />

          <AppTabs.Screen
                name = 'Users'
                component={CreateUser}
                options={{
                    tabBarIcon:() =>(
                        <MaterialCommunityIcons name='account-group' color={'black'} size={30}/>
                    )
                }}
            />

        <AppTabs.Screen
            name = 'Exit'
            component={Exit}
            options={{
                tabBarIcon:() =>(
                    <MaterialCommunityIcons name='close' color={'black'} size={30}/>
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