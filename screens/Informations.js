import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from '../components/Store';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements';
import Client from '../api/Client';
import Ip from '../api/Ip';
const Informations = () => {
    const [mode, setmode] = store.useState("mode");
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [albumS, setalbumS] = store.useState("albumS")
    const [email, setemail] = store.useState("email");
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        loaddata()
        loadmembres()
    }, []);
    const [data, setdata] = useState([])
    const loaddata = async () => {
        await Client.post("/getclub", email)
            .then(function (res) {

                setdata(res.data.club)

            }).catch(function (e) {
                console.log("error from load data information", e)
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
    const [bodydelete, setbodydelete] = useState({ email_club: '', email_user: '', date: '' })
    const handeldeltemembre = async (membre) => {
        bodydelete.email_club = membre.email_club
        bodydelete.email_user = membre.email_user
        bodydelete.date = membre.date
        await Client.post("/delete_membre", bodydelete).then(function (res) {
            if (res.data.msg == 'success') {
                loadmembres()
            }
        }).catch(function (e) {
            console.log("error from delte membre", e)
        })
    }

    const [datamembre, setdatamembre] = useState({
        email_club: '',
        email_user: '',
        role: '',
        date: ''
    })
    const handeleditrole = (membre) => {
        var today = new Date();
        var y = today.getFullYear();
        datamembre.email_club = membre.email_club
        datamembre.email_user = membre.email_user
        datamembre.date = y
        console.log(membre)
        role.role = membre.role
    }
    const [role, setrole] = useState({ role: '' })
    const handelSaveChangeRole = async () => {
        datamembre.role = role.role
        await Client.post("/modify_role", datamembre)
            .then(function (res) {
                if (res.data.msg = 'success') {
                    loadmembres()
                }
            }).catch(function (e) {
                console.log("error from handel save change role ", e)
            })
    }
    const [search, setsearch] = useState({ search: '' })
    let show = true
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 30 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, color: maincolor, fontSize: 19, marginBottom: 15 }}>{language.university}</Text>
                    </View>
                    <View style={{ marginHorizontal: 80, flexDirection: 'row' }}>
                        <FontAwesome name='graduation-cap' size={25} color={maincolor} style={{ marginEnd: 10 }} />
                        <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.nom_universite} </Text>

                    </View>
                    <View style={{ marginHorizontal: 88, flexDirection: 'row' }}>
                        <FontAwesome name='map-marker' size={25} color={maincolor} style={{ marginEnd: 20 }} />
                        <Text style={{ marginBottom: 20, color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.ville}</Text>
                    </View>
                </View>
                {/* ----------------------------------------------- */}
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, color: maincolor, fontSize: 19, marginBottom: 15 }}>{language.contact}</Text>
                    </View>
                    <View style={{ marginHorizontal: 75, flexDirection: 'row' }}>
                        <FontAwesome name='phone' size={25} color={maincolor} style={{ marginEnd: 10 }} />
                        <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }} >{data.tele}</Text>

                    </View>
                    <View style={{ marginHorizontal: 70, flexDirection: 'row' }}>
                        <Ionicons name='mail' size={25} color={maincolor} style={{ marginEnd: 10 }} />
                        <Text style={{ marginBottom: 20, color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.email_contact}</Text>
                    </View>
                </View>
                {/* -------------------------------------- */}
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 15, color: maincolor, fontSize: 19 }}>{language.memberlist}</Text>
                    </View>
                    <TextInput
                        style={[{ width: 250, alignSelf: 'center', height: 40, borderRadius: 15, marginBottom: 20 }, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
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
                    {membres.map((membre, index) => {
                        if (membre.name_user.indexOf(search.search) != -1) { show = true }
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
                                        source={{ uri: `${Ip}${membre.image_user}` }}
                                    />
                                    <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>{membre.name_user}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => handeldeltemembre(membre)}>
                                            <MaterialIcons name='cancel' size={22} color={maincolor} style={{ marginVertical: 15, marginLeft: 20, }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { handeleditrole(membre), setModalVisible(true) }}>
                                            <MaterialIcons name='edit' size={22} color={maincolor} style={{ marginVertical: 15, marginLeft: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>)
                        }
                    })}
                </View>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 22,
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: mode,
                        borderRadius: 20,
                        padding: 35,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <Text style={{ color: textcoler, fontSize: 18, marginBottom: 10 }}>{language.C_role}</Text>
                        <TextInput
                            style={[{ width: 250, alignSelf: 'center', height: 40, borderRadius: 15, marginBottom: 20 }, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder={language.role}
                            onChangeText={val => {
                                setrole({ ...role, role: val });
                            }}
                            value={role.role}
                        />
                        <View style={{ flexDirection: row }}>
                            <TouchableOpacity
                                style={{ marginHorizontal: 30, backgroundColor: maincolor, height: 35, borderRadius: 10 }}
                                onPress={() => { setModalVisible(!modalVisible), handelSaveChangeRole() }}>
                                <Text style={{ fontSize: 16, alignSelf: 'center', marginStart: 10, marginEnd: 10, top: 6, color: textcoler }}>{language.save}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginHorizontal: 30, backgroundColor: maincolor, height: 35, borderRadius: 10 }}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={{ fontSize: 16, alignSelf: 'center', marginStart: 10, marginEnd: 10, top: 6, color: textcoler }}>{language.close}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )

}
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
export default Informations