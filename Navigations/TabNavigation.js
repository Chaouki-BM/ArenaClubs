import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccueilPage from '../screens/AccueilPage';
import AlbumPage from '../screens/AlbumPage';
import SettingPage from '../screens/SettingPage';
import FollowersPage from '../screens/FollowersPage';
import FollowingPage from '../screens/FollowingPage'
import HomePage from '../screens/HomePage';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { SafeAreaView, StyleSheet } from 'react-native';
const Tab = createBottomTabNavigator()
const TabNavigation = () => {
    return (

        <SafeAreaView style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false,

                }}
            >
                <Tab.Screen name="HomePage" component={HomePage}
                    options={{
                        tabBarBadge: 10, title: 'Profile',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-alt" color={color} size={size} />

                        ),
                    }}

                />
                <Tab.Screen
                    name="AccueilPage" component={AccueilPage}
                    options={{
                        tabBarBadge: 3, title: 'Accueil',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Entypo name="home" color={color} size={size} />

                        ),

                    }}
                />
                <Tab.Screen name='AlbumPage' component={AlbumPage}
                    options={{
                        title: 'Album',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons name="md-albums" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="FollowersPage" component={FollowersPage}
                    options={{
                        title: 'Followers',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-friends" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="FollowingPage" component={FollowingPage}
                    options={{
                        title: 'Following',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-check" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="SettingPage" component={SettingPage}
                    options={{
                        title: 'Setting',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons name="settings-sharp" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        //width: '100%',
        height: '91%',
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        // alignItems: 'center',
        //backgroundColor: '#ECF1FE',
        // padding: 10,

    },
});

export default TabNavigation