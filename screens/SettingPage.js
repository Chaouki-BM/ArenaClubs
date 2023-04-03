import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert, Modal, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import store from '../components/Store';
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Client from '../api/Client';
import { launchImageLibrary } from 'react-native-image-picker';
const SettingPage = ({ navigation }) => {
    const refRBSheet = useRef();
    const lan = useRef();
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [modalVisible, setModalVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [email, setemail] = store.useState("email");
    const [data, setdata] = store.useState("data");
    const [datauser, setdatauser] = store.useState("datauser");
    const [albumS, setalbumS] = store.useState("albumS")
    const [Albums, setAlbums] = store.useState("Albums")

    const handelModal = () => {
        if (modalVisible == false) {
            setModalVisible(true)
        } else {
            setModalVisible(false)
        }

    };



    const handleThemeChange = () => {
        setmode(mode == "#ffffff" ? "#242526" : "#ffffff");
        settextcoler(textcoler == "#242526" ? "#ffffff" : "#242526");
        setSun(Moons == 'brightness-high' ? 'brightness-2' : 'brightness-high');
        setinputS(inputS == '#f2f2f2' ? '#343434' : '#f2f2f2');
    };
    const handelMaincolor = (main) => {
        setmaincolor(main)
        setModalVisible(false)
    }
    const [chevron, setchevron] = useState("chevron-right")
    const handelchevron = () => {
        if (chevron == 'chevron-right') {
            setchevron('chevron-down')
        } else {
            setchevron('chevron-right')
        }
    }
    const [visible, setvisible] = useState('')
    const handelchangePassword = () => {
        refRBSheet.current.open()
        setvisible('changepassword')
    }
    const handelchangeName = () => {
        refRBSheet.current.open()
        setvisible('changename')
    }
    const upload = async () => {
        const formData = new FormData()
        formData.append('file', { uri: pict.pict, type: 'image/jpeg', name: 'image.jpg' })
        await Client.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {
            let path = res.data.file.path
            imageup.image = path
            imageup.email = email.email

            postimg()
        }).catch(function (e) {
            console.log('err bcz update prfl img', e)
            Alert.alert('Import your image again')
        })
    }
    const handelchangePicture = () => {

        let options = {
            mediaType: 'photo',
            quality: 1,
            // includeBase64: true,
        };

        launchImageLibrary(options, res => {
            if (!res.didCancel) {
                pict.pict = res.assets[0].uri
                console.log("img ok", res.assets[0].uri)
                upload()
            }

        })


    }
    const [imageup, setimageup] = useState({
        image: '',
        email: '',
    })
    const postimg = async () => {
        await Client.post("/Upimage", imageup)
            .then(function (res) {
                Alert.alert('success');
                refreshuser();
            }).catch(function (e) {
                console.log('error postimg', e)
            })
    }


    const [pict, setpict] = useState({ pict: '' });
    const handelDeleteCouverture = () => {
        setModal(true)
        setvisible('')
    }
    const handelEditLinks = () => {
        refRBSheet.current.open()
        setvisible('editlikns')
    }

    // const handelContactUs = () => {
    //     refRBSheet.current.open()
    //     setvisible('')
    // }
    const [log, setlog] = store.useState("log")
    const handelLogOut = () => {
        navigation.replace('Login');
        email.email = ''

        setlog(false)

        console.log('good by')
    }
    const handelchangeBio = () => {
        refRBSheet.current.open()
        setvisible('changeBio')
    }
    const handelchangelang = () => {
        lan.current.open()

    }
    const handelchangedata = () => {
        refRBSheet.current.open()
        setvisible('changedata')
    }


    useEffect(() => {
        loadData();
        loadDataUser();
    }, []);
    const loadData = async () => {
        await Client.post('/getprofil', email)
            .then(function (res) {
                changeBio.bio = res.data.res.bio
                changelink.facebook = res.data.res.facebook
                changelink.instagram = res.data.res.instagram
                changelink.twitter = res.data.res.twitter
            }).catch(function (e) {
                console.log('error from loaddata', e)
            })
    }
    const loadDataUser = async () => {
        await Client.post('/getclub', email)
            .then(function (res) {
                changename.name = res.data.club.nom
            }).catch(function (e) {
                console.log('error data from laoddatauser', e)
            })
    }
    const refreshuser = async () => {
        await Client.post('/getclub', email).then(function (res) {
            setdatauser(res.data.club)

        }).catch(function (e) {
            console.log('error data from laoddatauser', e)
        })
    }

    const refreshdata = async () => {
        await Client.post('/getprofil', email)
            .then(function (res) {
                setdata(res.data.res);
            }).catch(function (e) {
                console.log('error from loaddata', e)
            })
    }


    const [deletevar, setdeletevar] = useState({
        couverture: '',
        email: '',
    })
    const handelyesdelete = async () => {
        setModal(!modal)
        deletevar.email = email.email
        await Client.post("/Upcouverture", deletevar)
            .then(function (res) {
                if (res.data.msg == 'success') {
                    Alert.alert('success')
                    refreshuser();
                }
            }).catch(function (e) {
                console.log('error from delete  cover', e)

            })
    }
    const [lang, setlang] = store.useState("lang")
    const [language, setlanguage] = store.useState("language")
    const changelang = async () => {

        await Client.post('/get_language', lang).then(function (res) {
            setlanguage(res.data.My_language)
        }).catch(function () {
            console.log("error from get long login")
        })
    }




    const [row, setrow] = store.useState("dir")
    const handelarbic = () => {
        lang.lang = "Arabic"
        changelang()
        setrow("row-reverse")
    }
    const handeleng = () => {
        lang.lang = "English"
        changelang()
        setrow("row")
    }
    const handelfr = () => {
        lang.lang = "Français"
        changelang()
        setrow("row")
    }
    const initialState = {

    };
    const [changepassword, setchangepassword] = useState({
        password: '',
        password1: '',
        password2: '',
        email: '',
    });
    const handelsavechange = async () => {
        changepassword.email = email.email
        await Client.post("/changepassword", changepassword).then(function (res) {
            if (res.data.type == 'success') {
                Alert.alert('success', res.data.msg)
                setchangepassword(initialState)
            } else {
                Alert.alert('error', res.data.msg)
            }

        }).catch(function (e) {
            console.log("error from handelsave password", e)
        })
    }
    const [changename, setchangename] = useState({
        name: '',
        email: '',

    })
    const handelsavechangename = async () => {
        changename.email = email.email
        await Client.post("/changename", changename)
            .then(function (res) {
                if (res.data.type == 'success') {
                    Alert.alert('success', res.data.type)
                    refreshuser()
                } else {
                    Alert.alert('error', res.data.type)
                }
            }).catch(function (e) {
                console.log('error from change name ande tag ', e)
            })
    }
    const [changeBio, setchangeBio] = useState({
        bio: '',
        email: '',
    })
    const handelsaveBio = async () => {
        changeBio.email = email.email
        await Client.post("/modify_bio", changeBio)
            .then(function (res) {
                if (res.data.type == 'success') {
                    Alert.alert('success', "success")
                    refreshdata()

                } else {
                    Alert.alert('error', 'error')

                }
            }).catch(function (e) {
                console.log("error from change Bio", e)
            })
    }

    // const handelsaveData = async () => {
    //     changeData.email = email.email
    //     await Client.post("/modify", changeData).then(function (res) {
    //         if (res.data.type == 'success') {
    //             Alert.alert('success', res.data.msg)
    //         } else {
    //             Alert.alert('error', res.data.msg)

    //         }
    //     }).catch(function (e) {
    //         console.log("error from save data (tel,add,birth)", e)
    //     })
    // }
    const [changelink, setchangelink] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        email: '',
    })


    const handelsavechangelinks = async () => {
        changelink.email = email.email
        await Client.post("/changelinks", changelink).then(function (res) {
            if (res.data.type == 'success') {
                Alert.alert('success', res.data.msg)
            } else {
                Alert.alert('error', res.data.msg)
            }
        }).catch(function (e) {
            console.log("error from change links", e)
        })
    }


    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <TouchableOpacity onPress={handelModal}>
                <View style={styles.iconPContainer} >
                    <Ionicons name="color-palette-sharp" size={27}
                        color='#8e8e8f'
                        style={{

                            resizeMode: 'contain',
                        }}
                    />

                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>

                    <View style={[styles.modalView, { backgroundColor: mode }]} >
                        <View style={{ top: 3, left: 140 }}>
                            <TouchableOpacity onPress={handelModal}>
                                <Fontisto name="close-a" size={16} color={textcoler}
                                    style={{
                                        opacity: 0.6
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", top: 10, left: 10 }}>
                            <TouchableOpacity onPress={() => handelMaincolor("#72b626")}>
                                <Entypo name="controller-stop" color="#72b626" size={35} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handelMaincolor("#ffb400")}>
                                <Entypo name="controller-stop" color="#ffb400" size={35} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handelMaincolor("#fa5b0f")}>
                                <Entypo name="controller-stop" color="#fa5b0f" size={35} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handelMaincolor("#da3939")}>
                                <Entypo name="controller-stop" color="#da3939" size={35} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", top: 15, left: 10 }}>
                            <TouchableOpacity onPress={() => handelMaincolor("#c579e3")}>
                                <Entypo name="controller-stop" color="#c579e3" size={35} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handelMaincolor("#fc22fc")}>
                                <Entypo name="controller-stop" color="#fc22fc" size={35} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handelMaincolor("#4169e1")}>
                                <Entypo name="controller-stop" color="#4169e1" size={35} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handelMaincolor("#7111df")}>
                                <Entypo name="controller-stop" color="#7111df" size={35} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </Modal >

            <TouchableOpacity onPress={handleThemeChange}>
                <View style={styles.iconMContainer}>
                    <MaterialIcons name={Moons} size={26} color='#8e8e8f'
                        style={{
                            top: -30

                        }}
                    />
                </View>
            </TouchableOpacity>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

            >
                <View
                    style={{
                        borderBottomColor: maincolor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: 380,
                        height: 12,
                        marginBottom: 10,

                    }}
                />
                <View style={{ margin: 10 }} >
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelchevron()}>
                        <View style={{ flexDirection: row }}>
                            <FontAwesome5 name='wrench' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 20 }}>{language.g_account}</Text>
                            <FontAwesome5 name={chevron} size={25} color={maincolor} style={{ marginRight: 20 }} />
                        </View>
                    </TouchableOpacity>
                    {chevron == 'chevron-down' &&
                        <View >
                            <View
                                style={{
                                    borderBottomColor: maincolor,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    width: 380,
                                    height: 12,
                                    marginBottom: 10,

                                }}
                            />
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangePassword()}>
                                <View style={{ flexDirection: row }}>

                                    <MaterialIcons name='security' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 10 }}>{language.change_p}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangeName()}>
                                <View style={{ flexDirection: row }}>

                                    <FontAwesome name='user' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 10 }}>{language.change_nt}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangeBio()}>
                                <View style={{ flexDirection: row }}>
                                    < FontAwesome name='pencil' size={23} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 10 }}>{language.edit_bio}</Text>
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangedata()}>
                                <View style={{ flexDirection: 'row' }}>
                                    < FontAwesome name='pencil' size={23} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Update cobbler profile</Text>
                                </View>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangePicture()}>
                                <View style={{ flexDirection: row }}>

                                    < FontAwesome5 name='images' size={23} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 10 }}>{language.u_p}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelDeleteCouverture()}>
                                <View style={{ flexDirection: row }}>

                                    < FontAwesome5 name='trash' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 10 }}>{language.d_c}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 11,
                            marginBottom: 10,

                        }}
                    />
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelEditLinks()}>
                        <View style={{ flexDirection: row }}>

                            <Feather name='link' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 20 }}>{language.edit_links}</Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 15,
                            marginBottom: 10,

                        }}
                    />

                    {/* <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelContactUs()}>
                        <View style={{ flexDirection: 'row' }}>

                            <AntDesign name='google' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Contact US</Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 15,
                            marginBottom: 10,

                        }}
                    /> */}
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelchangelang()}>
                        <View style={{ flexDirection: row }}>

                            <MaterialIcons name='language' size={27} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 20 }}>{language.select}</Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 15,
                            marginBottom: 10,

                        }}
                    />
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={handelLogOut}>
                        <View style={{ flexDirection: row }}>

                            <Entypo name='log-out' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginEnd: 20 }}>{language.logout}</Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 15,
                            marginBottom: 10,

                        }}
                    />

                </View>
            </ScrollView >
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={650}
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
                {visible == 'changepassword' &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: maincolor, fontSize: 18, alignSelf: "center", marginBottom: 60 }}>{language.change_p}</Text>
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 40,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder={language.password}
                            onChangeText={val => {
                                setchangepassword({ ...changepassword, password: val });
                            }}
                            value={changepassword.password}
                        />
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 40,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder={language.change_p}
                            onChangeText={val => {
                                setchangepassword({ ...changepassword, password1: val });
                            }}
                            value={changepassword.password1}
                        />
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 70,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder={language.confirm}
                            onChangeText={val => {
                                setchangepassword({ ...changepassword, password2: val });
                            }}
                            value={changepassword.password2}
                        />
                        <TouchableOpacity onPress={handelsavechange} style={{ marginHorizontal: 130, backgroundColor: maincolor, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", alignSelf: "center", top: 8 }}>{language.save}</Text>
                        </TouchableOpacity>
                    </View>}
                {/* ------------------------Change-name------------------------------ */}
                {visible == 'changename' &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ marginHorizontal: 90, color: maincolor, fontSize: 18, alignSelf: "center", marginBottom: 60 }}>{language.change_nt}</Text>
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 40,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder={language.name}
                            onChangeText={val => {
                                setchangename({ ...changename, name: val });
                            }}
                            value={changename.name}
                        />


                        <TouchableOpacity onPress={handelsavechangename} style={{ marginHorizontal: 130, backgroundColor: maincolor, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", alignSelf: 'center', top: 8 }}>{language.save}</Text>
                        </TouchableOpacity>
                    </View>}
                {/* ----------------------Bio------------------------ */}
                {visible == 'changeBio' &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ marginHorizontal: 130, color: maincolor, fontSize: 18, marginVertical: 50 }}>Change Bio</Text>
                        <TextInput
                            multiline
                            numberOfLines={2}
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 300,
                                //height: 100,
                                marginHorizontal: 10,
                                marginBottom: 40,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="New Bio"
                            onChangeText={val => {
                                setchangeBio({ ...changeBio, bio: val });
                            }}
                            value={changeBio.bio}
                        />
                        <TouchableOpacity onPress={handelsaveBio} style={{ marginHorizontal: 130, backgroundColor: maincolor, width: 100, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", marginHorizontal: 9, marginVertical: 9 }}>Save change</Text>
                        </TouchableOpacity>
                    </View>}
                {/* -------------------change-Data----------------- */}
                {/* {visible == 'changedata' &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ marginHorizontal: 90, color: maincolor, fontSize: 18, marginVertical: 50 }}>Change cobbler profile</Text>
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 300,
                                //height: 100,
                                marginHorizontal: 10,
                                marginBottom: 40,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Telephone"
                            onChangeText={val => {
                                setchangeData({ ...changeData, tel: val });
                            }}
                            value={changeData.tel}
                        />
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 300,
                                //height: 100,
                                marginHorizontal: 10,
                                marginBottom: 40,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Address"
                            onChangeText={val => {
                                setchangeData({ ...changeData, adress: val });
                            }}
                            value={changeData.adress}
                        />
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 300,
                                //height: 100,
                                marginHorizontal: 10,
                                marginBottom: 40,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Birthday"
                            onChangeText={val => {
                                setchangeData({ ...changeData, birthday: val });
                            }}
                            value={changeData.birthday}
                        />
                        <TouchableOpacity onPress={handelsaveData} style={{ marginHorizontal: 130, backgroundColor: maincolor, width: 100, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", marginHorizontal: 9, marginVertical: 9 }}>Save change</Text>
                        </TouchableOpacity>
                    </View>} */}

                {/* ----------------------links------------------------ */}
                {visible == 'editlikns' &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: maincolor, fontSize: 18, alignSelf: 'center', marginBottom: 60 }}>{language.edit_links}</Text>
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 20,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Facebook "
                            onChangeText={val => {
                                setchangelink({ ...changelink, facebook: val });
                            }}
                            value={changelink.facebook}
                        />
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 20,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Instagram"
                            onChangeText={val => {
                                setchangelink({ ...changelink, instagram: val });
                            }}
                            value={changelink.instagram}
                        />
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 20,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Twitter"
                            onChangeText={val => {
                                setchangelink({ ...changelink, twitter: val });
                            }}
                            value={changelink.twitter}
                        />

                        {/* <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {
                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 70,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Tiktok link"
                            onChangeText={val => {
                                setchangelink({ ...changelink, tiktok: val });
                            }}
                            value={changelink.tiktok}
                        /> */}
                        <TouchableOpacity onPress={handelsavechangelinks} style={{ marginHorizontal: 130, backgroundColor: maincolor, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", alignSelf: 'center', top: 8 }}>{language.save}</Text>
                        </TouchableOpacity>
                    </View>
                }

            </RBSheet >

            <RBSheet
                ref={lan}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={170}
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
                {/* ----------------------- */}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => handelfr()}>
                        <Text style={[lang.lang == "Français" ? { color: maincolor } : { color: textcoler }, { fontSize: 20 }]}>Français</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => handeleng()}>
                        <Text style={[lang.lang == "English" ? { color: maincolor } : { color: textcoler }, { fontSize: 20 }]}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handelarbic()}>
                        <Text style={[lang.lang == "Arabic" ? { color: maincolor } : { color: textcoler }, { fontSize: 20 }]}>العربية</Text>
                    </TouchableOpacity>
                </View>
                {/* -------------------------------- */}
            </RBSheet >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                style={{ backgroundColor: maincolor }}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View style={styles.centeredViewdelete}>
                    <View style={[styles.modalViewdelete, { backgroundColor: mode }]}>
                        <Text style={{ fontSize: 25, color: maincolor }}>{language.are_u_sure}</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 45 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={handelyesdelete}>
                                <View style={{ backgroundColor: '#00A300', marginRight: 70, width: 60, height: 40, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 25, color: 'white', alignSelf: "center" }}>{language.yes}</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal(!modal)}>
                                <View style={{ backgroundColor: '#A30000', height: 40, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 25, color: 'white', alignSelf: "center" }}>{language.close}</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    )
}

export default SettingPage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        // backgroundColor: '#ECF1FE',
        padding: 10,
    },
    centeredView: {
        flex: 1,
        top: 2,
        left: 110,
        //justifyContent: "flex-start",
        alignItems: 'center',
        marginTop: 50
    },
    modalView: {
        // margin: 20,
        borderRadius: 10,
        //padding: 35,
        // alignItems: "flex-start",
        width: 160,
        height: 120,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredViewdelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewdelete: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: 300,
        height: 150,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconPContainer: {
        //width: 65,
        // height: 50,
        // borderRadius: 150,
        //justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "white",
        marginStart: 340,

    },
    iconMContainer: {
        //width: 65,
        //height: 50,
        // borderRadius: 150,
        //justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "white",
        marginStart: 300,

    },
})