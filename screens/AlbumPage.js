import { TouchableOpacity, StyleSheet, Text, View, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import store from '../components/Store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Client from '../api/Client';
const AlbumPage = ({ navigation }) => {
    const refRBSheet = useRef();
    const [mode, setmode] = store.useState("mode");
    const [inputS, setinputS] = store.useState("inputS");
    const [albumS, setalbumS] = store.useState("albumS")
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [chivron, setchivron] = useState('chevron-right')
    const [isFocusM, setisFocusM] = useState(false);
    const [email, setemail] = store.useState("email");
    const [data, setdata] = store.useState("data");
    const [AlbumName, setAlbumName] = useState({
        group_name2: '',
    })
    const [settingalbum, setsettingalbum] = store.useState("settingalbum")
    const [editalbum, seteditalbum] = useState({
        group_name: '',
        group_name2: '',
        email: '',
    })
    const handelthreedots = (Album) => {
        refRBSheet.current.open()
        settingalbum.group_name = Album.group_name
    }
    const refreshdata = async () => {
        await Client.post('/getprofil', email).then(function (res) {
            setdata(res.data);
        }).catch(function (e) {
            console.log('error from loaddata', e)
        })
    }
    const handelDeleteAlbum = async () => {
        settingalbum.email = email.email
        await Client.post("/deletealbum", settingalbum)
            .then(function (res) {
                if (res.data.type == "success") {
                    Alert.alert('success', 'Album Deteted')
                    loadData();
                    refreshdata();
                }

            }).catch(function (e) {
                console.log("error from delte album", e)
            })
    }
    const initialState = {

    };
    const handelsavechangename = async () => {
        editalbum.group_name = settingalbum.group_name;
        editalbum.group_name2 = AlbumName.group_name2;
        editalbum.email = email.email;
        await Client.post("/editalbum", editalbum).then(function (res) {
            if (res.data.type == "success") {
                Alert.alert('success', 'Album Name Edit ')
                loadData();
                setAlbumName(initialState)
            }
        }).catch(function (e) {
            console.log("error from change album name", e)
        })
    }
    const [dataemail, setdataemail] = useState({ email: '' })
    const [Albums, setAlbums] = store.useState("Albums")
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        dataemail.email = email.email
        await Client.post("/getallgroup", dataemail)
            .then(function (res) {
                setAlbums(res.data)
            }).catch(function (e) {
                console.log("error from load data ", e)
            })
    }
    const handelopenalbum = (Album) => {
        settingalbum.group_name = Album.group_name
        navigation.navigate('PostsAlbum');
    }

    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                {Albums.map((Album, index) => {
                    return (
                        <View key={index} style={{ alignItems: 'center', marginLeft: 9, marginTop: 10, backgroundColor: albumS, width: '95%', height: 55, borderRadius: 10, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handelopenalbum(Album)} style={{ alignItems: 'center', backgroundColor: albumS, width: '95%', height: 55, borderRadius: 10, flexDirection: 'row' }}>
                                <MaterialIcons name='photo-album' color={maincolor} size={30} style={{ alignSelf: 'flex-start', marginTop: 10 }} />
                                <Text style={{ flex: 1, textAlign: 'center', fontSize: 18, fontStyle: 'bold', color: textcoler }}>{Album.group_name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: -10 }} onPress={() => handelthreedots(Album)}>
                                <Entypo name='dots-three-horizontal' size={20} color={maincolor} />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView >

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={300}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: maincolor
                    },
                    container: {
                        backgroundColor: mode
                    }

                }}
            >
                <View
                    style={{
                        borderBottomColor: maincolor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: 400,
                        height: 16,
                        marginBottom: 15,

                    }}
                />
                <View >
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => chivron == 'chevron-right' ? setchivron('chevron-down') : setchivron('chevron-right')}>
                        <AntDesign name='edit' size={25} color={maincolor} style={{ marginLeft: 10, marginRight: 10 }} />
                        <Text style={{ color: textcoler, fontSize: 20, marginRight: 130 }}>Edit Album Name</Text>

                        <Entypo name={chivron} size={25} color={maincolor} />
                    </TouchableOpacity>
                </View>
                {chivron == 'chevron-down' &&
                    <View>
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {

                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 20,
                                marginTop: 20,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="New album name"
                            onChangeText={val => {
                                setAlbumName({ ...AlbumName, group_name2: val });
                            }}
                            value={AlbumName.group_name2}
                        />
                        <TouchableOpacity onPress={handelsavechangename} style={{ marginHorizontal: 130, backgroundColor: maincolor, width: 100, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", marginHorizontal: 9, marginVertical: 9 }}>Save change</Text>
                        </TouchableOpacity>
                    </View>}
                <View
                    style={{
                        borderBottomColor: maincolor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: 400,
                        height: 15,
                        marginBottom: 10,

                    }}

                />

                <TouchableOpacity onPress={handelDeleteAlbum} style={{ flexDirection: 'row' }}>
                    <EvilIcons name='trash' size={30} color={maincolor} style={{ marginLeft: 10, marginRight: 10 }} />
                    <Text style={{ color: textcoler, fontSize: 20, }}>Delete Album</Text>
                </TouchableOpacity>


                <View
                    style={{
                        borderBottomColor: maincolor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: 400,
                        height: 15,
                        marginBottom: 10,

                    }}

                />
            </RBSheet >
        </View >

    )
}

export default AlbumPage

const styles = StyleSheet.create({
    container: {
        //  width: '100%',
        height: '100%',
        //height: 500,
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#ECF1FE',
        //padding: 10,

    },
})