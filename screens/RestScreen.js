import store from '../components/Store';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Client from '../api/Client';
function RestScreen({ navigation }) {
    const [email, setemail] = store.useState("email");
    const handleBack = () => {
        navigation.navigate('Login');
    }

    const [ResetInfo, setResetInfo] = useState({
        verif_code: '',
        password1: '',
        password2: '',
        email: ''
    });
    const alertmsg = (msg) => {
        Alert.alert('error', msg)

    }
    const handleSave = async () => {
        ResetInfo.email = email.email
        await Client.post('/savepassword', ResetInfo)
            .then(function (res) {
                if (res.data.type == 'error') {
                    alertmsg(res.data.msg)
                } else if (res.data.type == 'info') {
                    alertmsg(res.data.msg)
                } else {
                    navigation.navigate('Login');
                }
            }).catch(function (e) {
                console.log('handelsave error', e)
            })

    }

    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [inputS, setinputS] = store.useState("inputS");
    const [modalVisible, setModalVisible] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
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
    const [isFocusC, setisFocusC] = useState(false);
    const [isFocusNP, setisFocusNP] = useState(false);
    const [isFocusP, setisFocusP] = useState(false);

    return (

        <SafeAreaView style={[styles.container, { backgroundColor: mode }]}>

            <TouchableOpacity onPress={handelModal}>
                <View style={styles.iconPContainer} >
                    <Ionicons name="color-palette-sharp" size={27}
                        color={textcoler}
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
                    <MaterialIcons name={Moons} size={26} color={textcoler}
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
                            style={[styles.inputTag, { borderColor: isFocusC ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                            onFocus={() => {
                                setisFocusC(true)
                            }}
                            onBlur={() => {
                                setisFocusC(false)
                            }}
                            placeholder="Enter code "

                            onChangeText={val => {
                                setResetInfo({ ...ResetInfo, verif_code: val });
                            }}
                            value={ResetInfo.verif_code}

                        />
                        <Text style={{ color: textcoler, top: 15 }}  >Please check your email we sent{"\n"}your code ( 6 numbers )</Text>

                    </View>
                    <TextInput
                        style={[styles.input, { borderColor: isFocusP ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusP(true)
                        }}
                        onBlur={() => {
                            setisFocusP(false)
                        }}
                        placeholder="Password"
                        value={ResetInfo.password1}
                        onChangeText={val => {
                            setResetInfo({ ...ResetInfo, password1: val });
                        }}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: isFocusNP ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusNP(true)
                        }}
                        onBlur={() => {
                            setisFocusNP(false)
                        }}
                        placeholder="Confirm password"
                        value={ResetInfo.password2}
                        onChangeText={val => {
                            setResetInfo({ ...ResetInfo, password2: val });
                        }}
                    />


                    <TouchableOpacity style={[styles.button, { backgroundColor: maincolor }]} onPress={handleSave}>
                        <Text style={[styles.buttontext, { color: mode }]}>Save</Text>
                        <View style={styles.iconContainer}>
                            <AntDesign name='checkcircle'
                                color={mode}
                                size={20}
                                style={
                                    styles.logoStyleEnter

                                }
                            />
                        </View>
                    </TouchableOpacity>



                </View>
                <View style={{ marginTop: 35 }}>
                    <Text style={{ color: textcoler }}>Cancel?
                        <Pressable onPress={handleBack}>
                            <Text style={{ color: maincolor, right: -5, top: 4 }}>Back</Text>
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
        top: 50,
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
        right: 0,
        height: 40,
        width: 120,
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

export default RestScreen