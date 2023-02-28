import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert, Modal, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import store from '../components/Store';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Avatar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const PostsAlbum = ({ navigation }) => {
    const refRBSheet = useRef();
    const [settingalbum, setsettingalbum] = store.useState("settingalbum");
    const [mode, setmode] = store.useState("mode");
    const [Moons, setSun] = store.useState("Moons");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [inputS, setinputS] = store.useState("inputS");
    const [modalVisible, setModalVisible] = useState(false);
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [isFocusM, setisFocusM] = useState(false);
    const [albumS, setalbumS] = store.useState("albumS")
    const [heart, setheart] = useState('heart-o')
    const [modal, setModal] = useState(false);
    const [status, setstatus] = useState({ statu: '' })
    const [chivron, setchivron] = useState('chevron-right')
    const [editstatus, seteditstatus] = useState({ statu: '' })
    const handelModal = () => {
        if (modalVisible == false) {
            setModalVisible(true)
        } else {
            setModalVisible(false)
        }

    };
    const initialState = {

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
    const handelheart = () => {
        setheart(heart == 'heart-o' ? 'heart' : 'heart-o')
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(time)
    }
    const handelthreedots = () => {
        refRBSheet.current.open()
    }
    const handeladdpost = () => {
        setModal(modal == false ? true : false)
    }
    const hanselsave = () => {
        setModal(!modal)
        setstatus(initialState)
    }
    const handelimportpicture = () => {

    }
    const handelDeletePost = () => {

    }
    const handelsavechangeStatus = () => {
        seteditstatus(initialState)
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
            <View style={{ alignItems: 'center', backgroundColor: albumS, marginBottom: 5, flexDirection: 'row', borderRadius: 10 }}>
                <Text style={{ alignSelf: 'flex-start', flex: 1, marginBottom: 10, marginLeft: 10, fontSize: 20, color: maincolor }}>{settingalbum.group_name}</Text>
                <TouchableOpacity onPress={handeladdpost}>
                    <View style={{ marginRight: 10, backgroundColor: maincolor, borderRadius: 10, width: 90, height: 25, flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center', color: textcoler, marginLeft: 10 }}>Add post</Text>
                        <MaterialIcons name='add-circle' color={textcoler} size={20} style={{ marginHorizontal: 2, marginVertical: 3 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', width: 373, backgroundColor: albumS, borderRadius: 10, }}>
                    <TouchableOpacity onPress={handelthreedots} style={{ alignSelf: 'flex-end', marginRight: 10 }}>
                        <Entypo name='dots-three-horizontal' size={20} color={maincolor} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                        <Avatar
                            //rounded
                            size={100}
                            //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                            overlayContainerStyle={{ backgroundColor: 'gray' }}
                            //onPress={() => console.log("Works!")}
                            containerStyle={{ marginBottom: 20, marginTop: 10, marginLeft: 20 }}
                        // source={image}
                        />
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <View style={{ width: 220, height: 60 }}>
                                <Text style={{ color: textcoler }}>statussssssssssssssssssssssssssssss
                                    sssssssssssssssssssssssssssssssssssssss
                                </Text>
                            </View >
                            <Text style={{ color: textcoler }}>Date</Text>

                            <TouchableOpacity onPress={handelheart}>
                                <FontAwesome name={heart} color={maincolor} size={20} style={{ marginHorizontal: 154 }} />
                            </TouchableOpacity>


                        </View>

                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View style={styles.centeredViewModal}>
                    <View style={[styles.modalViewModal, { backgroundColor: mode }]}>
                        <TouchableOpacity onPress={handelimportpicture}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ fontSize: 18, color: textcoler, marginRight: 10, fontStyle: 'italic' }}>Import picture or video</Text>
                                <MaterialCommunityIcons name='upload' size={25} color={maincolor} />

                            </View>
                        </TouchableOpacity>
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {

                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 20,
                                marginTop: 20,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="Status"
                            onChangeText={val => {
                                setstatus({ ...status, statu: val });
                            }}
                            value={status.statu}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                onPress={hanselsave}
                                style={{ backgroundColor: maincolor, borderRadius: 10, width: 56, height: 25, marginHorizontal: 20 }}>
                                <Text style={{ color: textcoler, textAlign: 'center', fontSize: 16, fontStyle: 'Bold' }}>save </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { setModal(!modal); setstatus(initialState) }}
                                style={{ backgroundColor: maincolor, borderRadius: 10, width: 56, height: 25, marginHorizontal: 20 }}>
                                <Text style={{ color: textcoler, textAlign: 'center', fontSize: 16, fontStyle: 'Bold' }}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={300}
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
                <View
                    style={{
                        borderBottomColor: maincolor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: 400,
                        height: 16,
                        marginBottom: 15,

                    }}
                />
                <View >
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => chivron == 'chevron-right' ? setchivron('chevron-down') : setchivron('chevron-right')}>
                        <AntDesign name='edit' size={25} color={maincolor} style={{ marginLeft: 10, marginRight: 10 }} />
                        <Text style={{ color: textcoler, fontSize: 20, marginRight: 170 }}>Edit Status</Text>

                        <Entypo name={chivron} size={25} color={maincolor} />
                    </TouchableOpacity>
                </View>
                {chivron == 'chevron-down' &&
                    <View>
                        <TextInput
                            style={[{ borderColor: isFocusM ? maincolor : inputS },
                            {

                                backgroundColor: inputS,
                                color: textcoler,
                                borderRadius: 20,
                                width: 350,
                                marginHorizontal: 10,
                                marginBottom: 20,
                                marginTop: 20,

                            }]}

                            onFocus={() => {
                                setisFocusM(true)
                            }}
                            onBlur={() => {
                                setisFocusM(false)
                            }}
                            placeholder="New Status"
                            onChangeText={val => {
                                seteditstatus({ ...editstatus, statu: val });
                            }}
                            value={editstatus.statu}
                        />
                        <TouchableOpacity onPress={handelsavechangeStatus} style={{ marginHorizontal: 130, backgroundColor: maincolor, width: 100, height: 40, borderRadius: 20 }}>
                            <Text style={{ color: mode, fontWeight: "bold", marginHorizontal: 9, marginVertical: 9 }}>Save change</Text>
                        </TouchableOpacity>
                    </View>}
                <View
                    style={{
                        borderBottomColor: maincolor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: 400,
                        height: 20,
                        marginBottom: 10,

                    }}

                />

                <TouchableOpacity onPress={handelDeletePost} style={{ flexDirection: 'row' }}>
                    <EvilIcons name='trash' size={30} color={maincolor} style={{ marginLeft: 10, marginRight: 10 }} />
                    <Text style={{ color: textcoler, fontSize: 20, }}>Delete Post</Text>
                </TouchableOpacity>


                <View
                    style={{
                        borderBottomColor: maincolor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: 400,
                        height: 15,
                        marginBottom: 10,

                    }}

                />
                {/* -------------------------------- */}
            </RBSheet >
        </View>
    )
}
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
        // flex: 1,
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
    centeredViewdelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewdelete: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: 300,
        height: 150,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredViewModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewModal: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
export default PostsAlbum

