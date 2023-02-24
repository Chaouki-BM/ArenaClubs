import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert, Modal, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
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
const SettingPage = () => {
    const refRBSheet = useRef();
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [modalVisible, setModalVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [email, setemail] = store.useState("email");

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
            imageup.path = path
            imageup.email = email.email

            postimg()
        }).catch(function (e) {
            console.log('err bcz update prfl img', e)
            Alert.alert('Import your image again')
        })
    }
    const [imageup, setimageup] = useState({
        path: '',
        email: '',
    })
    const postimg = async () => {
        await Client.post("/Upimage", imageup)
            .then(function (res) {
                Alert.alert('success')
            }).catch(function (e) {
                console.log('error postimg', e)
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

    const [pict, setpict] = useState({ pict: '' });
    const handelDeleteCouverture = () => {
        setModal(true)
        setvisible('')
    }
    const handelEditLinks = () => {
        refRBSheet.current.open()
        setvisible('editlikns')
    }
    const handelAddAlbum = () => {
        refRBSheet.current.open()
        setvisible('')
    }
    const handelContactUs = () => {
        refRBSheet.current.open()
        setvisible('')
    }
    const handelLogOut = () => {
        refRBSheet.current.open()
        setvisible('')
    }
    const handelchangeBio = () => {
        refRBSheet.current.open()
        setvisible('changeBio')
    }
    const handelchangedata = () => {
        refRBSheet.current.open()
        setvisible('changedata')
    }
    const [changepassword, setchangepassword] = useState({
        password: '',
        password1: '',
        password2: '',
        email: '',
    });
    const [deletevar, setdeletevar] = useState({
        path: '',
        email: '',
    })
    const handelyesdelete = async () => {
        setModal(!modal)
        deletevar.email = email.email
        await Client.post("/Upcouverture", deletevar)
            .then(function (res) {
                if (res.data.msg == 'suuu') {
                    Alert.alert('success')
                }
            }).catch(function (e) {
                console.log('error from delete  cover', e)

            })
    }
    const initialState = {

    };
    const handelsavechange = async () => {
        changepassword.email = email.email
        console.log(changepassword)
        await Client.post("/changepassword", changepassword).then(function (res) {
            console.log(res.data)
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
        tag: '',
        email: '',

    })
    const handelsavechangename = async () => {
        changename.email = email.email
        await Client.post("/changename", changename).then(function (res) {
            if (res.data.type == 'success') {
                Alert.alert('success', res.data.msg)
                setchangename(initialState)
            } else if (res.data.type == 'info') {
                Alert.alert('info', res.data.msg)
            } else {
                Alert.alert('error', res.data.msg)
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
        await Client.post("/modify_bio", changeBio).then(function (res) {
            if (res.data.type == 'success') {
                Alert.alert('success', res.data.msg)
                setchangename(initialState)
            } else {
                Alert.alert('error', res.data.msg)
                setchangename(initialState)
            }
        }).catch(function (e) {
            console.log("error from change Bio", e)
        })
    }
    const [changeData, setchangeData] = useState({
        tel: '',
        birthday: '',
        adress: '',
        email: '',
    })
    const handelsaveData = async () => {
        changeData.email = email.email
        await Client.post("/modify", changeData).then(function (res) {
            if (res.data.type == 'success') {
                Alert.alert('success', res.data.msg)
                setchangeData(initialState)
            } else {
                Alert.alert('error', res.data.msg)
                setchangeData(initialState)
            }
        }).catch(function (e) {
            console.log("error from save data (tel,add,birth)", e)
        })
    }
    const [changelink, setchangelink] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        snapchat: '',
        tiktok: '',
        email: '',
    })
    const handelsavechangelinks = async () => {
        changelink.email = email.email
        await Client.post("/changelinks", changelink).then(function (res) {
            if (res.data.type == 'success') {
                Alert.alert('success', res.data.msg)
                setchangelink(initialState)
            } else {
                Alert.alert('error', res.data.msg)
                setchangelink(initialState)
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
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 name='wrench' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20, marginRight: 100 }}>General Account</Text>
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
                                <View style={{ flexDirection: 'row' }}>

                                    <MaterialIcons name='security' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Change password</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangeName()}>
                                <View style={{ flexDirection: 'row' }}>

                                    <FontAwesome name='user' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Change Name & Tag</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangeBio()}>
                                <View style={{ flexDirection: 'row' }}>
                                    < FontAwesome name='pencil' size={23} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Update Bio</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangedata()}>
                                <View style={{ flexDirection: 'row' }}>
                                    < FontAwesome name='pencil' size={23} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Update cobbler profile</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelchangePicture()}>
                                <View style={{ flexDirection: 'row' }}>

                                    < FontAwesome5 name='images' size={23} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Update profile picture</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, marginLeft: 25 }} onPress={() => handelDeleteCouverture()}>
                                <View style={{ flexDirection: 'row' }}>

                                    < FontAwesome5 name='trash' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Delete couverture picture</Text>
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
                        <View style={{ flexDirection: 'row' }}>

                            <Feather name='link' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Edit my links</Text>
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
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelAddAlbum()}>
                        <View style={{ flexDirection: 'row' }}>

                            <Ionicons name='add' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Add album</Text>
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
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelContactUs()}>
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
                    />
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelLogOut}>
                        <View style={{ flexDirection: 'row' }}>

                            <Entypo name='log-out' size={25} color={maincolor} style={{ marginRight: 20 }} />
                            <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Log-out</Text>
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
                        <Text style={{ marginHorizontal: 100, color: maincolor, fontSize: 18, marginVertical: 50 }}>Change password</Text>
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
                            placeholder="password"
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
                            placeholder="New password"
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
                            placeholder="New password"
                            onChangeText={val => {
                                setchangepassword({ ...changepassword, password2: val });
                            }}
                            value={changepassword.password2}
                        />
                        <TouchableOpacity onPress={handelsavechange} style={{ marginHorizontal: 130, backgroundColor: maincolor, width: 100, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", marginHorizontal: 9, marginVertical: 9 }}>Save change</Text>
                        </TouchableOpacity>
                    </View>}
                {/* ------------------------Change-name------------------------------ */}
                {visible == 'changename' &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ marginHorizontal: 90, color: maincolor, fontSize: 18, marginVertical: 50 }}>Change Name and Tag</Text>
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
                            placeholder="Name"
                            onChangeText={val => {
                                setchangename({ ...changename, name: val });
                            }}
                            value={changename.name}
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
                            placeholder="#Tag"
                            onChangeText={val => {
                                setchangename({ ...changename, tag: val });
                            }}
                            value={changename.tag}
                        />

                        <TouchableOpacity onPress={handelsavechangename} style={{ marginHorizontal: 130, backgroundColor: maincolor, width: 100, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", marginHorizontal: 9, marginVertical: 9 }}>Save change</Text>
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
                {visible == 'changedata' &&
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
                    </View>}

                {/* ----------------------links------------------------ */}
                {visible == 'editlikns' &&
                    <View style={{ padding: 10 }}>
                        <Text style={{ marginHorizontal: 150, color: maincolor, fontSize: 18, marginVertical: 50 }}>Edit likns</Text>
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
                            placeholder="Facebook link"
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
                            placeholder="Instagram link"
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
                            placeholder="Twitter link"
                            onChangeText={val => {
                                setchangelink({ ...changelink, twitter: val });
                            }}
                            value={changelink.twitter}
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
                            placeholder="Snapchat link"
                            onChangeText={val => {
                                setchangelink({ ...changelink, snapchat: val });
                            }}
                            value={changelink.snapchat}
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
                            placeholder="Tiktok link"
                            onChangeText={val => {
                                setchangelink({ ...changelink, tiktok: val });
                            }}
                            value={changelink.tiktok}
                        />
                        <TouchableOpacity onPress={handelsavechangelinks} style={{ marginHorizontal: 130, backgroundColor: maincolor, width: 100, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", marginHorizontal: 9, marginVertical: 9 }}>Save change</Text>
                        </TouchableOpacity>
                    </View>}
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
                        <Text style={{ fontSize: 25, color: maincolor }}>Are you sure!</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 45 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={handelyesdelete}>
                                <View style={{ backgroundColor: '#00A300', marginRight: 70, width: 60, height: 40, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 25, color: 'white', left: 7 }}>Yes</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModal(!modal)}>
                                <View style={{ backgroundColor: '#A30000', width: 60, height: 40, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 25, color: 'white', left: 13 }}>No</Text>
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