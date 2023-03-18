import store from '../components/Store';
import React, { useState, useRef } from 'react'
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
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';
function RegisterScreen({ navigation }) {
    const refRBSheet = useRef();
    const handleBack = () => {
        navigation.navigate('Login');
    }
    const handleregisterclub = () => {
        navigation.navigate('RegisterClub');
    }

    const [RegisterInfo, setRegisterInfo] = useState({
        email: '',
        phone: '',
        birth: 'dd-mm-yyyy',
        city: '',
        name: '',
        password: '',
    });
    const [email, setemail] = store.useState("email");
    const alertmsg = (msg) => {
        Alert.alert('error', msg)

    }

    const [gender, setgender] = useState('')
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
    const [language, setlanguage] = store.useState("language")
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    console.log(RegisterInfo.birth)
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
    const [isFocusName, setisFocusName] = useState(false)

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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.textLoginStyle, { color: maincolor }]}>Sign-Up{"\n"}</Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: textcoler
                    }}>User</Text>
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
                            placeholder="Email"
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
                            placeholder="Phone"
                            value={RegisterInfo.phone}
                            onChangeText={val => {
                                setRegisterInfo({ ...RegisterInfo, phone: val });
                            }}
                        />
                    </View>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode="date"
                        fadeToColor={mode}
                        textColor={maincolor}
                        onConfirm={(date) => {
                            setOpen(false)
                            let dd = String(date.getDate()).padStart(2, '0');
                            let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
                            let yyyy = date.getFullYear();
                            let d = yyyy + "-" + mm + "-" + dd
                            setRegisterInfo({ birth: d })

                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ backgroundColor: inputS, width: 215, height: 39, borderRadius: 10, marginLeft: 13, marginBottom: 10, marginTop: 10 }}>
                            <Text onPress={() => setOpen(true)}
                                style={{ marginLeft: 20, marginTop: 8 }}
                            >{RegisterInfo.birth}
                            </Text>
                            <Fontisto name='date' size={20} color={maincolor} style={{ alignSelf: "flex-end", marginVertical: -20, marginRight: 10 }} />
                        </View>

                        <RadioButton.Group onValueChange={newValue => setgender(newValue)} value={gender} >
                            <View style={{ flexDirection: 'row', marginHorizontal: -15 }}>
                                <RadioButton.Item value="man" color={maincolor} />
                                <Ionicons name='ios-man' size={28} color={textcoler} style={{ top: 10, marginLeft: -20 }} />
                                <RadioButton.Item value="woman" color={maincolor} style={{ marginLeft: -20 }} />
                                <Ionicons name='woman' size={28} color={textcoler} style={{ top: 10, marginLeft: -20 }} />
                            </View>
                        </RadioButton.Group>

                    </View>
                    <TextInput
                        style={[styles.input, { borderColor: isFocusE ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusE(true)
                        }}
                        onBlur={() => {
                            setisFocusE(false)
                        }}
                        placeholder="City"
                        value={RegisterInfo.city}
                        onChangeText={val => {
                            setRegisterInfo({ ...RegisterInfo, city: val });
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
                        placeholder="Name"
                        value={RegisterInfo.name}
                        onChangeText={val => {
                            setRegisterInfo({ ...RegisterInfo, name: val });
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
                        placeholder="Password"
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
                <View style={{ marginTop: 0, flexDirection: 'row' }}>
                    <Text style={{ color: textcoler }}>Have an account?
                        <Pressable onPress={handleBack}>
                            <Text style={{ color: maincolor, marginLeft: 10, top: 4 }}>Back</Text>
                        </Pressable>
                    </Text>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row' }}>
                    <Text style={{ color: textcoler }}>Register as club?</Text>
                    <Pressable onPress={handleregisterclub}>
                        <Text style={{ color: maincolor, marginLeft: 10 }}>Register now</Text>
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
                    <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => setlanguage("Français")}>
                        <Text style={[language == "Français" ? { color: maincolor } : { color: textcoler }, { fontSize: 20 }]}>Français</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginBottom: 8 }} onPress={() => setlanguage("English")}>
                        <Text style={[language == "English" ? { color: maincolor } : { color: textcoler }, { fontSize: 20 }]}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setlanguage("Arab")}>
                        <Text style={[language == "Arab" ? { color: maincolor } : { color: textcoler }, { fontSize: 20 }]}>العربية</Text>
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