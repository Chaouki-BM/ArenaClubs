import React, { Text } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
//import FollowingPage from '../screens/FollowingPage'
//import FollowersPage from '../screens/FollowersPage'
//import AlbumPage from '../screens/AlbumPage'
import store from '../../components/Store';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//import Profile from '../screens/Profile'
//import Informations from '../screens/Informations';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserInformation from './UserInformation';
import UserReq from './UserReq';
import UserFriend from './UserFriend';
import UserSaved from './UserSaved';
import UserSuivis from './UserSuivis';
const Tab = createMaterialTopTabNavigator()
const UserBarProfil = () => {
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [mode, setmode] = store.useState("mode");
    return (
        <View style={styles.container}>

            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: maincolor,
                    tabBarInactiveTintColor: '#8e8e8f',
                    headerShown: false,
                    tabBarStyle: { backgroundColor: mode, height: 50 }
                }}
            >
                <Tab.Screen name='UserInformation' component={UserInformation}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons name="book-information-variant" color={color} size={20} />
                        ),
                    }}
                />

                <Tab.Screen name='UserSaved' component={UserSaved}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (

                            <FontAwesome name="bookmark" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen name='UserFriend' component={UserFriend}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="users" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen name="UserSuivis" component={UserSuivis}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-friends" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen name="UserReq" component={UserReq}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (

                            <FontAwesome5 name="user-check" color={color} size={20} />
                        ),
                    }}
                />


            </Tab.Navigator>

        </View>

    )
}

export default UserBarProfil

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 590,
        //justifyContent: 'center',
        //Top: '50%',
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        //alignItems: 'center',
        //backgroundColor: '#ECF1FE',
        // padding: 10,

    },
})