import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert, Modal } from 'react-native'
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
const SettingPage = () => {
    const refRBSheet = useRef();
    const [img, setimg] = store.useState("img");
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [modalVisible, setModalVisible] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
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
    const handelchangePassword = () => {
        refRBSheet.current.open()
    }
    const handelchangeName = () => {
        refRBSheet.current.open()
    }
    const handelchangePicture = () => {
        refRBSheet.current.open()
    }
    const handelDeleteCouverture = () => {
        refRBSheet.current.open()
    }
    const handelEditLinks = () => {
        refRBSheet.current.open()
    }
    const handelAddAlbum = () => {
        refRBSheet.current.open()
    }
    const handelContactUs = () => {
        refRBSheet.current.open()
    }
    const handelLogOut = () => {
        refRBSheet.current.open()
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
                        <View>
                            <View
                                style={{
                                    borderBottomColor: maincolor,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    width: 380,
                                    height: 12,
                                    marginBottom: 10,

                                }}
                            />
                            <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelchangePassword()}>
                                <View style={{ flexDirection: 'row' }}>

                                    <MaterialIcons name='security' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Change password</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelchangeName()}>
                                <View style={{ flexDirection: 'row' }}>

                                    <FontAwesome name='user' size={25} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Change Name & Tag</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelchangePicture()}>
                                <View style={{ flexDirection: 'row' }}>

                                    < FontAwesome5 name='images' size={23} color={maincolor} style={{ marginRight: 20 }} />
                                    <Text style={{ color: textcoler, fontFamily: 'bold', fontSize: 20 }}>Update profile picture</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelDeleteCouverture()}>
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
                    <TouchableOpacity style={{ marginBottom: 10, }} onPress={() => handelLogOut()}>
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
                height={500}
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
                <View style={{ padding: 10 }}>

                </View>
            </RBSheet>
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