import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import store from '../../components/Store'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";
import Client from '../../api/Client'
import { Linking, } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Ip from '../../api/Ip'
import UserBarProfil from './UserBarProfil'
const UserHome = () => {

    const refRBSheet = useRef();
    useEffect(() => {
        laodData_User()
        laodDataUser()
    }, []);
    const [loaddata, setloaddata] = store.useState('loaddata')
    const laodData_User = async () => {
        await Client.post("/getuser", email)
            .then(function (res) {
                setloaddata(res.data.user);
            }).catch(function (e) {
                console.log("error from load data_user", e);
            })
    }
    const [Data, setData] = useState([])
    const laodDataUser = async () => {
        await Client.post("/getprofil", email)
            .then(function (res) {
                setData(res.data.res);
            }).catch(function (e) {
                console.log("error from load data user", e);
            })
    }
    const [img, setimg] = store.useState("img");
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [modalVisible, setModalVisible] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [email, setemail] = store.useState("email");
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
    let image = { uri: `${Ip}${loaddata.image}` };
    const [row, setrow] = store.useState("dir")
    const [language, setlanguage] = store.useState("language")
    const handelseemore = () => {
        refRBSheet.current.open()
    }
    const handellinkfacebook = () => {
        if (Data.facebook != "") {
            Linking.openURL(Data.facebook)
        }

    }
    const handellinkinstagram = () => {
        if (Data.instagram != "") {
            Linking.openURL(Data.instagram)
        }
    }
    const handellinktwitter = () => {
        if (Data.twitter != "") {
            Linking.openURL(Data.twitter)
        }
    }
    const handellinkLinkedin = () => {
        if (Data.twitter != "") {
            Linking.openURL(Data.linkedin)
        }
    }
    // const qrrr = () => {
    //     let i = 0; let ch2 = ''
    //     for (let t of loaddata.email_contact) {
    //         if (loaddata.email_contact[i] == '.') { ch2 = ch2 + ' . ' }
    //         else { ch2 = ch2 + loaddata.email_contact[i] }
    //         i++
    //     }
    //     return ch2
    // }
    var qrcode = `${loaddata.nom}` + "\n" + `${loaddata.ville}`
        + "\n" + `${loaddata.email_contact}` + "\n" + `${loaddata.tele}`
    const [Friends, setFriends] = store.useState("Friends")
    const [followers, setfollowers] = store.useState("followers")
    return (

        <View style={[styles.container, { backgroundColor: mode }]}>
            {/* --------------------------------- */}
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

                style={styles.ViewStyle}>
                <View style={{ flexDirection: "row" }}>
                    <Avatar
                        rounded
                        size={100}
                        //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                        overlayContainerStyle={{ backgroundColor: 'gray' }}
                        //onPress={() => console.log("Works!")}
                        containerStyle={{ alignSelf: "flex-start" }}
                        source={image}
                    />
                    <View  >
                        <Text style={{ marginRight: 10, fontSize: 22, color: textcoler, fontWeight: 'bold', marginBottom: 10, marginStart: 50 }}>{loaddata.nom}</Text>


                        {/* --------------------------------------- */}
                        <View style={{ flexDirection: row, marginBottom: 10, marginHorizontal: 50 }}>
                            <View style={{ flexDirection: row }}>
                                <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginEnd: 35 }}>{language.friends} :</Text>
                                <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginEnd: 30 }}>{Friends.length}</Text>
                            </View>
                            <View style={{ flexDirection: row }}>
                                <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginEnd: 20 }}>{language.following} :</Text>
                                <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginEnd: 30 }}>{followers.length}</Text>
                            </View>
                        </View>

                        <Text style={{ width: 220, color: textcoler, marginStart: 50 }}>{Data.bio}</Text>


                    </View>
                </View>


                <View style={{ marginLeft: 10 }}>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginRight: 100, }}>nb_following</Text>
                        <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic' }}>data.nb_followers</Text>

                    </View> */}



                    <Pressable onPress={handelseemore}>
                        <Text style={{ fontSize: 13, color: '#8e8e8f', marginEnd: 20 }}>{language.see_more} ...</Text>
                    </Pressable>
                </View>
                {/* --------------------------------------------- */}

                <UserBarProfil />
            </ScrollView >
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={330}
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
                <View style={{ padding: 20, }}>
                    <View style={{ alignSelf: 'center' }}>
                        <QRCode
                            value={qrcode}
                            size={150}
                            color={maincolor}
                            backgroundColor={mode}
                            ecl='Q'
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 40 }}>
                        <TouchableOpacity onPress={handellinkfacebook}>
                            <Entypo name='facebook' size={23} color={maincolor} style={{ margin: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinkinstagram}>
                            <Entypo name='instagram' size={23} color={maincolor} style={{ margin: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinktwitter}>
                            <Entypo name='twitter' size={23} color={maincolor} style={{ margin: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinkLinkedin}>
                            <AntDesign name='linkedin-square' size={23} color={maincolor} style={{ margin: 10 }} />
                        </TouchableOpacity>
                    </View>

                </View>
            </RBSheet>
        </View>
    )
}

export default UserHome

const styles = StyleSheet.create({
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
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        // backgroundColor: '#ECF1FE',
        padding: 10,

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


    ViewStyle: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        //flex: 1
        //padding: 10,
    },
    cover: {
        flex: 1,
        //justifyContent: 'center',
        width: '100%',
        height: '700%',

    },


})