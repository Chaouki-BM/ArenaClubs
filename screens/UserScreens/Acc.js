import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ImageBackground, Modal, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import store from '../../components/Store';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Client from '../../api/Client';
import Ip from '../../api/Ip';
import Feather from 'react-native-vector-icons/Feather'
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Pressable } from 'react-native';
const Acc = () => {
    const refRBSheet = useRef();
    const saveposts = useRef();
    const [email, setemail] = store.useState("email");
    const [mode, setmode] = store.useState("mode");
    const [albumS, setalbumS] = store.useState("albumS")
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [Modalshow, setModalshow] = useState(false)
    const [Modall, setModall] = useState(false)
    const [isFocusM, setisFocusM] = useState(false);
    const [inputS, setinputS] = store.useState("inputS");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")

    useEffect(() => {
        loadposts()
        getlikes()
        getusers()
        getsave()
        // setuserlike([])

    }, [])
    const [allUser, setallUser] = useState([])
    const getusers = async () => {
        await Client.get("/getall").then(function (res) {
            setallUser(res.data)

        }).catch(function (e) {
            console.log("error from get users", e)
        })
    }

    // const loadLike = async (item) => {
    //     islike.email = email.email;
    //     islike.group_name = item.group_name;
    //     islike.email_img = item.email;
    //     islike.image = item.image;
    //     islike.email_like = email.email;

    //     await Client.post("/testlike", islike)
    //         .then((res) => {
    //             if (res.data.test == 0) {
    //                 item["heart"] = "heart-o"
    //                 //console.log("hhhh", element)
    //                 setposts(prevState => [...prevState, item])

    //             } else {
    //                 item["heart"] = "heart"
    //                 //console.log("hhhh", element)
    //                 setposts(prevState => [...prevState, item])
    //             }
    //         }).catch(function (e) {
    //             console.log("error from loadLike post", e)
    //         })


    // }

    const [posts, setposts] = useState([])

    const loadposts = async () => {
        await Client.post("/getallimages_following", email).
            then(function (res) {
                setposts(res.data[0]);
                // res.data[0].forEach(async element => {
                //     loadLike(element)
                //     setposts([])
                // })

            }).catch(function (e) {
                console.log("error from get all images following", e);
            })
    }
    const convertedData = posts.map(item => ({
        ...item,
        date: item.date.replace(/\//g, "-")

    }));

    const sortedPosts = convertedData.sort((a, b) => {
        const aDate = new Date(`${a.date} ${a.time}`);
        const bDate = new Date(`${b.date} ${b.time}`);

        return bDate - aDate; // note the order of aDate and bDate has been reversed to sort in descending order
    })
    // ------------------------
    const [islike, setislike] = useState({
        // email: '',
        group_name: '',
        email_img: '',
        image: '',
        email_like: '',
    })







    // ---------------------------
    const getlikes = async () => {
        await Client.post("/getall_like_home")
            .then(function (res) {
                setlikes(res.data)

            }).catch(function (e) {
                console.log("error from get likes", e)
            })

    }

    const [likes, setlikes] = useState([])
    const [userlike, setuserlike] = useState([])
    const [allcomment, setallcomment] = useState([])
    const [comments, setcomment] = useState({ comment: '' })
    const handelallliker = async (post) => {
        //setuserlike([])
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
    const [postss, setpostss] = store.useState("posts")
    //const [allsave, setallsave] = store.useState("allsave")
    const getsave = async () => {
        save.email_saved = email.email
        await Client.post("/get_save", save).then(function (res) {
            if (res.data.msg == "success") {
                //setallsave(res.data.saves)
                setpostss(res.data.saves)
            } else {
                // setallsave([])
                setpostss([])
            }
        }).catch(function (e) {
            console.log("error from get save", e);
        })
    }
    const [showcomment, setshowcomment] = useState({
        email_img: '',
        image: '',
        group_name: '',
    })
    const [commentpost, setcommentpost] = useState()
    const [imagecomment, setimagecomment] = useState('')
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
    const [com, setcom] = useState({
        email_img: '',
        group_name: '',
        image: '',
        email_comment: '',
        name_comment: '',
        img_comment: '',
        comment: '',
        time: '',
    })
    const [loaddata, setloaddata] = store.useState('loaddata')
    const initialState = {}
    const handelSendComment = async (post) => {
        if (comments.comment != '') {
            com.email_img = post.email
            com.group_name = post.group_name
            com.image = post.image
            com.email_comment = email.email
            com.name_comment = loaddata.nom
            com.img_comment = loaddata.image
            com.comment = comments.comment
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes();
            com.time = time
            // -------------------------
            sendnotif.email_do = email.email
            sendnotif.email_to = post.email
            //sendnotif.vu = false
            sendnotif.img_do = post.image
            sendnotif.name = loaddata.nom
            sendnotif.img_profil = loaddata.image
            sendnotif.msg = "commenter"
            await Client.post("/add_commenter", com).then(function (res) {
                if (res.data.msg == 'yes') {
                    Alert.alert("Comment send")
                    setcomment(initialState)
                    handelsendnotif()
                }
            }).catch(function (e) {
                console.log("error from handel comment", e)
            })
        }
    }
    const [editcomments, seteditcomments] = useState({ comment: '', id: '' })
    const [id, setid] = useState({ id: '' })
    const handelThreeDots = (element) => {
        console.log(element)
        if (Modall == false) {
            setModall(true)
        }
        id.id = element._id
        editcomments.id = element._id
        editcomments.comment = element.comment
    }
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
    const [chevron, setchivron] = useState('chevron-right')

    const [close, setcolse] = useState(true)

    const handelEditComment = () => {
        setcolse(close == true ? false : true)
        setchivron(chevron == 'chevron-right' ? 'chevron-down' : 'chevron-right')
    }
    const handelSaveEdit = async () => {
        setModall(!Modall)
        await Client.post("edit_comment", editcomments).then(function (res) {
            if (res.data.msg == "yes") {
                handelshowComment(commentpost)
            }
        }).catch(function (e) {
            console.log("error from handel save edite", e)
        })
    }
    // --------------like---------------

    //let updatedPosts = [...sortedPosts];
    // console.log("1111", updatedPosts);
    const handelunheart = async (post, index) => {
        //console.log('unheart');
        // updatedPosts[index].heart = "heart-o"
        //console.log(updatedPosts);
        //islike.email = email.email;
        islike.group_name = post.group_name;
        islike.email_img = post.email;
        islike.image = post.image;
        islike.email_like = email.email;
        // --------------------------
        sendnotif.email_do = email.email
        sendnotif.email_to = post.email
        //sendnotif.vu = false
        sendnotif.img_do = post.image
        sendnotif.msg = "like"
        await Client.post("/deletelike", islike).then(function (res) {
            loadposts()
            handelDeletenotifLIke()
        })
    }
    const handelheart = async (post, index) => {
        //console.log('heart');
        //updatedPosts[index].heart = "heart"
        // console.log(updatedPosts);
        //islike.email = email.email;
        islike.group_name = post.group_name;
        islike.email_img = post.email;
        islike.image = post.image;
        islike.email_like = email.email;
        // -------------------------------
        sendnotif.email_do = email.email
        sendnotif.email_to = post.email
        //sendnotif.vu = false
        sendnotif.img_do = post.image
        sendnotif.name = loaddata.nom
        sendnotif.img_profil = loaddata.image
        sendnotif.msg = "like"
        await Client.post("/addlike", islike).then(function (res) {
            loadposts()
            handelsendnotif()
        })
    }
    let a = false
    const [isSave, setisSave] = useState(false)
    const [save, setsave] = useState({ email_saved: '', id_post_saved: '', })
    const handelThreeDotssave = (post) => {
        save.email_saved = email.email
        save.id_post_saved = post._id
        saveposts.current.open()
        msgrep.report_account = post.email,
            msgrep.report_post = post.image,
            setisSave(false)
        if (postss == "") {
            setisSave(false)
        } else {
            postss.forEach(element => {
                if (element._id == post._id) {
                    console.log("yes");
                    a = true
                    return setisSave(true)


                } else if (a == false && element._id != post._id) {
                    return setisSave(false)

                }
            });

        }

    }
    const handelsavePost = async () => {
        await Client.post("/add_save", save).then(function (res) {
            if (res.data.msg == "add") {
                getsave()

            }
        }).catch(function (e) {
            console.log("error from handel save post ", e);
        })
        saveposts.current.close()
    }
    const handeldeteteSave = async () => {
        await Client.post("/delete_save", save).then(function (res) {
            if (res.data.msg == "delete") {
                getsave()

            }
        }).catch(function (e) {
            console.log("error from handel delete save", e);
        })
        saveposts.current.close()
    }
    const [msgrep, setmsgrep] = useState({
        report_from: "",
        report_account: "",

        report_msg: "",
        report_post: "",

        report_from_name: "",
        report_from_img: ""
    })
    const [chevronrep, setchivronrep] = useState('chevron-right')
    const [closerep, setcolserep] = useState(true)
    const [rep, setrep] = useState({ msgreport: '' })
    const handelrepostPost = () => {
        setcolserep(closerep == true ? false : true)
        setchivronrep(chevronrep == 'chevron-right' ? 'chevron-down' : 'chevron-right')

    }
    const handelSaveRep = async () => {
        msgrep.report_from = email.email,
            msgrep.report_msg = rep.msgreport,
            msgrep.report_from_name = loaddata.nom,
            msgrep.report_from_img = loaddata.image,
            await Client.post("/report_post", msgrep).then(function (res) {
                setrep({ msgreport: '' })
            }).catch(function (e) {
                console.log("error from handel repost post", e);
            })
    }
    const [sendnotif, setsendnotif] = useState({
        email_do: '',
        email_to: '',
        vu: '',
        msg: '',
        img_profil: '',
        name: '',
        img_do: '',
    })
    const handelsendnotif = async () => {
        await Client.post("/addnotification", sendnotif).
            then(function (res) {
                console.log(res.data.msg);
            }).catch(function (e) {
                console.log("error from handel send notification", e);
            })
    }
    const handelDeletenotifLIke = async () => {
        await Client.post("/deletenotification_like",).then(function (res) {

        }).catch(function (e) {
            console.log("error from delete noti like", e);
        })
    }

    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

            >
                {sortedPosts.map((post, index) => {
                    // heart = post.heart
                    //  console.log(updatedPosts[index].heart)
                    return (
                        <View key={index} style={{ marginTop: 15, marginHorizontal: 48, backgroundColor: albumS, width: 300, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Avatar rounded
                                    size={40}
                                    //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                                    overlayContainerStyle={{ backgroundColor: 'gray' }}
                                    //onPress={() => console.log("Works!")}
                                    containerStyle={{ marginBottom: 15, marginTop: 10, marginLeft: 5 }}
                                    source={{ uri: `${Ip}${post.img_p}` }}
                                />
                                <Text style={{ color: textcoler, marginVertical: 20, marginStart: 20, fontSize: 16, fontWeight: 'bold' }}>{post.nom}</Text>
                                <TouchableOpacity onPress={() => handelThreeDotssave(post)}>
                                    <Entypo name='dots-three-horizontal' size={20} color={maincolor} style={{ marginHorizontal: 140, marginVertical: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: row, }}>
                                <Text style={{ color: textcoler, alignSelf: "flex-start", marginBottom: 10, marginHorizontal: 10, }}>{language.album} : </Text>
                                <Text style={{ color: textcoler, }}> {post.group_name}</Text>
                            </View>
                            <View style={{ flexDirection: row, marginHorizontal: 10 }}>
                                <Text style={{ color: textcoler, width: 275, }}>{post.statu}</Text>
                            </View>
                            <ImageBackground
                                //imageStyle={{}}
                                style={{ width: 250, height: 230, marginLeft: 25, marginBottom: 10 }}
                                source={{ uri: `${Ip}${post.image}` }}
                                resizeMode="contain"

                            >
                            </ImageBackground>

                            <View style={{ flexDirection: row }}>



                                {/* <TouchableOpacity onPress={() => { post.heart == "heart" ? (handelunheart(post, index)) : (handelheart(post, index)) }}>
                                    {post.heart === "heart" ?
                                        <FontAwesome name="heart" color={maincolor} size={20} style={{ marginTop: 1, marginLeft: 20 }} />
                                        :
                                        <FontAwesome name="heart-o" color={maincolor} size={20} style={{ marginTop: 1, marginLeft: 20 }} />
                                    }

                                </TouchableOpacity> */}

                                <TouchableOpacity onPress={() => handelshowComment(post)}>
                                    <FontAwesome name='comment-o' size={21} color={maincolor} style={{ marginHorizontal: 15, marginBottom: 10 }} />
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity onPress={() => handelallliker(post)}>
                                <View style={{ flexDirection: row, marginBottom: 5, marginHorizontal: 10 }}>
                                    <Text style={{ color: textcoler, marginEnd: 10 }}>{post.nb_like}</Text>
                                    <Text style={{ color: textcoler, marginEnd: 10 }}>{language.likes}</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{ flexDirection: row, marginBottom: 20, marginHorizontal: 10 }}>
                                <Text style={{ color: textcoler, marginEnd: 10 }}>{post.date} </Text>
                                <Text style={{ color: textcoler, marginEnd: 10 }}>{post.time} </Text>

                            </View>

                            <View style={{ flexDirection: 'row' }}>
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
                                    placeholder={language.addcom}
                                    onChangeText={val => {
                                        setcomment({ ...comments, comment: val });
                                    }}
                                    value={comments.comment}
                                />
                                <TouchableOpacity onPress={() => handelSendComment(post)}>
                                    <Feather name='send' size={23} color={maincolor} style={{ marginLeft: 5, marginTop: 6, marginBottom: 20 }} />
                                </TouchableOpacity>
                            </View>
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
                            style={{ backgroundColor: maincolor, height: 25, borderRadius: 10, marginTop: 10 }}
                            onPress={() => setModalshow(!Modalshow)}>
                            <Text style={{ marginVertical: -3, marginHorizontal: 20, color: textcoler, fontSize: 20 }}>{language.close}</Text>
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
                            <TouchableOpacity onPress={handelDeleteComment} >
                                <View style={{ flexDirection: row }}>
                                    <Ionicons name='trash' size={17} style={{ marginHorizontal: 10, color: maincolor }} />
                                    <Text style={{ color: textcoler, fontSize: 18, marginBottom: 20 }}>{language.deletecom}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handelEditComment}>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name='edit' size={18} style={{ marginRight: 10, color: maincolor }} />
                                    <Text style={{ color: textcoler, fontSize: 17, marginRight: 40 }}>{language.editcom}</Text>
                                    <Entypo name={chevron} size={18} color={maincolor} style={{ marginTop: 5 }} />
                                </View>
                            </TouchableOpacity>
                            {close == false &&
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
                                        placeholder={language.editcom}


                                        onChangeText={val => {
                                            seteditcomments({ ...editcomments, comment: val });
                                        }}
                                        value={editcomments.comment}
                                    />
                                    <TouchableOpacity onPress={handelSaveEdit} style={{ backgroundColor: maincolor, borderRadius: 10, marginHorizontal: 80, marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ color: textcoler, fontSize: 20, marginHorizontal: 6 }}>{language.save}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>

                        <TouchableOpacity
                            style={{ backgroundColor: maincolor, height: 35, borderRadius: 10, marginHorizontal: 60 }}
                            onPress={() => setModall(!Modall)}>
                            <Text style={{ color: textcoler, fontSize: 20, alignSelf: 'center', top: 3, marginEnd: 10, marginStart: 10 }}>{language.close}</Text>
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
                    <Text style={{ color: textcoler, fontSize: 20, textAlign: 'center' }}>{language.comment}</Text>
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
                                    //source={{ uri: `${Ip}${element.img_comment}` }}
                                    />
                                    <Text style={{ color: textcoler, fontSize: 18, marginTop: 5 }}>{element.name_comment}</Text>
                                    {/* <Text style={{ marginLeft: 10, color: textcoler, fontSize: 18, marginTop: 5 }}>{element.tag_comment}</Text> */}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 350, }}>
                                        <Text style={{ marginLeft: 60, color: textcoler, fontSize: 14 }}>{element.comment}</Text>
                                    </View>
                                    {element.email_comment == email.email ?
                                        <TouchableOpacity onPress={() => handelThreeDots(element)}>
                                            <Entypo name='dots-three-horizontal' size={20} color={maincolor} style={{ marginLeft: 10 }} />
                                        </TouchableOpacity>
                                        : null}
                                </View>
                            </View>
                        )
                    })}


                </ScrollView>

            </RBSheet >

            <RBSheet
                ref={saveposts}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={250}
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
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 12,
                            marginBottom: 5,

                        }}
                    />
                    <Pressable onPress={isSave == true ? handeldeteteSave : handelsavePost}>
                        {isSave == true ?
                            <Text style={{ color: textcoler, fontSize: 20 }}>{language.already_saved}</Text> :
                            <Text style={{ color: textcoler, fontSize: 20 }}>{language.save_post}</Text>}

                    </Pressable>
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 12,


                        }}
                    />
                    <Pressable onPress={handelrepostPost}>
                        <View style={{ flexDirection: row }}>
                            <Text style={{ color: textcoler, fontSize: 20 }}>{language.report_post}</Text>
                            <Entypo name={chevronrep} size={18} color={maincolor} style={{ marginTop: 5 }} />
                        </View>
                    </Pressable>
                    {closerep == false &&
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
                                placeholder={language.report_post}


                                onChangeText={val => {
                                    setrep({ ...rep, msgreport: val });
                                }}
                                value={rep.msgreport}
                            />
                            <TouchableOpacity onPress={handelSaveRep} style={{ backgroundColor: maincolor, borderRadius: 10, marginHorizontal: 80, marginTop: 10, marginBottom: 10 }}>
                                <Text style={{ color: textcoler, fontSize: 20, marginHorizontal: 6 }}>{language.save}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View
                        style={{
                            borderBottomColor: maincolor,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: 380,
                            height: 15,


                        }}
                    />

                </View>
            </RBSheet >
        </View >
    )
}

export default Acc

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