import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native'
import store from '../components/Store';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Avatar } from 'react-native-elements';
import TabBarProfil from '../Navigations/TabBarProfil';
import RBSheet from "react-native-raw-bottom-sheet";
import Client from '../api/Client';
import { Linking, Switch } from 'react-native';

function HomePage({ navigation }) {
    const refRBSheet = useRef();
    const [img, setimg] = store.useState("img");
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [modalVisible, setModalVisible] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [email, setemail] = store.useState("email");
    const handelModal = () => {
        if (modalVisible == false) {
            setModalVisible(true)
        } else {
            setModalVisible(false)
        }

    };
    // -----------------------------------------------
    const [data, setdata] = useState([]);
    const [datauser, setdatauser] = useState([]);
    useEffect(() => {
        loadDataUser();
        loadData();
    }, []);
    const loadDataUser = async () => {
        await Client.post('/getuser', email).then(function (res) {
            setdatauser(res.data)
        }).catch(function (e) {
            console.log('error data from laoddatauser')
        })
    }
    const loadData = async () => {
        await Client.post('/getprofil', email).then(function (res) {
            setdata(res.data)
        }).catch(function (e) {
            console.log('error from loaddata')
        })
    }
    // ----------------------------------------------------
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


    const handellinkfacebook = () => {
        if (data.facebook != "") {
            Linking.openURL(data.facebook)
        }

    }
    const handellinkinstagram = () => {
        if (data.instagram != "") {
            Linking.openURL(data.instagram)
        }
    }
    const handellinktwitter = () => {
        if (data.twitter != "") {
            Linking.openURL(data.twitter)
        }
    }
    const handellinksnapchat = () => {
        if (data.snapchat != "") {
            Linking.openURL(data.snapchat)
        }
    }
    const handellinktiktok = () => {
        if (data.tiktok != "") {
            Linking.openURL(data.tiktok)
        }
    }
    //---------------------------------------------
    const [switchtel, setswitchtel] = useState(true)
    const [switchbirth, setswitchbirth] = useState(true)
    const [switchadd, setswitchadd] = useState(true)
    const [switchmai, setswitchmai] = useState(true)
    let image = { uri: `http://192.168.1.16:3000/${datauser.image}` };
    let couverture = { uri: `http://192.168.1.16:3000/${datauser.couverture}` };
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

                style={styles.ViewStyle}>

                <ImageBackground
                    imageStyle={{ borderBottomLeftRadius: 25 }}
                    source={couverture}
                    resizeMode="cover"
                    style={styles.cover}
                >
                    <Text style={styles.text}></Text>
                </ImageBackground>

                <Avatar
                    rounded
                    size={100}
                    //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                    overlayContainerStyle={{ backgroundColor: 'gray' }}
                    //onPress={() => console.log("Works!")}
                    containerStyle={{ flex: 1, marginTop: 40 }}
                    source={image}
                />
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ marginRight: 10, fontSize: 20, fontStyle: 'bold', color: textcoler, }}>{datauser.name}</Text>
                    <Text style={{ marginRight: 10, fontSize: 20, fontStyle: 'bold', color: textcoler, }}>{datauser.tag}</Text>
                </View>
                <View style={{ padding: 10 }}>
                    {/* --------------------------------------- */}
                    <Text style={{ width: 300, height: 50, color: textcoler, }}>{data.bio}</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 10, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>Followers:</Text>
                        <Text style={{ marginRight: 70, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>{data.nb_followers}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 10, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>Following:</Text>
                            <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic' }}>{data.nb_following}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 20, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>Albums:</Text>
                        <Text style={{ marginRight: 70, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>{data.nb_classe}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 20, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>Pictures:</Text>
                            <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic' }}>{data.nb_img}</Text>
                        </View>
                    </View>
                    <Pressable onPress={() => refRBSheet.current.open()}>
                        <Text style={{ fontSize: 13, color: '#8e8e8f' }}>see more...</Text>
                    </Pressable>
                </View>
                <TabBarProfil />

            </ScrollView>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
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
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name='mobile-phone' size={27} color={maincolor} style={{ marginRight: 20 }} />
                        <Text style={{ marginRight: 135, fontSize: 20, color: textcoler, fontStyle: 'italic' }}>{data.tel}</Text>
                        <Switch
                            // trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={switchtel ? '#f5dd4b' : '#f4f3f4'}
                            //ios_backgroundColor="#3e3e3e"
                            onValueChange={() => switchtel ? setswitchtel(false) : setswitchtel(true)}
                            value={switchtel}
                        />

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name='birthday-cake' size={20} color={maincolor} style={{ marginRight: 10 }} />
                        <Text style={{ marginRight: 100, fontSize: 20, color: textcoler, fontStyle: 'italic' }}>{data.birthday}</Text>
                        <Switch
                            // trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={switchbirth ? '#f5dd4b' : '#f4f3f4'}
                            //ios_backgroundColor="#3e3e3e"
                            onValueChange={() => switchbirth ? setswitchbirth(false) : setswitchbirth(true)}
                            value={switchbirth}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name='map-marker' size={27} color={maincolor} style={{ marginRight: 15 }} />
                        <Text style={{ marginRight: 125, fontSize: 20, color: textcoler, fontStyle: 'italic' }}>{data.adress}</Text>
                        <Switch
                            // trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={switchadd ? '#f5dd4b' : '#f4f3f4'}
                            //ios_backgroundColor="#3e3e3e"
                            onValueChange={() => switchadd ? setswitchadd(false) : setswitchadd(true)}
                            value={switchadd}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='email' size={23} color={maincolor} style={{ marginRight: 10 }} />
                        <Text style={{ marginRight: 25, fontSize: 20, color: textcoler, fontStyle: 'italic' }}>{datauser.email}</Text>
                        <Switch
                            // trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={switchmai ? '#f5dd4b' : '#f4f3f4'}
                            //ios_backgroundColor="#3e3e3e"
                            onValueChange={() => switchmai ? setswitchmai(false) : setswitchmai(true)}
                            value={switchmai}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 90, marginVertical: 50, }}>
                        <TouchableOpacity onPress={handellinkfacebook}>
                            <Entypo name='facebook' size={23} color={maincolor} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinkinstagram}>
                            <Entypo name='instagram' size={23} color={maincolor} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinktwitter}>
                            <Entypo name='twitter' size={23} color={maincolor} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinksnapchat}>
                            <FontAwesome name='snapchat' size={23} color={maincolor} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinktiktok}>
                            <Entypo name='tumblr' size={22} color={maincolor} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>

                </View>
            </RBSheet>

        </View >

    )
}
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




});
export default HomePage