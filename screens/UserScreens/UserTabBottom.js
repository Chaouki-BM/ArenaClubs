import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecherchePage from '../RecherchePage';
import Notification from '../Notification'
import SettingPage from '../SettingPage';
//import HomePage from '../HomePage';
import Messagerie from '../Messagerie'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import store from '../../components/Store';
//import DrawerTab from './DrawerTab';
import Client from '../../api/Client';
import UserHome from './UserHome'
import Acc from './Acc';
const Tab = createBottomTabNavigator()
const UserTabBottom = () => {
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [mode, setmode] = store.useState("mode");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [email, setemail] = store.useState("email");
    const [numbernotif, setnumbernotif] = useState("")
    useEffect(() => {
        getNumberNotificationsNoVu()
        getNumberMessageNoVu()
    }, [])
    const getNumberMessageNoVu = async () => {
        await Client.post("/get_nb_msg_non_vu", email)
            .then(function (res) {

                setnumbermsg(res.data.nb)
            }).catch(function (e) {
                console.log("error from get number msg no vu ", e)
            })
    }
    const getNumberNotificationsNoVu = async () => {
        await Client.post("/getnotification_vu", email)
            .then(function (res) {
                setnumbernotif(res.data.nbr_vu)
            }).catch(function (e) {
                console.log("error from get Number Notifications No Vu ", e);
            })
    }

    const vunotification = async () => {
        if (numbernotif > 0) {
            await Client.post("/vu_notification", email)
                .then(function (res) {
                    if (res.data.msg == 'success') {
                        getnotification()
                    }

                }).catch(function (e) {
                    console.log("error from vu notification", e)
                })
        }
    }
    const [numbermsg, setnumbermsg] = useState("")
    const [notifications, setnotifications] = store.useState("notifications")
    const getnotification = async () => {

        await Client.post("/getnotification", email)
            .then(function (res) {
                setnotifications(res.data.notification)
            }).catch(function (e) {
                console.log("error from get notification", e);
            })

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
                <Tab.Screen name="UserHome" component={UserHome}
                    options={{
                        title: `${language.account}`,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="user-alt" color={color} size={size} />

                        ),
                    }}

                />
                <Tab.Screen
                    name="Acc" component={Acc}
                    options={{
                        title: `${language.Home}`,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="home" color={color} size={size} />

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

                    listeners={() => ({
                        blur: () => {
                            setnumbernotif(0)
                            vunotification()
                            // getnotification()
                            // aux = true
                        },


                    })}
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
                        tabBarBadge: numbermsg == 0 ? null : numbermsg,
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

export default UserTabBottom

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
})



