import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import store from '../components/Store';
import Client from '../api/Client';
function Login({ navigation }) {
    const [log, setlog] = store.useState("log")

    const initialState = {

    };
    const alertmsg = (msg) => {
        Alert.alert('error', msg)

    }
    const sendcode = async (msgg) => {
        let email = loginInfo.email
        let body = { email, msgg }
        console.log(body)
        await Client.post('/sendCode', body).then(function (res) {

        }).catch(function (e) {
            console.log('sendcode error', e)
        })

    }
    const handlereset = async () => {
        await Client.post('/emailexist', loginInfo)
            .then(function (res) {
                if (res.data.type == 'error') {
                    alertmsg(res.data.msg)
                } else if (res.data.type == 'info') {
                    email.email = loginInfo.email
                    sendcode('Reset password')
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

    const handleLogin = async () => {
        await Client.post('/login', loginInfo)
            .then(function (res) {
                if (res.data.type == 'error') {
                    alertmsg(res.data.msg)
                } else if (res.data.type == 'info') {
                    email.email = loginInfo.email
                    console.log('ee', email.email)
                    alertmsg(res.data.msg)
                    navigation.navigate('Sign Up');
                } else if (res.data.type == 'success') {
                    email.email = loginInfo.email
                    setLoginInfo(initialState)
                    navigation.navigate('TabNavigation');
                    setlog(true)
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
            <TouchableOpacity onPress={handleThemeChange}>
                <View style={styles.iconMContainer}>
                    <MaterialIcons name={Moons} size={26} color='#8e8e8f'
                        style={{
                            top: -30

                        }}
                    />
                </View>
            </TouchableOpacity>

            <View style={{ paddingTop: 80, paddingHorizontal: 20 }}>
                <Text style={[styles.textLoginStyle, { color: maincolor }]}>MYGCORD {"\n"}</Text>
                {/* <Text style={styles.textStyle}>GREAT TO HAVE YOU BACK!</Text> */}
                <View style={{ marginVertical: 20 }}>
                    <TextInput
                        style={[styles.input, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusM(true)
                        }}
                        onBlur={() => {
                            setisFocusM(false)
                        }}
                        placeholder="Email"
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
                        placeholder="password"
                        value={loginInfo.password}
                        onChangeText={val => {
                            setLoginInfo({ ...loginInfo, password: val });
                        }}
                    />
                    <TouchableOpacity style={[styles.button, { backgroundColor: maincolor }]} onPress={handleLogin}>
                        <Text style={[styles.buttontext, { color: mode }]}>login</Text>
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
                <View style={{ marginTop: 35 }}>
                    <Text style={{ color: textcoler }}>Forget password?
                        <Pressable onPress={handlereset}>
                            <Text style={{ color: maincolor, left: 8, top: 4 }}>Reset</Text>
                        </Pressable>
                        {"\n"}
                    </Text>

                    <Text style={{ color: textcoler }}>Don't have an account?
                        <Pressable onPress={handlergister}>
                            <Text style={{ color: maincolor, left: 10, top: 4 }}>Register now</Text>
                        </Pressable>
                    </Text>
                </View>

            </View>

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