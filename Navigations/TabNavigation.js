import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecherchePage from '../screens/RecherchePage';
import Notification from '../screens/Notification'
import SettingPage from '../screens/SettingPage';
import HomePage from '../screens/HomePage';
import Messagerie from '../screens/Messagerie'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView, StyleSheet } from 'react-native';
import store from '../components/Store';
//import DrawerTab from './DrawerTab';

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [mode, setmode] = store.useState("mode");
    return (
        <SafeAreaView style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: maincolor,
                    tabBarInactiveTintColor: '#8e8e8f',
                    headerShown: false,
                    tabBarStyle: { backgroundColor: mode }
                }}
            >
                <Tab.Screen name="HomePage" component={HomePage}
                    options={{
                        title: 'Account',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-alt" color={color} size={size} />

                        ),
                    }}
                />

                <Tab.Screen name='Notification' component={Notification}
                    options={{
                        tabBarBadge: 10, title: 'Notification',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons name="notifications" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="RecherchePage" component={RecherchePage}
                    options={{
                        title: 'Recherche',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="search" color={color} size={size} />

                        ),

                    }}
                />
                <Tab.Screen name="Messagerie" component={Messagerie}
                    options={{
                        tabBarBadge: 3, title: 'Messagerie',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Entypo name="message" color={color} size={size} />
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
        width: '100%',
        height: '91%',
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        // alignItems: 'center',
        //backgroundColor: '#ECF1FE',
        // padding: 10,

    },
});

export default TabNavigation