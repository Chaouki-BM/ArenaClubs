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
import InformationViewUser from './InformationViewUser';

import FriendViewUser from './FriendViewUser';

import FollowingViewUser from './FollowingViewUser';
const Tab = createMaterialTopTabNavigator()
const TabViewUser = () => {
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
                <Tab.Screen name='InformationViewUser' component={InformationViewUser}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons name="book-information-variant" color={color} size={20} />
                        ),
                    }}
                />


                <Tab.Screen name='FriendViewUser' component={FriendViewUser}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="users" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen name="FollowingViewUser" component={FollowingViewUser}
                    options={{
                        title: '',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-friends" color={color} size={20} />
                        ),
                    }}
                />



            </Tab.Navigator>

        </View>
    )
}

export default TabViewUser

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