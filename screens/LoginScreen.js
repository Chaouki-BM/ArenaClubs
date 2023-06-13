import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import store from '../components/Store';
import Client from '../api/Client';
import RBSheet from "react-native-raw-bottom-sheet";

function Login({ navigation }) {
    const refRBSheet = useRef();
    const [log, setlog] = store.useState("log")
    const [lang, setlang] = store.useState("lang")
    const [language, setlanguage] = store.useState("language")
    const changelang = async () => {

        await Client.post('/get_language', lang).then(function (res) {
            setlanguage(res.data.My_language)
            console.log(res.data.My_language);
        }).catch(function () {
            console.log("error from get long login")
        })
    }
    useEffect(() => {
        changelang()


    }, [])
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
    const alertmsg = (msg) => {
        Alert.alert(language.error, msg)

    }
    // const sendcode = async (msgg) => {
    //     let email = loginInfo.email
    //     let body = { email, msgg }
    //     console.log(body)
    //     await Client.post('/sendCode', body).then(function (res) {

    //     }).catch(function (e) {
    //         console.log('sendcode error', e)
    //     })

    // }
    const handlereset = async () => {
        await Client.post('/emailexist', loginInfo)
            .then(function (res) {
                if (res.data.type == 'error') {
                    alertmsg(res.data.msg)
                } else if (res.data.type == 'info') {
                    email.email = loginInfo.email
                    navigation.navigate('Reset');
                }
            }).catch(function (e) {
                console.log('emailexiste error', e)
            })
    }
    const handlergister = () => {

        navigation.navigate('Sign-Up');
    }
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const [email, setemail] = store.useState("email");
    const [whoareyou, setwhoareyou] = store.useState("whoareyou")
    const handleLogin = async () => {
        await Client.post('/login', loginInfo)
            .then(function (res) {
                if (res.data.type == 'error') {
                    if (res.data.msg == "acc_disactive") {
                        alertmsg(language.desactive_acc)
                    } else if (res.data.msg == "erreur_p") {
                        alertmsg(language.errpass)
                    } else if (res.data.msg == "erreur_e") {
                        alertmsg(language.erremail)
                    }

                } else if (res.data.type == 'info') {
                    email.email = loginInfo.email
                    //alertmsg(res.data.msg)
                    navigation.navigate('Sign Up');
                } else if (res.data.type == 'success') {
                    setlog(true)
                    email.email = loginInfo.email
                    setLoginInfo(initialState)
                    if (res.data.login == 'club') {
                        setwhoareyou("club")
                        navigation.replace('TabNavigation');


                    } else {
                        setwhoareyou("user")
                        navigation.replace('UserTabBottom')


                    }
                }
            }).catch(function (e) {
                console.log(e)
            })

    }
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [inputS, setinputS] = store.useState("inputS");
    const [modalVisible, setModalVisible] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [albumS, setalbumS] = store.useState("albumS")

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
        setalbumS(albumS == '#DEDEDE' ? '#6B6B6B' : '#DEDEDE')
    };
    const handelMaincolor = (main) => {
        setmaincolor(main)
        setModalVisible(false)
    }
    const [isFocus, setisFocus] = useState(false);
    const [isFocusM, setisFocusM] = useState(false);

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

            <View style={{ paddingTop: 80, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: row }}>
                    <Text style={[styles.textLoginStyle, { color: maincolor }]}>Arean Clubs {"\n"}</Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: textcoler
                    }}>{language.login_title}</Text>
                </View>

                <View style={{ marginVertical: 20 }}>
                    <TextInput
                        style={[styles.input, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusM(true)
                        }}
                        onBlur={() => {
                            setisFocusM(false)
                        }}
                        placeholder={language.email}
                        onChangeText={val => {
                            setLoginInfo({ ...loginInfo, email: val });
                        }}
                        value={loginInfo.email}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: isFocus ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocus(true)
                        }}
                        onBlur={() => {
                            setisFocus(false)
                        }}
                        secureTextEntry={true}
                        placeholder={language.password}
                        value={loginInfo.password}
                        onChangeText={val => {
                            setLoginInfo({ ...loginInfo, password: val });
                        }}
                    />
                    <TouchableOpacity style={[styles.button, { backgroundColor: maincolor }]} onPress={handleLogin}>
                        <Text style={[styles.buttontext, { color: mode }]}>{language.login_button}</Text>
                        <View style={styles.iconContainer}>
                            <Ionicons name='enter-outline'
                                color={mode}
                                size={22}
                                style={
                                    styles.logoStyleEnter

                                }
                            />
                            {/* <Image
                                style={styles.logoStyleEnter}
                                source={require('../assets/Enter_52px.png')}


                            /> */}
                        </View>
                    </TouchableOpacity>



                </View>
                <View >
                    <View style={{ flexDirection: row, marginBottom: 20 }}>
                        <Text style={{ color: textcoler, }}>{language.login_Forgot}</Text>

                        <Pressable onPress={handlereset}>
                            <Text style={{ color: maincolor, marginHorizontal: 10 }}>{language.login_Reset}</Text>
                        </Pressable>
                        {/* {"\n"} */}
                    </View>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ color: textcoler, }}>{language.login_Dont_have}</Text>
                        <Pressable onPress={handlergister}>
                            <Text style={{ color: maincolor, marginHorizontal: 10 }}>{language.login_Register}</Text>
                        </Pressable>
                    </View>
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
        marginBottom: 80,
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
        right: 15,
        top: -4



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
export default Login