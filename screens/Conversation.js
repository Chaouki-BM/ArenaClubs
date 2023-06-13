import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import store from '../components/Store';
import Client from '../api/Client';
import { useState } from 'react';
import { Avatar } from 'react-native-elements';
import Ip from '../api/Ip';
import Ionicons from 'react-native-vector-icons/Ionicons'
const Conversation = () => {
    const [email, setemail] = store.useState("email");
    const [msgemail, setmsgemail] = store.useState("msgemail")
    const [albumS, setalbumS] = store.useState("albumS")
    const [maincolor, setmaincolor] = store.useState("maincolor");
    useEffect(() => {
        getmessg()
    }, [])
    const [sendmsg, setsendmsg] = useState({
        sendmsg: '',

    });
    const [msg, setmsg] = useState([])
    const [param, setparam] = useState({ email_1: "", email_2: "" })
    const getmessg = async () => {
        param.email_1 = email.email
        param.email_2 = msgemail.email
        await Client.post("/get_messages", param).then(function (res) {
            setmsg(res.data.messages)
        }).catch(function (e) {
            console.log("error from get mssg Conversation .js", e);
        })
    }
    const [msggg, setmsggg] = useState({
        email_send: '',
        email_to: '',
        msg: ''
    })
    const sendMsgg = async () => {
        msggg.email_send = email.email
        msggg.email_to = msgemail.email
        msggg.msg = sendmsg.sendmsg
        getmessg()
        if (sendmsg.sendmsg) {
            await Client.post("/send_message", msggg).
                then(function (res) {
                    if (res.data.s = "s") {
                        getmessg()
                        setsendmsg("")
                    }
                }).catch(function (e) {
                    console.log('error from send message conversation.js');
                })
        }
    }
    return (
        <View>
            <View style={{ backgroundColor: '#969696', height: 60, flexDirection: 'row' }}>
                <View style={{ marginTop: 5, marginStart: 25 }}>
                    <Avatar
                        rounded
                        size={50}
                        //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}

                        //onPress={() => console.log("Works!")}
                        containerStyle={{ alignSelf: "center" }}
                        //source={image}
                        source={{ uri: `${Ip}${msgemail.img}` }}
                    />
                </View>
                <Text style={{ fontSize: 18, marginStart: 20, marginTop: 15, fontSize: 23 }}>{msgemail.name}</Text>
            </View>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                inverted

                style={{ height: 610 }}
            >
                <View style={{ marginTop: 30 }}>
                    {msg.map((ms, index) => (
                        <React.Fragment key={index}>
                            {ms?.email_send === email.email ?
                                <View style={{
                                    //imin
                                    alignSelf: 'flex-end', marginBottom: 20,
                                    borderRadius: 10, height: 40, backgroundColor: maincolor, marginRight: 10
                                }}>

                                    <Text style={{ color: 'white', marginTop: 8, marginEnd: 10, marginStart: 10, fontSize: 18 }}>{ms.msg}</Text>

                                </View>
                                :
                                <View style={{
                                    //isar
                                    marginStart: 10, marginBottom: 20,
                                    backgroundColor: "#b6b8bc", alignSelf: 'flex-start', borderRadius: 10, height: 40,
                                }}>
                                    <Text style={{
                                        color: 'black', marginTop: 8,
                                        marginEnd: 10, marginStart: 10, fontSize: 18
                                    }}>{ms.msg}</Text>
                                </View>
                            }
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView>
            <View style={{
                position: 'absolute',
                left: -15,
                right: 0,
                bottom: -60,
                padding: 10,
                flexDirection: 'row'
            }}>
                <TextInput
                    style={{
                        backgroundColor: '#b6b8bc', height: 40,
                        width: 330,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: 'black',
                        color: 'black'
                    }}
                    placeholder="send"
                    onChangeText={val => {
                        setsendmsg({ ...sendmsg, sendmsg: val });
                    }}
                    value={sendmsg.sendmsg}
                />
                <TouchableOpacity onPress={() => sendMsgg()}>
                    <Ionicons name='send' color={'#9f9f9f'} size={28} style={{ marginTop: 17 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Conversation

const styles = StyleSheet.create({})