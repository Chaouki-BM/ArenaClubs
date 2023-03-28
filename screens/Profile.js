import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ImageBackground, Modal, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import store from '../components/Store';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Client from '../api/Client';
import Ip from '../api/Ip';
import Feather from 'react-native-vector-icons/Feather'
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Profile = () => {
    const refRBSheet = useRef();
    const [email, setemail] = store.useState("email");
    const [mode, setmode] = store.useState("mode");
    const [albumS, setalbumS] = store.useState("albumS")
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [Modalshow, setModalshow] = useState(false)
    const [Modall, setModall] = useState(false)
    const [isFocusM, setisFocusM] = useState(false);
    const [inputS, setinputS] = store.useState("inputS");
    useEffect(() => {
        loadPostsProfil()
        getusers()
        getlikes()
    }, [])
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
    const [islike, setislike] = useState({
        email: '',
        group_name: '',
        email_img: '',
        image: '',
        email_like: '',
    })
    const [posts, setposts] = useState([])
    // const loadLike = async (element) => {
    //     islike.email = email.email;
    //     islike.group_name = element.group_name;
    //     islike.email_img = email.email;
    //     islike.image = element.image;
    //     islike.email_like = email.email;
    //     await Client.post("/testlike", islike)
    //         .then((res) => {
    //             if (res.data.test == 0) {
    //                 element["heart"] = "heart-o"
    //                 //console.log("hhhh", element)
    //                 setposts(prevState => [...prevState, element])
    //             } else {
    //                 element["heart"] = "heart"
    //                 //console.log("hhhh", element)
    //                 setposts(prevState => [...prevState, element])
    //             }
    //         }).catch(function (e) {
    //             console.log("error from loadLike post", e)
    //         })
    // }
    const loadPostsProfil = async () => {
        await Client.post("/getallimages", email).then(function (res) {

            setposts(res.data)
            // res.data.forEach(async element => {
            //     loadLike(element)
            //     setposts([])
            // })
        }).catch(function (e) {
            console.log("error from load post profile", e)
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
    // const handelunheart = async (post, index) => {
    //     islike.email = email.email;
    //     islike.group_name = post.group_name;
    //     islike.email_img = email.email;
    //     islike.image = post.image;
    //     islike.email_like = email.email;
    //     await Client.post("/deletelike", islike).then(function (res) {
    //         if (res.data.msg == 'yep') {
    //             loadPostsProfil()
    //             getlikes()

    //         }
    //     }).catch(function (e) {
    //         console.log("error from unheart post", e)
    //     })
    // }
    // const handelheart = async (post, index) => {
    //     islike.email = email.email;
    //     islike.group_name = post.group_name;
    //     islike.email_img = email.email;
    //     islike.image = post.image;
    //     islike.email_like = email.email;
    //     await Client.post("/addlike", islike)
    //         .then(function (res) {
    //             if (res.data.msg == 'yep') {
    //                 loadPostsProfil()
    //                 getlikes()
    //             }
    //         }).catch(function (e) {
    //             console.log("error from handel heart ", e)
    //         })
    // }
    const initialState = {

    }
    const [comments, setcomment] = useState({ comment: '' })
    const [com, setcom] = useState({
        email_img: '',
        group_name: '',
        image: '',
        email_comment: '',
        name_comment: '',
        tag_comment: '',
        img_comment: '',
        comment: '',
        time: '',
    })
    // const handelSendComment = async (post) => {
    //     if (comments.comment != '') {
    //         com.email_img = post.email
    //         com.group_name = post.group_name
    //         com.image = post.image
    //         com.email_comment = email.email
    //         com.name_comment = post.name
    //         com.tag_comment = post.tag
    //         com.img_comment = post.img_p
    //         com.comment = comments.comment
    //         var today = new Date();
    //         var time = today.getHours() + ":" + today.getMinutes();
    //         com.time = time
    //         console.log(com)
    //         await Client.post("/add_commenter", com).then(function (res) {
    //             if (res.data.msg == 'yes') {
    //                 Alert.alert("Comment send")
    //                 setcomment(initialState)
    //             }
    //         }).catch(function (e) {
    //             console.log("error from handel comment", e)
    //         })
    //     }
    // }
    const [showcomment, setshowcomment] = useState({
        email_img: '',
        image: '',
        group_name: '',
    })
    const [commentpost, setcommentpost] = useState()
    const [imagecomment, setimagecomment] = useState('')
    const [allcomment, setallcomment] = useState([])
    const handelshowComment = async (post) => {
        showcomment.email_img = post.email
        showcomment.image = post.image
        showcomment.group_name = post.group_name
        setimagecomment(post.image)
        setcommentpost(post)
        await Client.post("/get_commenters", showcomment).then(function (res) {
            if (res.data.msg != "no" && res.data.commenters != '') {
                setallcomment(res.data.commenters)

            } else {
                setallcomment([])
            }
        }).catch(function (e) {
            console.log("error from handelshow comment ", e)
        })
        refRBSheet.current.open()
    }
    const handelThreeDots = (element) => {
        console.log(element)
        if (Modall == false) {
            setModall(true)
        }
        id.id = element._id
        editcomments.id = element._id
        editcomments.comment = element.comment
    }
    const [editcomments, seteditcomments] = useState({ comment: '', id: '' })
    const [chevron, setchivron] = useState('chevron-right')
    const [close, setcolse] = useState(true)
    const handelEditComment = () => {
        setcolse(close == true ? false : true)
        setchivron(chevron == 'chevron-right' ? 'chevron-down' : 'chevron-right')
    }
    // const handelSaveEdit = async () => {
    //     setModall(!Modall)
    //     await Client.post("edit_comment", editcomments).then(function (res) {
    //         if (res.data.msg == "yes") {
    //             handelshowComment(commentpost)
    //         }
    //     }).catch(function (e) {
    //         console.log("error from handel save edite", e)
    //     })
    // }
    const [id, setid] = useState({ id: '' })
    const handelDeleteComment = async () => {
        await Client.post("/del_commenter", id).then(function (res) {
            if (res.data.msg == "yes") {
                Alert.alert("comment deleted")
                handelshowComment(commentpost)
            }
        }).catch(function (e) {
            console.log("error from handel daelete comment ", e)
        })
    }
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    console.log(language)
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

            >
                {posts.slice(0).reverse().map((post, index) => {
                    return (
                        <View key={index} style={{ marginTop: 15, marginHorizontal: 35, backgroundColor: albumS, width: 300, borderRadius: 10 }}>
                            <View style={{ flexDirection: row }}>
                                <Text style={{ color: textcoler, alignSelf: "flex-start", marginBottom: 10, marginHorizontal: 10 }}>{language.album} : </Text>
                                <Text style={{ color: textcoler, }}> {post.group_name}</Text>
                            </View>
                            <Text style={{ color: textcoler, marginLeft: 10, width: 275, }}>{post.statu}</Text>
                            <ImageBackground
                                //imageStyle={{}}
                                style={{ width: 250, height: 230, marginLeft: 25, }}
                                source={{ uri: `${Ip}${post.image}` }}
                                resizeMode="contain"

                            >
                            </ImageBackground>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <TouchableOpacity onPress={() => post.heart == "heart" ? handelunheart(post, index) : handelheart(post, index)}>
                                    <FontAwesome name={post.heart} color={maincolor} size={20} style={{ marginTop: 10, marginLeft: 20 }} />
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => handelshowComment(post)}>
                                    <FontAwesome name='comment-o' size={21} color={maincolor} style={{ marginTop: 1, marginLeft: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => handelallliker(post)}>
                                <Text style={{ marginTop: 10, marginLeft: 10, color: textcoler, marginBottom: 5 }}>{post.nb_like} Likes</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <Text style={{ marginLeft: 10, color: textcoler }}>{post.date} </Text>
                                <Text style={{ marginLeft: 10, color: textcoler, }}>{post.time} </Text>

                            </View>

                            {/* <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={[{ borderColor: isFocusM ? maincolor : inputS },
                                    {

                                        backgroundColor: inputS,
                                        color: textcoler,
                                        borderRadius: 10,
                                        width: 250,
                                        height: 35,
                                        marginLeft: 10


                                    }]}

                                    onFocus={() => {
                                        setisFocusM(true)
                                    }}
                                    onBlur={() => {
                                        setisFocusM(false)
                                    }}
                                    placeholder="Comment"
                                    onChangeText={val => {
                                        setcomment({ ...comments, comment: val });
                                    }}
                                    value={comments.comment}
                                />
                                <TouchableOpacity onPress={() => handelSendComment(post)}>
                                    <Feather name='send' size={23} color={maincolor} style={{ marginLeft: 5, marginTop: 6 }} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    )
                })}
            </ScrollView>
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
                                            <Text style={{ marginRight: 10, fontSize: 20, color: textcoler }}>{ulike.nom}</Text>
                                            {/* <Text style={{ fontSize: 20, color: textcoler }}>{ulike.tag}</Text> */}
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
            {/* ----------------modal three dots------------- */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={Modall}
                onRequestClose={() => {
                    setModall(!Modall);
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
                        padding: 25,
                        width: 250,
                        // height: 200,
                        //alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <View>
                            <TouchableOpacity onPress={handelDeleteComment}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name='trash' size={17} style={{ marginRight: 10, color: maincolor }} />
                                    <Text style={{ color: textcoler, fontSize: 17, marginBottom: 15 }}>Delete comment</Text>
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={handelEditComment}>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name='edit' size={18} style={{ marginRight: 10, color: maincolor }} />
                                    <Text style={{ color: textcoler, fontSize: 17, marginRight: 40 }}>Edit comment</Text>
                                    <Entypo name={chevron} size={18} color={maincolor} style={{ marginTop: 5 }} />
                                </View>
                            </TouchableOpacity> */}
                            {/* {close == false &&
                                <View>
                                    <TextInput
                                        multiline
                                        numberOfLines={3}
                                        //maxLength={40}
                                        style={[{ borderColor: isFocusM ? maincolor : inputS },
                                        {

                                            backgroundColor: inputS,
                                            color: textcoler,
                                            borderRadius: 10,
                                            width: 200,
                                            //height: 100,
                                            marginRight: 20


                                        }]}

                                        onFocus={() => {
                                            setisFocusM(true)
                                        }}
                                        onBlur={() => {
                                            setisFocusM(false)
                                        }}
                                        placeholder="Edit Comment"


                                        onChangeText={val => {
                                            seteditcomments({ ...editcomments, comment: val });
                                        }}
                                        value={editcomments.comment}
                                    />
                                    <TouchableOpacity onPress={handelSaveEdit} style={{ backgroundColor: maincolor, width: 60, borderRadius: 10, marginHorizontal: 65, marginTop: 10 }}>
                                        <Text style={{ color: textcoler, fontSize: 20, marginHorizontal: 6 }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            } */}
                        </View>

                        <TouchableOpacity
                            style={{ backgroundColor: maincolor, width: 70, height: 25, borderRadius: 10, marginTop: 10, marginHorizontal: 60 }}
                            onPress={() => setModall(!Modall)}>
                            <Text style={{ marginVertical: -3, marginHorizontal: 10, color: textcoler, fontSize: 20 }}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
            {/* ------------------------------------ */}
            < RBSheet RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={730}
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

                <ImageBackground

                    //imageStyle={{}}
                    style={{ width: 250, height: 230, marginLeft: 80, marginTop: 10 }}
                    source={{ uri: `${Ip}${imagecomment}` }}
                    resizeMode="contain"

                />
                <View style={{ backgroundColor: albumS, width: 380, height: 30, marginTop: 10, marginLeft: 5, borderRadius: 10 }}>
                    <Text style={{ color: textcoler, fontSize: 20, textAlign: 'center' }}>Comment</Text>
                </View>
                <ScrollView>


                    {allcomment.slice(0).reverse().map((element, index) => {
                        return (
                            <View key={index}>
                                < View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
                                    <Avatar
                                        rounded
                                        size={40}
                                        //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                                        overlayContainerStyle={{ backgroundColor: 'gray' }}
                                        //onPress={() => console.log("Works!")}
                                        containerStyle={{ marginRight: 10 }}
                                        source={{ uri: `${Ip}${element.img_comment}` }}
                                    />
                                    <Text style={{ color: textcoler, fontSize: 18, marginTop: 5 }}>{element.name_comment}</Text>
                                    <Text style={{ marginLeft: 10, color: textcoler, fontSize: 18, marginTop: 5 }}>{element.tag_comment}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 350, }}>
                                        <Text style={{ marginLeft: 60, color: textcoler, fontSize: 14 }}>{element.comment}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handelThreeDots(element)}>
                                        <Entypo name='dots-three-horizontal' size={20} color={maincolor} style={{ marginLeft: 10 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}


                </ScrollView>

            </RBSheet >
        </View >

    )
}



const styles = StyleSheet.create({
    container: {
        //  width: '100%',
        height: '100%',
        //height: 500,
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#ECF1FE',
        //padding: 10,

    },
})
export default Profile