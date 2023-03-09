import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert, Modal, TextInput } from 'react-native'
import React, { useRef, useState, useEffect, useCallback } from 'react'
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
import { launchImageLibrary } from 'react-native-image-picker';
import Client from '../api/Client';
import Ip from '../api/Ip';
const PostsAlbum = ({ navigation }) => {
    const refRBSheet = useRef();
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
    const [chivron, setchivron] = useState('chevron-right')
    const [email, setemail] = store.useState("email");
    const [Modalshow, setModalshow] = useState(false)
    const [datauser, setdatauser] = store.useState("datauser");
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
    useEffect(() => {
        loadPosts()
        getusers()
        getlikes()
    }, []);
    const [allUser, setallUser] = useState([])
    const getusers = async () => {
        await Client.get("/getall").then(function (res) {
            setallUser(res.data)

        }).catch(function (e) {
            console.log("error from get users", e)
        })
    }
    const [likes, setlikes] = useState([])
    const getlikes = async () => {
        await Client.post("/getall_like", email)
            .then(function (res) {
                setlikes(res.data)
            }).catch(function (e) {
                console.log("error from get likes", e)
            })

    }
    const [posts, setposts] = useState([])
    const loadLike = async (element) => {
        islike.email = email.email;
        islike.group_name = element.group_name;
        islike.email_img = email.email;
        islike.image = element.image;
        islike.email_like = email.email;
        await Client.post("/testlike", islike)
            .then((res) => {
                if (res.data.test == 0) {
                    element["heart"] = "heart-o"
                    //console.log("hhhh", element)
                    setposts(prevState => [...prevState, element])
                } else {
                    element["heart"] = "heart"
                    //console.log("hhhh", element)
                    setposts(prevState => [...prevState, element])
                }
            }).catch(function (e) {
                console.log("error from loadLike post", e)
            })
    }

    const loadPosts = async () => {
        await Client.post("/getallimages", email)
            .then(function (res) {
                res.data.forEach(async element => {
                    loadLike(element)
                    setposts([])
                })
            }).catch(function (e) {
                console.log("error from load data post album", e)
            })
    }
    const [islike, setislike] = useState({
        email: '',
        group_name: '',
        email_img: '',
        image: '',
        email_like: '',
    })

    const handelheart = async (post, index) => {
        islike.email = email.email;
        islike.group_name = post.group_name;
        islike.email_img = email.email;
        islike.image = post.image;
        islike.email_like = email.email;
        await Client.post("/addlike", islike)
            .then(function (res) {
                if (res.data.msg == 'yep') {
                    loadPosts()
                    getlikes()
                }
            }).catch(function (e) {
                console.log("error from handel heart ", e)
            })
    }
    const handelunheart = async (post, index) => {
        islike.email = email.email;
        islike.group_name = post.group_name;
        islike.email_img = email.email;
        islike.image = post.image;
        islike.email_like = email.email;
        await Client.post("/deletelike", islike).then(function (res) {
            if (res.data.msg == 'yep') {
                loadPosts()
                getlikes()

            }
        }).catch(function (e) {
            console.log("error from unheart post", e)
        })
    }
    const [clicked, setclicked] = useState()
    const handelthreedots = (post) => {
        refRBSheet.current.open()
        setclicked(post)
    }
    const handeladdpost = () => {
        setModal(modal == false ? true : false)
    }
    const hanselsave = () => {
        setModal(!modal)
        setstatus(initialState)
        upload();
        setdatapict(initialState)

    }
    const handelimportpicture = () => {
        let options = {
            mediaType: "mixed",
            quality: 1,
            // includeBase64: true,
        };

        launchImageLibrary(options, res => {
            if (!res.didCancel) {
                datapict.datapict = res.assets[0].uri
                console.log("img ok", res.assets[0].uri)
            }

        })
    }
    const [datapict, setdatapict] = useState({ datapict: '' })
    const [settingalbum, setsettingalbum] = store.useState("settingalbum");
    const upload = async () => {
        const formData = new FormData()
        formData.append('file', { uri: datapict.datapict, type: 'image/jpeg', name: 'image.jpg' })
        await Client.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (res) {
            let image = res.data.file.path
            imageup.image = image
            date();
            postimg();
        }).catch(function (e) {
            console.log('err bcz add post', e)
            Alert.alert('Import your image again')
        })
    }
    const [status, setstatus] = useState({ statu: '' })
    const date = () => {
        console.log(status)
        imageup.email = email.email
        imageup.group_name = settingalbum.group_name
        imageup.name = datauser.name
        imageup.tag = datauser.tag
        imageup.statu = status.statu
        imageup.img_p = datauser.image
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        imageup.time = time
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = mm + '/' + dd + '/' + yyyy;
        imageup.date = date
    }
    const [imageup, setimageup] = useState({
        image: '',
        email: '',
        group_name: '',
        time: '',
        statu: '',
        date: '',
        nb_like: 0,
        name: '',
        tag: '',
        img_p: '',
    })

    const postimg = async () => {
        await Client.post("/addimage", imageup)
            .then(function (res) {
                if (res.data.type == 'success') {
                    Alert.alert('success', res.data.msg);
                    loadPosts();
                } else {
                    Alert.alert(res.data.type, res.data.msg);
                }

            }).catch(function (e) {
                console.log('error postimg', e)
            })
    }

    const [deletepost, setdeletepost] = useState({
        email: '',
        group_name: '',
        image: '',
        email_img: '',
    })
    const handelDeletePost = async () => {
        deletepost.email = clicked.email
        deletepost.group_name = clicked.group_name
        deletepost.image = clicked.image
        deletepost.email_img = clicked.email
        await Client.post("/deleteimage", deletepost).then(function (res) {
            Alert.alert(res.data.msg);
            loadPosts();
        }).catch(function (e) {
            console.log("error from delete post", e)
        })
    }
    const [editstatus, seteditstatus] = useState({
        statu: '',
        email: '',
        group_name: '',
        image: '',
    })
    const handelsavechangeStatus = async () => {
        editstatus.email = clicked.email
        editstatus.group_name = clicked.group_name
        editstatus.image = clicked.image
        await Client.post("/editstatu", editstatus)
            .then(function (res) {
                Alert.alert(res.data.msg)
                loadPosts();
                seteditstatus(initialState)
            }).catch(function (e) {
                console.log("error from ")
            })

    }
    const [userlike, setuserlike] = useState([])
    const handelallliker = async (post) => {
        if (Modalshow == false) {
            setModalshow(true)
        }
        setuserlike([])
        for (let i = 0; i < likes.length; i++) {
            for (let j = 0; j < allUser.length; j++) {
                if (likes[i].email_like == allUser[j].email && likes[i].image == post.image && likes[i].group_name == post.group_name) {
                    setuserlike(prevState => [...prevState, allUser[j]])

                }
            }

        }
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

            <ScrollView style={{ marginBottom: 100 }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                {posts.slice(0).reverse().map((post, index) => {
                    if (post.group_name == settingalbum.group_name) {

                        return (

                            <View key={index} style={{ alignItems: 'center', width: 373, backgroundColor: albumS, borderRadius: 10, marginBottom: 8 }}>
                                <TouchableOpacity onPress={() => handelthreedots(post)} style={{ alignSelf: 'flex-end', marginRight: 10 }}>
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
                                        source={{ uri: `${Ip}${post.image}` }}
                                    />
                                    <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                                        <View style={{ width: 220, height: 60 }}>
                                            <Text style={{ color: textcoler }}>{post.statu}</Text>
                                        </View >
                                        <Text style={{ color: textcoler }}>{post.date}</Text>
                                        <Text style={{ color: textcoler }}>{post.time}</Text>
                                        <TouchableOpacity onPress={() => post.heart == "heart" ? handelunheart(post, index) : handelheart(post, index)}>
                                            <FontAwesome name={post.heart == "heart" ? "heart" : "heart-o"} color={maincolor} size={20} style={{ marginHorizontal: 154 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handelallliker(post)}>
                                            <Text style={{ left: 150, marginTop: 10 }}>{post.nb_like} Likes</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            </View>

                        )


                    }
                })}

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
                        <TouchableOpacity onPress={handelimportpicture}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ fontSize: 18, color: textcoler, marginRight: 10, fontStyle: 'italic' }}>Import picture or video</Text>
                                <MaterialCommunityIcons name='upload' size={25} color={maincolor} />

                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                onPress={hanselsave}
                                style={{ backgroundColor: maincolor, borderRadius: 10, width: 56, height: 25, marginHorizontal: 20 }}>
                                <Text style={{ color: textcoler, textAlign: 'center', fontSize: 16, fontStyle: 'Bold' }}>save </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { setModal(!modal); setstatus(initialState); setdatapict(initialState) }}
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={Modalshow}
                onRequestClose={() => {
                    setModalshow(!Modalshow);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    //marginTop: 22,
                }}>
                    <View style={{
                        // margin: 20,
                        backgroundColor: mode,
                        borderRadius: 10,
                        padding: 35,
                        width: 300,
                        height: 300,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <ScrollView
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}>
                            {userlike.map((ulike, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignContent: 'center', width: 250 }}>
                                        <Avatar rounded
                                            size={55}
                                            //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                                            overlayContainerStyle={{ backgroundColor: 'gray' }}
                                            //onPress={() => console.log("Works!")}
                                            containerStyle={{ marginBottom: 20, marginTop: 10, marginLeft: 5 }}
                                            source={{ uri: `${Ip}${ulike.image}` }}
                                        />
                                        <View style={{ flexDirection: 'row', marginVertical: 25, marginLeft: 10 }}>
                                            <Text style={{ marginRight: 10, fontSize: 20, color: textcoler }}>{ulike.name}</Text>
                                            <Text style={{ fontSize: 20, color: textcoler }}>{ulike.tag}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <TouchableOpacity
                            style={{ backgroundColor: maincolor, width: 90, height: 25, borderRadius: 10, marginTop: 10 }}
                            onPress={() => setModalshow(!Modalshow)}>
                            <Text style={{ marginVertical: -3, marginHorizontal: 20, color: textcoler, fontSize: 20 }}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        // -------------------------------
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

