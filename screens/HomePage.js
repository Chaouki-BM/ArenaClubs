import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native'
import store from '../components/Store';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import TabNavigation from '../Navigations/TabNavigation'
function HomePage({ navigation }) {
    const [img, setimg] = store.useState("img");
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
    const [isFocus, setisFocus] = useState(false);
    const [isFocusM, setisFocusM] = useState(false);

    return (

        <View style={[styles.container, { backgroundColor: mode }]}>


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
            <ScrollView>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
            </ScrollView>
        </View >

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
export default HomePage