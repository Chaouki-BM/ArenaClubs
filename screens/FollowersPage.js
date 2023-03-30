import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from '../components/Store';
import Client from '../api/Client';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ip from '../api/Ip';
import { Avatar } from 'react-native-elements';
const FollowersPage = () => {
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
    let show = true
    useEffect(() => {
        loadreq()
    }, []);
    const [reqs, setreqs] = useState([])
    const loadreq = async () => {
        await Client.post("/get_request_club", email)
            .then(function (res) {
                setreqs(res.data)
                console.log(reqs)
            }).catch(function (e) {
                console.log("error from load request club", e)
            })
    }
    const handeldeletereq = async (req) => {
        datareq.email_club = req.email_club
        datareq.email_user = req.email_user
        await Client.post("/delete_request", datareq)
            .then(function (res) {
                if (res.data.msg == "success") {
                    loadreq()
                }
            }).catch(function (e) {
                console.log("error from handel delte req", e)
            })
    }
    const [datareq, setdatareq] = useState({
        email_club: '',
        email_user: '',
        name_user: '',
        image_user: '',
        role: '',
        date: '',

    })
    const handelAcceptReq = async (req) => {
        var today = new Date();
        var y = today.getFullYear();
        datareq.date = y
        datareq.email_club = req.email_club
        datareq.email_user = req.email_user
        datareq.image_user = req.image_user
        datareq.role = "Membre"
        datareq.name_user = req.name_user
        await Client.post("/add_request", datareq)
            .then(function (res) {
                if (res.data.msg == "success") {
                    loadreq()
                    loadmembres()
                }
            }).catch(function (e) {
                console.log("error from handel  accept req", e)
            })
    }
    const [getmembre, setgetmembre] = useState({
        email: '',
        date: ''
    })
    const [membres, setmembres] = store.useState("membres")
    const loadmembres = async () => {
        var today = new Date();
        var y = today.getFullYear();
        getmembre.date = y
        getmembre.email = email.email
        await Client.post("/get_membres_club", getmembre)
            .then(function (res) {
                setmembres(res.data)
            }).catch(function (e) {
                console.log("error from load membres", e)
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
                            <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 15, color: maincolor, fontSize: 19 }}>req list</Text>
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
                                            overlayContainerStyle={{ backgroundColor: 'gray' }}
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

export default FollowersPage

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