import store from '../components/Store';
import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable, Button, Alert, Modal, ImagePickerIOS } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { launchImageLibrary } from 'react-native-image-picker';
import Client from '../api/Client';


function RegisterScreen({ navigation }) {
    const refRBSheet = useRef();
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
    const handleregisterclub = () => {
        navigation.navigate('RegisterClub');
    }
    const handleBack = () => {
        navigation.navigate('Login');
    }

    const [email, setemail] = store.useState("email");
    const alertmsg = (msg) => {
        Alert.alert('error', msg)

    }
    const [addAlbum, setaddAlbum] = useState({
        group_name: 'test0',
        email: '',
    })
    const handelsaveAlbum = async () => {
        addAlbum.email = RegisterInfo.email
        await Client.post("/creategroup", addAlbum).then(function (res) {
            if (res.data.type == 'error') {
                setaddAlbum(initialState)
            } else {
                setaddAlbum(initialState)
            }
        }).catch(function (e) {
            console.log("error from save album", e)
        })
    }
    const resgister = async () => {
        await Client.post('/inscription_club', RegisterInfo)
            .then(function (res) {
                if (res.data.type == 'error') {
                    alertmsg(res.data.msg)
                } else {
                    handelsaveAlbum()
                    navigation.navigate('Sign Up');
                }

            })
    }


    const [RegisterInfo, setRegisterInfo] = useState({
        nom: '',
        email: '',
        mot_de_passe: '',
        email_contact: '',
        image: '',
        ville: '',
        tele: '',
        signe: '',
        nom_universite: '',
    });
    console.log(RegisterInfo)
    const validate = () => {
        if (RegisterInfo.nom.length == 0) {
            alertmsg('check your name')
            return false
        } else if (RegisterInfo.tele.length == 0) {
            alertmsg('Check your phone')
            return false
        } else if (RegisterInfo.ville.length == 0) {
            alertmsg('Check your ville')
            return false
        } else if (RegisterInfo.signe.length == 0) {
            alertmsg('Check your signe')
            return false
        } else if (RegisterInfo.nom_universite.length == 0) {
            alertmsg('Check your nom_universite')
            return false
        } else if (RegisterInfo.email.length < 12 || RegisterInfo.email.search('@') == -1) {
            alertmsg('Check your email')
            return false
        } else if (RegisterInfo.mot_de_passe.length == 0) {
            alertmsg('Check your Password')
            return false

        } else if (imgg.length == 0) {
            alertmsg('Import profile picture')
            return false
        } else {
            return true
        }
    }


    const handleNext = async () => {
        const formData = new FormData()
        formData.append('file', { uri: imgg, type: 'image/jpeg', name: 'image.jpg' })
        valid = validate()
        if (valid == true) {
            await Client.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (res) {
                let path = res.data.file.path
                RegisterInfo.image = path
                email.email = RegisterInfo.email
                RegisterInfo.email_contact = RegisterInfo.email
                resgister()
            }).catch(function (e) {
                console.log('err bcz prfl img', e)
            })
        }
    }
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [inputS, setinputS] = store.useState("inputS");
    const [modalVisible, setModalVisible] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [img, setimg] = store.useState("img");
    const [imgg, setimgg] = useState('')
    const [albumS, setalbumS] = store.useState("albumS")
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

    const handelModal = () => {
        if (modalVisible == false) {
            setModalVisible(true)
        } else {
            setModalVisible(false)
        }

    };
    const handelUploadImg = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            // includeBase64: true,
        };

        launchImageLibrary(options, res => {
            if (!res.didCancel) {
                setimgg(res.assets[0].uri)
                console.log("img ok", res.assets[0].uri)
            }

        })
    }
    const handleThemeChange = () => {
        setmode(mode == "#ffffff" ? "#242526" : "#ffffff");
        settextcoler(textcoler == "#242526" ? "#ffffff" : "#242526");
        setSun(Moons == 'brightness-high' ? 'brightness-2' : 'brightness-high');
        setinputS(inputS == '#f2f2f2' ? '#343434' : '#f2f2f2');
        setalbumS(albumS == '#DEDEDE' ? '#6B6B6B' : '#DEDEDE')
    };
    const handelMaincolor = (main) => {
        setmaincolor(main)
        setModalVisible(false)
    }
    const [isFocus, setisFocus] = useState(false);
    const [isFocusT, setisFocusT] = useState(false);
    const [isFocusN, setisFocusN] = useState(false);
    const [isFocusE, setisFocusE] = useState(false);
    const [isFocusU, setisFocusU] = useState(false);
    const [isFocusS, setisFocusS] = useState(false);
    const [isFocusName, setisFocusName] = useState(false)
    const handleregisteruser = () => {
        navigation.navigate('Sign-Up');
    }
    return (

        <SafeAreaView style={[styles.container, { backgroundColor: mode }]}>

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
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <MaterialIcons name='language' size={25} color='#8e8e8f' style={{ top: -28, left: 90 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleThemeChange}>
                <View style={styles.iconMContainer}>
                    <MaterialIcons name={Moons} size={26} color='#8e8e8f'
                        style={{
                            top: -55

                        }}
                    />
                </View>
            </TouchableOpacity>




            <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: row }}>
                    <Text style={[styles.textLoginStyle, { color: maincolor }]}>{language.reg_title}{"\n"}</Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: textcoler
                    }}>{language.club}</Text>
                </View>
                <View style={{ marginVertical: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={[styles.inputName, { borderColor: isFocusN ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                            onFocus={() => {
                                setisFocusN(true)
                            }}
                            onBlur={() => {
                                setisFocusN(false)
                            }}
                            placeholder={language.email}
                            value={RegisterInfo.email}
                            onChangeText={val => {
                                setRegisterInfo({ ...RegisterInfo, email: val });
                            }}
                        />
                        <TextInput
                            style={[styles.inputTag, { borderColor: isFocusT ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                            onFocus={() => {
                                setisFocusT(true)
                            }}
                            onBlur={() => {
                                setisFocusT(false)
                            }}
                            placeholder={language.tlf}
                            value={RegisterInfo.tele}
                            onChangeText={val => {
                                setRegisterInfo({ ...RegisterInfo, tele: val });
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <TextInput
                            style={[styles.inputName, { borderColor: isFocusU ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                            onFocus={() => {
                                setisFocusU(true)
                            }}
                            onBlur={() => {
                                setisFocusU(false)
                            }}
                            placeholder={language.u_name}
                            value={RegisterInfo.nom_universite}
                            onChangeText={val => {
                                setRegisterInfo({ ...RegisterInfo, nom_universite: val });
                            }}
                        />
                        <TextInput
                            style={[styles.inputTag, { borderColor: isFocusS ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                            onFocus={() => {
                                setisFocusS(true)
                            }}
                            onBlur={() => {
                                setisFocusS(false)
                            }}
                            placeholder={language.sign}
                            value={RegisterInfo.signe}
                            onChangeText={val => {
                                setRegisterInfo({ ...RegisterInfo, signe: val });
                            }}
                        />




                    </View>
                    <TextInput
                        style={[styles.input, { borderColor: isFocusE ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusE(true)
                        }}
                        onBlur={() => {
                            setisFocusE(false)
                        }}
                        placeholder={language.city}
                        value={RegisterInfo.ville}
                        onChangeText={val => {
                            setRegisterInfo({ ...RegisterInfo, ville: val });
                        }}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: isFocusName ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusName(true)
                        }}
                        onBlur={() => {
                            setisFocusName(false)
                        }}
                        placeholder={language.c_name}
                        value={RegisterInfo.nom}
                        onChangeText={val => {
                            setRegisterInfo({ ...RegisterInfo, nom: val });
                        }}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: isFocus ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocus(true)
                        }}
                        onBlur={() => {
                            setisFocus(false)
                        }}
                        placeholder={language.password}
                        value={RegisterInfo.mot_de_passe}
                        onChangeText={val => {
                            setRegisterInfo({ ...RegisterInfo, mot_de_passe: val });
                        }}
                    />
                    <View style={{ flexDirection: row }}>
                        <Text style={{ color: textcoler }}>{language.reg_import}</Text>
                        {/* {"\t"} */}
                        <TouchableOpacity onPress={handelUploadImg} style={{ marginHorizontal: 10 }}>
                            <FontAwesome name='upload' size={20} color={textcoler} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.button, { backgroundColor: maincolor }]} onPress={handleNext}>
                        <Text style={[styles.buttontext, { color: mode }]}>{language.next}</Text>
                        <View style={styles.iconContainer}>
                            <Entypo name='controller-play'
                                color={mode}
                                size={21}
                                style={
                                    styles.logoStyleEnter

                                }
                            />
                        </View>
                    </TouchableOpacity>



                </View>
                <View style={{ flexDirection: row, marginBottom: 20 }}>
                    <Text style={{ color: textcoler }}>{language.reg_have}</Text>
                    <Pressable onPress={handleBack}>
                        <Text style={{ color: maincolor, marginLeft: 10, marginHorizontal: 10 }}>{language.back}</Text>
                    </Pressable>

                </View>
                <View style={{ flexDirection: row }}>
                    <Text style={{ color: textcoler }}>{language.reg_user}</Text>
                    <Pressable onPress={handleregisteruser}>
                        <Text style={{ color: maincolor, marginLeft: 10, marginHorizontal: 10 }}>{language.login_Register}</Text>
                    </Pressable>
                </View>
            </View>
            <RBSheet
                ref={refRBSheet}
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

        </SafeAreaView >


    )
}
const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        top: 2,
        left: 110,
        // justifyContent: "flex-start",
        alignItems: "center",
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
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ECF1FE',
        padding: 10,

    },
    textLoginStyle: {

        fontSize: 20,
        fontWeight: 'bold'

    },
    textStyle: {
        color: 'grey',
        fontSize: 18,
        marginVertical: 10,

    },
    input: {
        height: 40,
        width: 330,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    inputName: {
        height: 40,
        width: 220,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    inputTag: {
        right: 12,
        height: 40,
        width: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        width: 135,
        height: 40,
        borderRadius: 200,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 18,
        marginLeft: 108,
        marginVertical: 20,
        marginBottom: 50,
        alignContent: 'center'

    },
    buttontext: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
        margin: -5,
        marginTop: -13,

    },
    logoStyleEnter: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        right: 10,
        top: -2



    },
    iconContainer: {
        //width: 65,
        // height: 50,
        // borderRadius: 150,
        //justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "white",
        marginRight: -30,
        marginLeft: 25
    },

    iconPContainer: {
        //width: 65,
        // height: 50,
        // borderRadius: 150,
        //justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "white",
        marginStart: 320,

    },
    iconMContainer: {
        //width: 65,
        //height: 50,
        // borderRadius: 150,
        //justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "white",
        marginStart: 250,

    },
});
export default RegisterScreen