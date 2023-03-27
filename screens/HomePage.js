import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import store from '../components/Store';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';
import TabBarProfil from '../Navigations/TabBarProfil';
import RBSheet from "react-native-raw-bottom-sheet";
import Client from '../api/Client';
import { Linking, } from 'react-native';
import Ip from '../api/Ip';
function HomePage() {
    const refRBSheet = useRef();
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
    // -----------------------------------------------
    const [data, setdata] = store.useState("data");
    const [datauser, setdatauser] = store.useState("datauser");
    useEffect(() => {
        loadDataUser();
        loadData();

    }, []);
    const loadDataUser = async () => {
        await Client.post('/getclub', email).then(function (res) {
            setdatauser(res.data.club)

        }).catch(function (e) {
            console.log('error data from laoddatauser')
        })
    }
    const loadData = async () => {
        await Client.post('/getprofil', email)
            .then(function (res) {
                setdata(res.data.res)


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
        setalbumS(albumS == '#DEDEDE' ? '#6B6B6B' : '#DEDEDE')
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



    //---------------------------------------------


    const handelseemore = () => {
        loadData();
        refRBSheet.current.open()
    }


    let image = { uri: `${Ip}${datauser.image}` };
    let couverture = { uri: `${Ip}${datauser.couverture}` };
    const [cover, setcover] = useState({
        couverture: '',
        email: '',
    })
    const upload = async () => {
        const formData = new FormData()
        formData.append('file', { uri: pic.pic, type: 'image/jpeg', name: 'image.jpg' })
        await Client.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {
            let path = res.data.file.path
            cover.couverture = path
            cover.email = email.email
            postcover()
        }).catch(function (e) {
            console.log('err bcz update cover img', e)
            Alert.alert('Import your image again')
        })
    }
    const handelchnagecover = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,


            // includeBase64: true,
        };

        launchImageLibrary(options, res => {
            if (!res.didCancel) {
                pic.pic = res.assets[0].uri
                console.log("img ok", res.assets[0].uri)
                upload()
            }

        })
    }
    const postcover = async () => {
        await Client.post("/Upcouverture", cover)
            .then(function (res) {
                if (res.data.msg == 'success') {
                    Alert.alert('success')
                    loadDataUser();
                }
            }).catch(function (e) {
                console.log('error from post cover', e)

            })
    }
    const [pic, setpic] = useState({ pic: '' })

    const [Albums, setAlbums] = store.useState("Albums")
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

                {datauser.couverture != '' &&
                    <ImageBackground
                        imageStyle={{ borderBottomLeftRadius: 25 }}
                        source={couverture}
                        resizeMode="contain"
                        style={styles.cover}
                    >
                        <Text style={styles.text}></Text>
                    </ImageBackground>}
                <TouchableOpacity onPress={handelchnagecover}>
                    <Entypo name='camera' color={maincolor} size={23} style={{ top: 106, left: 340, }} />
                </TouchableOpacity>
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
                    <Text style={{ marginRight: 10, fontSize: 20, fontStyle: 'bold', color: textcoler, }}>{datauser.nom}</Text>

                </View>
                <View style={{ marginLeft: 10 }}>
                    {/* --------------------------------------- */}
                    <Text style={{ width: 300, height: 50, color: textcoler, }}>{data.bio}</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginRight: 100, }}>{data.nb_following}</Text>
                        <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic' }}>{data.nb_followers}</Text>

                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 20, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>Abonnes :</Text>
                        <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginRight: 50, }}>{Albums.length}</Text>

                        <Text style={{ marginRight: 20, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>Postes :</Text>
                        <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginRight: 50, }}>{Albums.length}</Text>

                        <Text style={{ marginRight: 20, fontSize: 13, color: textcoler, fontStyle: 'italic' }}>Albums :</Text>
                        <Text style={{ fontSize: 13, color: textcoler, fontStyle: 'italic', marginRight: 50, }}>{Albums.length}</Text>


                    </View>

                    <Pressable onPress={handelseemore}>
                        <Text style={{ fontSize: 13, color: '#8e8e8f' }}>see more...</Text>
                    </Pressable>
                </View>
                <TabBarProfil />

            </ScrollView>

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
                <View style={{ padding: 20 }}>

                    <View style={{ flexDirection: 'row', marginHorizontal: 120, marginVertical: 50, }}>
                        <TouchableOpacity onPress={handellinkfacebook}>
                            <Entypo name='facebook' size={23} color={maincolor} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinkinstagram}>
                            <Entypo name='instagram' size={23} color={maincolor} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handellinktwitter}>
                            <Entypo name='twitter' size={23} color={maincolor} style={{ marginRight: 20 }} />
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