import store from '../components/Store';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert, Modal, ImagePickerIOS } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { launchImageLibrary } from 'react-native-image-picker';
import Client from '../api/Client';
function RegisterScreen({ navigation }) {
    const handleBack = () => {
        navigation.navigate('Login');
    }
    const [RegisterInfo, setRegisterInfo] = useState({
        name: '',
        tag: '',
        email: '',
        password: '',
        image: '',
    });
    const [email, setemail] = store.useState("email");
    const alertmsg = (msg) => {
        Alert.alert('error', msg)

    }


    const resgister = async () => {
        await Client.post('/inscription', RegisterInfo)
            .then(function (res) {
                if (res.data.type == 'error') {
                    alertmsg(res.data.msg)
                } else {
                    navigation.navigate('Sign Up');
                }

            })
    }



    const validate = () => {
        if (RegisterInfo.name.length == 0) {
            alertmsg('check your name')
            return false
        } else if (RegisterInfo.tag.length <= 3 || RegisterInfo.tag.length > 5 || RegisterInfo.tag[0] != '#') {
            alertmsg('Check your tag')
            return false
        } else if (RegisterInfo.email.length < 12 || RegisterInfo.email.search('@') == -1) {
            alertmsg('Check your email')
            return false
        } else if (RegisterInfo.password.length == 0) {
            alertmsg('Check your Password')
            return false

        } else if (img.length == 0) {
            alertmsg('Import profile picture')
            return false
        } else {
            return true
        }
    }


    const handleNext = async () => {
        const formData = new FormData()
        formData.append('file', { uri: img, type: 'image/jpeg', name: 'image.jpg' })
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
    const [albumS, setalbumS] = store.useState("albumS")
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
                setimg(res.assets[0].uri)
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
                            placeholder="Name"
                            value={RegisterInfo.name}
                            onChangeText={val => {
                                setRegisterInfo({ ...RegisterInfo, name: val });
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
                            placeholder="#Tag"
                            value={RegisterInfo.tag}
                            onChangeText={val => {
                                setRegisterInfo({ ...RegisterInfo, tag: val });
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
                        placeholder="Email"
                        value={RegisterInfo.email}
                        onChangeText={val => {
                            setRegisterInfo({ ...RegisterInfo, email: val });
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
                        placeholder="password"
                        value={RegisterInfo.password}
                        onChangeText={val => {
                            setRegisterInfo({ ...RegisterInfo, password: val });
                        }}
                    />
                    <Text style={{ color: textcoler, left: 20 }}>import profile picture :
                        {"\t"}
                        <TouchableOpacity onPress={handelUploadImg}>
                            <FontAwesome name='upload' size={20} color={textcoler} />
                        </TouchableOpacity>
                    </Text>

                    <TouchableOpacity style={[styles.button, { backgroundColor: maincolor }]} onPress={handleNext}>
                        <Text style={[styles.buttontext, { color: mode }]}>Next</Text>
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
                <View style={{ marginTop: 35 }}>
                    <Text style={{ color: textcoler }}>Have an account?
                        <Pressable onPress={handleBack}>
                            <Text style={{ color: maincolor, left: 8, top: 4 }}>Back</Text>
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