import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecherchePage from '../screens/RecherchePage';
import Notification from '../screens/Notification'
import SettingPage from '../screens/SettingPage';
import HomePage from '../screens/HomePage';
import Messagerie from '../screens/Messagerie'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import store from '../components/Store';
//import DrawerTab from './DrawerTab';
import Client from '../api/Client';
const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [mode, setmode] = store.useState("mode");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [email, setemail] = store.useState("email");
    const [numbernotif, setnumbernotif] = useState()
    useEffect(() => {
        getNumberNotificationsNoVu()
    }, [])
    useEffect(() => {
        return () => {
            vunotification()
        }
    }, [])
    const getNumberNotificationsNoVu = async () => {
        await Client.post("/getnotification_vu", email)
            .then(function (res) {
                setnumbernotif(res.data.nbr_vu)
            }).catch(function (e) {
                console.log("error from get Number Notifications No Vu ", e);
            })
    }
    const vunotification = async () => {
        console.log("bla bla bla1 ")
        if (numbernotif != 0) {
            await Client.post("/vu_notification", email)
                .then(function (res) {
                    if (res.data.msg == 'success') {
                        setnumbernotif(0)
                        console.log("bla bla bla 222")
                    }
                }).catch(function (e) {
                    console.log("error from vu notification", e)
                })
        }
    }
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
                        title: `${language.account}`,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-alt" color={color} size={size} />

                        ),
                    }}
                />

                <Tab.Screen name='Notification' component={Notification}

                    options={{
                        tabBarBadge: numbernotif == 0 ? null : numbernotif,
                        title: `${language.notification}`,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons name="notifications" color={color} size={size} />
                        ),
                    }}
                // listeners={({ navigation, route }) => ({
                //     tabPress: () => {
                //         vunotification()
                //     },
                // })}
                />
                <Tab.Screen
                    name="RecherchePage" component={RecherchePage}
                    options={{
                        title: `${language.recherche}`,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="search" color={color} size={size} />

                        ),

                    }}
                />
                <Tab.Screen name="Messagerie" component={Messagerie}
                    options={{
                        tabBarBadge: 3,
                        title: `${language.msg}`,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Entypo name="message" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="SettingPage" component={SettingPage}
                    options={{
                        title: `${language.setting}`,
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