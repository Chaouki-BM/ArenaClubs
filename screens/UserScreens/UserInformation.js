import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import store from '../../components/Store'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'react-native-elements';
import Client from '../../api/Client'
import Ip from '../../api/Ip'
import RBSheet from "react-native-raw-bottom-sheet";
import { Switch } from 'react-native-paper';
import { red } from '@mui/material/colors'
const UserInformation = () => {
    const refRBSheet = useRef();
    const [mode, setmode] = store.useState("mode");
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [albumS, setalbumS] = store.useState("albumS")
    const [email, setemail] = store.useState("email");
    const [datauser, setdatauser] = store.useState("datauser");
    useEffect(() => {
        handelgetwork()
        handelgetuniv()
        loaddata()
        // loadmembres()

    }, []);
    const [data, setdata] = useState([])
    const loaddata = async () => {
        await Client.post("/getuser", email)
            .then(function (res) {
                basedata.anniversaire = res.data.user.anniversaire
                basedata.ville = res.data.user.ville
                contactdata.email_contact = res.data.user.email_contact
                contactdata.tele = res.data.user.tele
                auxpartnership.anniversaire_partnership = res.data.user.anniversaire_partnership
                auxpartnership.email_partnership = res.data.user.email_partnership
                auxpartnership.tele_partnership = res.data.user.tele_partnership
                auxpartnership.ville_partnership = res.data.user.ville_partnership
                setdata(res.data.user)

            }).catch(function (e) {
                console.log("error from load data information", e)
            })
    }
    // const [getmembre, setgetmembre] = useState({
    //     email: '',
    //     date: ''
    // })
    // const [membres, setmembres] = store.useState("membres")
    // const loadmembres = async () => {
    //     var today = new Date();
    //     var y = today.getFullYear();
    //     getmembre.date = y
    //     getmembre.email = email.email
    //     await Client.post("/get_membres_club", getmembre)
    //         .then(function (res) {
    //             setmembres(res.data)
    //         }).catch(function (e) {
    //             console.log("error from load membres", e)
    //         })
    // }
    const [aux, setaux] = useState('')
    const handelAddUniversity = () => {
        refRBSheet.current.open()
        setaux('adduniv')
    }
    const [works, setworks] = useState([])
    const handelgetwork = async () => {
        await Client.post("get_work", email).then(function (res) {
            setworks(res.data)
        }).catch(function (e) {
            console.log("error from hande get work", e);
        })
    }
    const [universitys, setuniversitys] = useState([])
    const handelgetuniv = async () => {
        await Client.post("/getuniversity", email).then(function (res) {
            setuniversitys(res.data)
        }).catch(function (e) {
            console.log("error from handel get univ");
        })
    }
    const handelchangecontactinfo = () => {
        setaux('editcontact')
        refRBSheet.current.open()
    }
    const handelchangebaseinfo = () => {
        setaux('editbaseinfo')
        refRBSheet.current.open()
    }
    const [adduniv, setadduniv] = useState({
        university: '',
        email: '',
    })
    let initial = {}
    const handelsaveaddunive = async () => {
        adduniv.email = email.email
        await Client.post("/adduniversity", adduniv).then(function (res) {
            handelgetuniv()
            setadduniv(initial)
        }).catch(function (e) {
            console.log('error from handel save add univ', e);
        })
    }
    const handeldeleteuniv = async (u) => {
        adduniv.email = email.email
        adduniv.university = u.university
        await Client.post("/deluniversity", adduniv).then(function (res) {
            handelgetuniv()
        }).catch(function (e) {
            console.log('error from delete univ', e);
        })
    }
    const [basedata, setbasedata] = useState({
        anniversaire: '',
        ville: '',
        email: '',
    })
    const handelsavechangebaseinfo = async () => {
        basedata.email = email.email
        await Client.post('/modify_basic_info_user', basedata).then(function (res) {
            if (res.data.s == 's') {
                loaddata()
                refRBSheet.current.close()
            }
        }).catch(function (e) {
            console.log('error from handel save change base info', e);
        })
    }
    const [contactdata, setcontactdata] = useState({
        tele: '',
        email_contact: '',
        email: '',
    })
    const handelsavechangecontact = async () => {
        contactdata.email = email.email
        await Client.post("/modify_contact_user", contactdata)
            .then(function (res) {
                if (res.data.s == 's') {
                    loaddata()
                    refRBSheet.current.close()
                }
            }).catch(function (e) {
                console.log("error from handel save change contact", e);
            })
    }

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [auxpartnership, setauxpartnership] = useState({
        tele_partnership: '',
        email_partnership: '',
        ville_partnership: '',
        anniversaire_partnership: '',
    })
    const onToggleSwitchville = async () => {
        setauxpartnership({ ...auxpartnership, ville_partnership: !auxpartnership.ville_partnership })
        if (auxpartnership.ville_partnership == true) {
            ToastAndroid.show(language.only_me, ToastAndroid.SHORT)
        } else {
            ToastAndroid.show(language.public, ToastAndroid.SHORT)
        }
        await Client.post("/change_ville_partnership", email);
    }
    const onToggleSwitchtele = async () => {
        setauxpartnership({ ...auxpartnership, tele_partnership: !auxpartnership.tele_partnership })
        if (auxpartnership.tele_partnership == true) {
            ToastAndroid.show(language.only_me, ToastAndroid.SHORT)
        } else {
            ToastAndroid.show(language.public, ToastAndroid.SHORT)
        }
        await Client.post("/change_tele_partnership", email);
    }
    const onToggleSwitchemail = async () => {
        setauxpartnership({ ...auxpartnership, email_partnership: !auxpartnership.email_partnership })
        if (auxpartnership.email_partnership == true) {
            ToastAndroid.show(language.only_me, ToastAndroid.SHORT)
        } else {
            ToastAndroid.show(language.public, ToastAndroid.SHORT)
        }
        await Client.post("/change_email_partnership", email);
    }
    const onToggleSwitchanniv = async () => {
        setauxpartnership({ ...auxpartnership, anniversaire_partnership: !auxpartnership.anniversaire_partnership })
        if (auxpartnership.anniversaire_partnership == true) {
            ToastAndroid.show(language.only_me, ToastAndroid.SHORT)
        } else {
            ToastAndroid.show(language.public, ToastAndroid.SHORT)
        }
        await Client.post("/change_anniversaire_partnership", email);
    }
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 30 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, color: maincolor, fontSize: 19, }}>{language.basic_info}</Text>

                    </View>
                    <View style={{ marginEnd: 30, borderRadius: 5, alignSelf: "flex-end" }}>
                        <TouchableOpacity onPress={() => handelchangebaseinfo()}>
                            <AntDesign name='edit' size={25} color={'#3F4347'} />
                            {/* <Text style={{ color: textcoler, fontSize: 19, }}>edit</Text> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 35, flexDirection: 'row', marginBottom: 10 }}>
                        <Switch value={auxpartnership.anniversaire_partnership} color={maincolor} onValueChange={onToggleSwitchanniv} />
                        <FontAwesome name='birthday-cake' size={25} color={textcoler} style={{ marginEnd: 14 }} />
                        <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.anniversaire}</Text>

                    </View>
                    <View style={{ marginHorizontal: 35, flexDirection: 'row', marginBottom: 10 }}>
                        <Switch value={auxpartnership.ville_partnership} color={maincolor} onValueChange={onToggleSwitchville} />
                        <FontAwesome name='map-marker' size={25} color={textcoler} style={{ marginEnd: 20 }} />
                        <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.ville}</Text>
                    </View>
                    <View style={{ marginHorizontal: 77, flexDirection: 'row', marginBottom: 10 }}>

                        <MaterialCommunityIcons name={data.genre == 'Male' ? 'gender-male' : 'gender-female'} size={25} color={textcoler} style={{ marginEnd: 14 }} />
                        {data.genre == "Femelle" ?
                            <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15, marginBottom: 20, }}>{language.femelle} </Text>
                            :
                            <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15, marginBottom: 20, }}>{language.male} </Text>
                        }


                    </View>
                </View>
                {/* ----------------------------------------------- */}
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, color: maincolor, fontSize: 19, }}>{language.contact}</Text>

                    </View>
                    <View style={{ marginEnd: 30, borderRadius: 5, alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={() => handelchangecontactinfo()} >
                            {/* <Text style={{ color: textcoler, fontSize: 19, }}>edit</Text> */}
                            <AntDesign name='edit' size={25} color={"#3F4347"} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 35, flexDirection: 'row', marginBottom: 10 }}>
                        <Switch value={auxpartnership.tele_partnership} color={maincolor} onValueChange={onToggleSwitchtele} />
                        <FontAwesome name='phone' size={25} color={textcoler} style={{ marginEnd: 10 }} />
                        <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }} >{data.tele}</Text>

                    </View>
                    <View style={{ marginHorizontal: 35, flexDirection: 'row', marginBottom: 10 }}>
                        <Switch value={auxpartnership.email_partnership} color={maincolor} onValueChange={onToggleSwitchemail} />
                        <Ionicons name='mail' size={25} color={textcoler} style={{ marginEnd: 10 }} />
                        <Text style={{ marginBottom: 20, color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.email_contact}</Text>
                    </View>
                </View>
                {/* --------------------------------------------- */}
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 20, color: maincolor, fontSize: 19 }}>{language.university}</Text>

                    </View>
                    <TouchableOpacity onPress={() => handelAddUniversity()}>
                        <View style={{ width: 50, height: 47, alignSelf: 'flex-end', flexDirection: 'row' }}>

                            <FontAwesome name='plus-circle' size={25} color={"#3F4347"} style={{ marginBottom: 20 }} />

                        </View>
                    </TouchableOpacity>
                    <View style={{ marginStart: 40 }}>
                        {universitys.map((university, index) => {
                            return (
                                <View key={index}>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <TouchableOpacity onPress={() => handeldeleteuniv(university)}>
                                            <MaterialIcons name='cancel' size={22} color={'#A30000'} style={{ marginEnd: 10 }} />
                                        </TouchableOpacity>
                                        <FontAwesome name='graduation-cap' size={25} color={textcoler} style={{ marginBottom: 20, marginEnd: 10, }} />
                                        <Text style={{ marginBottom: 20, color: textcoler, fontStyle: 'normal', fontSize: 15, width: 230 }}>{university.university}</Text>
                                    </View>
                                </View>
                            )
                        }
                        )}
                    </View>
                </View>
                {/* -------------------------------------- */}
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                    <View style={{ flexDirection: row }}>

                        <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 15, color: maincolor, fontSize: 19 }}>{language.work}</Text>

                    </View>
                    {/* <TextInput
                        style={[{ width: 250, alignSelf: 'center', height: 40, borderRadius: 15, marginBottom: 20 }, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusM(true)
                        }}
                        onBlur={() => {
                            setisFocusM(false)
                        }}
                        placeholder={language.recherche}
                        onChangeText={val => {
                            setsearch({ ...search, search: val });
                        }}
                        value={search.search}
                    /> */}
                    {works.map((work, index) => {
                        // if (membre.name_user.indexOf(search.search) != -1) { show = true }
                        // else { show = false }
                        // if (show) {
                        return (
                            <View key={index} style={{ flexDirection: 'row' }}>
                                <Avatar
                                    rounded
                                    size={50}
                                    //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                                    overlayContainerStyle={{ backgroundColor: 'gray' }}
                                    //onPress={() => console.log("Works!")}
                                    containerStyle={{ marginLeft: 20, marginBottom: 20 }}
                                    //source={image}
                                    source={{ uri: `${Ip}${work.image_club}` }}
                                />
                                <View style={{ width: 280, flexDirection: 'row' }}>
                                    <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>{work.name_club}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>({work.role})</Text>
                                        <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>{work.date}</Text>
                                    </View>
                                </View>
                            </View>)
                        // }
                    })}
                </View>

            </ScrollView>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
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
                <View style={{ padding: 10 }}>
                    {aux == "adduniv" ?
                        <>
                            <Text style={{ marginHorizontal: 90, color: maincolor, fontSize: 18, alignSelf: "center", marginBottom: 60 }}>{language.change_nt}</Text>
                            <TextInput
                                style={[{ borderColor: isFocusM ? maincolor : inputS },
                                {
                                    backgroundColor: inputS,
                                    color: textcoler,
                                    borderRadius: 20,
                                    width: 350,
                                    marginHorizontal: 10,
                                    marginBottom: 40,

                                }]}

                                onFocus={() => {
                                    setisFocusM(true)
                                }}
                                onBlur={() => {
                                    setisFocusM(false)
                                }}
                                placeholder="univ"
                                onChangeText={val => {
                                    setadduniv({ ...adduniv, university: val });
                                }}
                                value={adduniv.university}
                            />


                            <TouchableOpacity onPress={handelsaveaddunive} style={{ marginHorizontal: 130, backgroundColor: maincolor, height: 40, borderRadius: 20 }}>
                                <Text style={{ color: mode, fontWeight: "bold", alignSelf: 'center', top: 8 }}>{language.save}</Text>
                            </TouchableOpacity>
                        </>
                        : null}
                    {aux == "editbaseinfo" ?
                        <>
                            <Text style={{ marginHorizontal: 90, color: maincolor, fontSize: 18, alignSelf: "center", marginBottom: 40 }}>edit base info</Text>
                            <TextInput
                                style={[{ borderColor: isFocusM ? maincolor : inputS },
                                {
                                    backgroundColor: inputS,
                                    color: textcoler,
                                    borderRadius: 20,
                                    width: 350,
                                    marginHorizontal: 10,
                                    marginBottom: 10,

                                }]}

                                onFocus={() => {
                                    setisFocusM(true)
                                }}
                                onBlur={() => {
                                    setisFocusM(false)
                                }}
                                placeholder="anniversaire"
                                onChangeText={val => {
                                    setbasedata({ ...basedata, anniversaire: val });
                                }}
                                value={basedata.anniversaire}
                            />
                            <TextInput
                                style={[{ borderColor: isFocusM ? maincolor : inputS },
                                {
                                    backgroundColor: inputS,
                                    color: textcoler,
                                    borderRadius: 20,
                                    width: 350,
                                    marginHorizontal: 10,
                                    marginBottom: 40,

                                }]}

                                onFocus={() => {
                                    setisFocusM(true)
                                }}
                                onBlur={() => {
                                    setisFocusM(false)
                                }}
                                placeholder="ville"
                                onChangeText={val => {
                                    setbasedata({ ...basedata, ville: val });
                                }}
                                value={basedata.ville}
                            />

                            <TouchableOpacity onPress={handelsavechangebaseinfo} style={{ marginHorizontal: 130, backgroundColor: maincolor, height: 40, borderRadius: 20 }}>
                                <Text style={{ color: mode, fontWeight: "bold", alignSelf: 'center', top: 8 }}>{language.save}</Text>
                            </TouchableOpacity>
                        </>
                        : null}
                    {aux == "editcontact" ?
                        <>
                            <Text style={{ marginHorizontal: 90, color: maincolor, fontSize: 18, alignSelf: "center", marginBottom: 40 }}>edit base info</Text>
                            <TextInput
                                style={[{ borderColor: isFocusM ? maincolor : inputS },
                                {
                                    backgroundColor: inputS,
                                    color: textcoler,
                                    borderRadius: 20,
                                    width: 350,
                                    marginHorizontal: 10,
                                    marginBottom: 10,

                                }]}

                                onFocus={() => {
                                    setisFocusM(true)
                                }}
                                onBlur={() => {
                                    setisFocusM(false)
                                }}
                                placeholder="anniversaire"
                                onChangeText={val => {
                                    setcontactdata({ ...contactdata, tele: val });
                                }}
                                value={contactdata.tele}
                            />
                            <TextInput
                                style={[{ borderColor: isFocusM ? maincolor : inputS },
                                {
                                    backgroundColor: inputS,
                                    color: textcoler,
                                    borderRadius: 20,
                                    width: 350,
                                    marginHorizontal: 10,
                                    marginBottom: 40,

                                }]}

                                onFocus={() => {
                                    setisFocusM(true)
                                }}
                                onBlur={() => {
                                    setisFocusM(false)
                                }}
                                placeholder="email"
                                onChangeText={val => {
                                    setcontactdata({ ...contactdata, email_contact: val });
                                }}
                                value={contactdata.email_contact}
                            />

                            <TouchableOpacity onPress={handelsavechangecontact} style={{ marginHorizontal: 130, backgroundColor: maincolor, height: 40, borderRadius: 20 }}>
                                <Text style={{ color: mode, fontWeight: "bold", alignSelf: 'center', top: 8 }}>{language.save}</Text>
                            </TouchableOpacity>
                        </>
                        : null}
                </View>
            </RBSheet>
        </View>
    )
}

export default UserInformation

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        //height: 500,
        //flexDirection: 'column',
        //justifyContent: 'flex-start',
        // alignItems: 'center',
        //padding: 10,

    },
})