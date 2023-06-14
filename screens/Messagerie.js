import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from '../components/Store';
import Client from '../api/Client';
import { Avatar } from 'react-native-elements';
import Ip from '../api/Ip';
import Entypo from 'react-native-vector-icons/Entypo'
const Messagerie = ({ navigation }) => {

    const [inputS, setinputS] = store.useState("inputS");
    const [albumS, setalbumS] = store.useState("albumS")
    const [email, setemail] = store.useState("email");
    const [msgemail, setmsgemail] = store.useState("msgemail")
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [language, setlanguage] = store.useState("language")
    useEffect(() => {
        getmssg()


    }, [])
    const [conv, setconv] = useState([])
    const getmssg = async () => {

        await Client.post("/get_conversation", email).then(function (res) {
            console.log(res.data.res)
            setconv(res.data.res)
        }).catch(function () {
            console.log("error from get mmsg")
        })
    }
    const [numbermsg, setnumbermsg] = store.useState("numbermsg")
    const getNumberMessageNoVu = async () => {
        await Client.post("/get_nb_msg_non_vu", email)
            .then(function (res) {

                setnumbermsg(res.data.nb)
            }).catch(function (e) {
                console.log("error from get number msg no vu ", e)
            })
    }
    const [pra, setpara] = useState({ email_user_1: '', email_user_2: '' })
    const handelopenmsg = async (e, i, n, vu, last) => {
        navigation.navigate('Conversation');
        msgemail.email = e
        msgemail.img = i
        msgemail.name = n
        pra.email_user_1 = email.email
        pra.email_user_2 = e
        if (vu === false && last != email.email) {
            await Client.post("/vu_conversation", pra).then(function (res) {
                console.log(res.data.res);
                getmssg()
                getNumberMessageNoVu()
            }).catch(function (e) {
                console.log('errro from vu conversation', e);
            })
        }

    }
    return (

        <View>
            <Text style={{
                alignSelf: 'center', marginTop: 10,
                fontWeight: 'bold', fontSize: 18, color: maincolor
            }}>{language.conversations}</Text>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >

                <View>
                    <View style={{ marginBottom: 30 }}></View>
                    {conv.map((msg, index) => (
                        <React.Fragment key={index}>
                            {msg?.email_user_2 === email.email ?
                                <View >
                                    <TouchableOpacity onPress={() => handelopenmsg(msg?.email_user_1, msg?.image_user_1, msg?.name_user_1, msg?.vu, msg?.last_msg)}>
                                        <View style={{
                                            flexDirection: "row", marginStart: 25,
                                            marginTop: 15, marginBottom: 5, backgroundColor: albumS, width: 350,
                                            borderRadius: 10, height: 60
                                        }}>

                                            <View style={{ flexDirection: "row", marginTop: 0, marginStart: 0 }}>


                                                <View style={{ marginTop: 5, marginStart: 30 }}>

                                                    <Avatar
                                                        rounded
                                                        size={50}

                                                        containerStyle={{ alignSelf: "center" }}

                                                        source={{ uri: `${Ip}${msg.image_user_1}` }}
                                                    />

                                                </View>

                                                <View style={{ marginTop: 18, marginStart: 30, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 15 }}>{msg.name_user_1} </Text>
                                                    {msg?.vu === false && msg?.last_msg != email.email ?
                                                        <Entypo name='dot-single' color={maincolor} size={35} style={{ marginHorizontal: 60, marginVertical: -8 }} />
                                                        : null}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View >
                                    <TouchableOpacity onPress={() => handelopenmsg(msg?.email_user_2, msg?.image_user_2, msg?.name_user_2, msg?.vu, msg?.last_msg)}>
                                        <View style={{
                                            flexDirection: "row", marginStart: 25,
                                            marginTop: 15, marginBottom: 5, backgroundColor: albumS, width: 350,
                                            borderRadius: 10, height: 60
                                        }}>

                                            <View style={{ flexDirection: "row", marginTop: 0, marginStart: 0 }}>


                                                <View style={{ marginTop: 5, marginStart: 30 }}>

                                                    <Avatar
                                                        rounded
                                                        size={50}
                                                        //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}

                                                        //onPress={() => console.log("Works!")}
                                                        containerStyle={{ alignSelf: "center" }}
                                                        //source={image}
                                                        source={{ uri: `${Ip}${msg.image_user_2}` }}
                                                    />

                                                </View>

                                                <View style={{ marginTop: 18, marginStart: 30, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 18 }}>{msg.name_user_2} </Text>
                                                    {msg?.vu === false && msg?.last_msg != email.email ?
                                                        <Entypo name='dot-single' color={maincolor} size={35} style={{ marginHorizontal: 60, marginVertical: -8 }} />
                                                        : null}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        </React.Fragment>
                    ))}

                </View>

            </ScrollView>
        </View>
    )
}

export default Messagerie

const styles = StyleSheet.create({})