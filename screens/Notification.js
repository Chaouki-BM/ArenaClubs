import React, { useState, useRef, useEffect, } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import store from '../components/Store';
import Ip from '../api/Ip';
import { Avatar } from 'react-native-elements';
import Client from '../api/Client';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useIsFocused } from '@react-navigation/native';
const Notification = () => {
    const [mode, setmode] = store.useState("mode");
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [albumS, setalbumS] = store.useState("albumS")
    const [email, setemail] = store.useState("email");
    const [lang, setlang] = store.useState("lang")
    const isFocused = useIsFocused();
    useEffect(() => {
        getnotification()
    }, [])


    // useEffect(() => {
    //     if (!isFocused) {
    //         getnotification()
    //     }
    //     getnotification()
    // }, [isFocused]);

    // const [numbernotif, setnumbernotif] = useState("")
    // const getNumberNotificationsNoVu = async () => {
    //     await Client.post("/getnotification_vu", email)
    //         .then(function (res) {
    //             setnumbernotif(res.data.nbr_vu)
    //         }).catch(function (e) {
    //             console.log("error from get Number Notifications No Vu ", e);
    //         })
    // }



    // const vunotification = async () => {
    //     if (numbernotif > 0) {
    //         await Client.post("/vu_notification", email)
    //             .then(function (res) {
    //                 if (res.data.msg == 'success') {
    //                     // setnumbernotif(0)
    //                 }
    //             }).catch(function (e) {
    //                 console.log("error from vu notification", e)
    //             })
    //     }
    // }


    const [notifications, setnotifications] = store.useState("notifications")
    const getnotification = async () => {

        await Client.post("/getnotification", email)
            .then(function (res) {

                setnotifications(res.data.notification)

            }).catch(function (e) {
                console.log("error from get notification", e);
            })

    }
    let icon
    let msgg
    return (

        <View style={[styles.container, { backgroundColor: mode }]}>

            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                {notifications.map((notification, index) => {
                    if (notification.msg == "n_role") {
                        icon = "cog"
                        if (lang.lang == "English") {
                            msgg = 'Modified your role in the club'
                        }
                        else {
                            if (lang.lang == "Français") {
                                msgg = 'A modifié votre rôle dans le club'
                            }
                            else {
                                msgg = 'قام بتعديل دورك في النادي'
                            }
                        }
                    } else if (notification.msg == "ac_request") {
                        icon = "flag"
                        if (lang.lang == "English") {
                            msgg = 'You have been accepted into the club'
                        }
                        else {
                            if (lang.lang == "Français") {
                                msgg = 'Tu as été accepté dans le club'
                            }
                            else {
                                msgg = 'لقد تم قبولك في النادي'
                            }
                        }
                    } else if (notification.msg == "new_request") {
                        icon = "user"
                        if (lang.lang == "English") {
                            msgg = 'Send a request'
                        }
                        else {
                            if (lang.lang == "Français") {
                                msgg = 'Envoyer une demande'
                            }
                            else {
                                msgg = 'ارسل طلب'
                            }
                        }
                    } else if (notification.msg == "ac_friend") {
                        icon = "chevron-circle-down"
                        if (lang.lang == "English") {
                            msgg = 'You have been accepted'
                        }
                        else {
                            if (lang.lang == "Français") {
                                msgg = 'Tu as été accepté'
                            }
                            else {
                                msgg = 'لقد تم قبولك'
                            }
                        }
                    } else if (notification.msg == "follow") {
                        icon = "rss"
                        if (lang.lang == "English") {
                            msgg = 'Started following you'
                        }
                        else {
                            if (lang.lang == "Français") {
                                msgg = 'A commencé à te suivre'
                            }
                            else {
                                msgg = 'بدأ في متابعتك'
                            }
                        }
                    } else if (notification.msg == 'like') {
                        if (lang.lang == "English") {
                            msgg = 'Liked your photo'
                        }
                        else {
                            if (lang.lang == "Français") {
                                msgg = 'Aimé ta photo'
                            }
                            else {
                                msgg = 'أحب صورتك'
                            }
                        }
                    } else if (notification.msg == 'commenter') {
                        if (lang.lang == "English") {
                            msgg = 'Comment on your photo'
                        }
                        else {
                            if (lang.lang == "Français") {
                                msgg = 'Commentez votre photo'
                            }
                            else {
                                msgg = 'علق على صورتك'
                            }
                        }
                    }

                    return (

                        <View key={index} style={{
                            flexDirection: 'row',
                            marginVertical: 3, backgroundColor: inputS, width: 370,


                        }}>
                            <View style={{
                                flexDirection: 'row', marginBottom: 10, marginTop: 10,
                            }}>

                                {notification.vu ? <View style={{ marginEnd: 35 }}></View> : <Entypo name='dot-single' size={35} color={maincolor} style={{ marginVertical: 6 }} />}

                                <Avatar
                                    rounded
                                    size={50}
                                    //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}

                                    //onPress={() => console.log("Works!")}
                                    containerStyle={{ alignSelf: "center" }}
                                    //source={image}
                                    source={{ uri: `${Ip}${notification.img_profil}` }}
                                />

                                <Text style={{ color: textcoler, fontSize: 18, marginStart: 10, marginTop: 15 }}>{notification.name} :</Text>
                                <View style={{ width: 190 }}>
                                    <Text style={{ color: textcoler, fontSize: 17, marginHorizontal: 10, marginTop: 15, fontWeight: 'bold' }}>{msgg} </Text>
                                </View>
                                {notification.img_do != "null" ?
                                    <Avatar
                                        //rounded
                                        size={50}
                                        //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}

                                        //onPress={() => console.log("Works!")}
                                        containerStyle={{ alignSelf: "center" }}
                                        //source={image}
                                        source={{ uri: `${Ip}${notification.img_do}` }}
                                    /> :

                                    <FontAwesome name={icon} color={maincolor} size={30} style={{ marginVertical: 10 }} />}
                            </View>
                        </View>

                    )

                })}
            </ScrollView>
        </View>

    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "flex-end",
        // backgroundColor: '#ECF1FE',
        padding: 10,

    },
})