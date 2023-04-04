import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from '../../components/Store';
import Client from '../../api/Client';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ip from '../../api/Ip';
import { Avatar } from 'react-native-elements';
const UserReq = () => {
    const [mode, setmode] = store.useState("mode");
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [albumS, setalbumS] = store.useState("albumS")
    const [email, setemail] = store.useState("email");
    const [search, setsearch] = useState({ search: '' })
    const [datauser, setdatauser] = store.useState("datauser");
    let show = true
    useEffect(() => {
        loadreq()
    }, []);
    const [reqs, setreqs] = useState([])
    const loadreq = async () => {
        await Client.post("/get_request_friend", email)
            .then(function (res) {
                setreqs(res.data)
                console.log("bbb", res.data);
            }).catch(function (e) {
                console.log("error from load request friend", e)
            })
    }
    const [datareq, setdatareq] = useState({
        email_to: '',
        email_user: '',
    })
    const handeldeletereq = async (req) => {
        datareq.email_to = req.email_to
        datareq.email_user = req.email_user
        await Client.post("/delete_request_friend", datareq)
            .then(function (res) {
                if (res.data.s == "s") {
                    loadreq()
                }
            }).catch(function (e) {
                console.log("error from handel delte req", e)
            })
    }
    const [Friends, setFriends] = store.useState("Friends")
    const loadFriend = async () => {
        await Client.post("/get__friend", email).then(function (res) {
            setFriends(res.data);
        }).catch(function (e) {
            console.log("error from load friend ", e);
        })
    }
    const [datareqfriend, setdatareqfriend] = useState({
        email_user_1: '',
        name_user_1: '',
        image_user_1: '',
        email_user_2: '',
        name_user_2: '',
        image_user_2: '',
    })
    const [sendnotif, setsendnotif] = useState({
        email_do: '',
        email_to: '',
        vu: '',
        msg: '',
        img_profil: '',
        name: '',
        img_do: '',
    })
    const handelsendnotif = async () => {
        await Client.post("/addnotification", sendnotif).
            then(function (res) {
                console.log(res.data.msg);
            }).catch(function (e) {
                console.log("error from handel send notification", e);
            })
    }

    const [loaddata, setloaddata] = store.useState('loaddata')
    const handelAcceptReq = async (req) => {
        datareqfriend.email_user_1 = email.email
        datareqfriend.email_user_2 = req.email_user
        datareqfriend.image_user_1 = loaddata.image
        datareqfriend.image_user_2 = req.image_user
        datareqfriend.name_user_1 = loaddata.nom
        datareqfriend.name_user_2 = req.name_user
        // --------------------------------------------
        sendnotif.email_do = email.email
        sendnotif.email_to = req.email_user
        //sendnotif.vu = false
        sendnotif.img_do = 'null'
        sendnotif.name = loaddata.nom
        sendnotif.img_profil = loaddata.image
        sendnotif.msg = "ac_friend"
        await Client.post("/add_request_friend", datareqfriend).then(function (res) {
            if (res.data.s == "s") {
                loadreq()
                loadFriend()
                handelsendnotif()
            }
        }).catch(function (e) {
            console.log("error from add_request_friend", e);
        })
    }

    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

            >
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 30 }}>
                    <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                        <View style={{ flexDirection: row }}>
                            <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 15, color: maincolor, fontSize: 19 }}>{language.req_list}</Text>
                        </View>
                        <TextInput
                            style={[{ width: 250, alignSelf: 'center', height: 40, borderRadius: 15, marginBottom: 30 }, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder={language.recherche}
                            onChangeText={val => {
                                setsearch({ ...search, search: val });
                            }}
                            value={search.search}
                        />
                        {reqs.map((req, index) => {
                            if (req.name_user.indexOf(search.search) != -1) { show = true }
                            else { show = false }
                            if (show) {
                                return (
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <Avatar
                                            rounded
                                            size={50}
                                            //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}

                                            //onPress={() => console.log("Works!")}
                                            containerStyle={{ marginLeft: 20, marginBottom: 20 }}
                                            //source={image}
                                            source={{ uri: `${Ip}${req.image_user}` }}
                                        />
                                        <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>{req.name_user}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => handelAcceptReq(req)}>
                                                <AntDesign name='check' size={22} color={maincolor} style={{ marginVertical: 15, marginLeft: 20 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handeldeletereq(req)}>
                                                <MaterialIcons name='cancel' size={22} color={maincolor} style={{ marginVertical: 15, marginLeft: 20, }} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>)
                            }
                        })}
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default UserReq

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        //height: 500,
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        // alignItems: 'center',
        //padding: 10,

    },
})