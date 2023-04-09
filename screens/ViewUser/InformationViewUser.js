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
const InformationViewUser = () => {
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
    const [emailView, setemailView] = store.useState("emailView")
    useEffect(() => {
        laodData()
        loadUniv()
        loadWork()
    }, [])
    const [data, setdata] = useState([])
    const laodData = async () => {
        await Client.post("/getuser", emailView).then(function (res) {
            setdata(res.data.user)

        }).catch(function (e) {
            console.log("error from handel laod data", e);
        })
    }
    const [universitys, setuniversitys] = useState([])
    const loadUniv = async () => {
        await Client.post("/getuniversity", emailView).then(function (res) {
            setuniversitys(res.data)


        }).catch(function (e) {
            console.log("error from handel laod data", e);
        })
    }
    const [works, setworks] = useState([])
    const loadWork = async () => {
        await Client.post("/get_work", emailView).then(function (res) {
            setworks(res.data)
            console.log(res.data);

        }).catch(function (e) {
            console.log("error from handel laod data", e);
        })
    }
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 30 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, color: maincolor, fontSize: 19, }}>Information de base</Text>

                    </View>
                    {/* <View style={{ marginEnd: 30, borderRadius: 5, alignSelf: "flex-end" }}>
                        <TouchableOpacity onPress={() => handelchangebaseinfo()}>
                            <AntDesign name='edit' size={25} color={'#00A300'} />
                            <Text style={{ color: textcoler, fontSize: 19, }}>edit</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ marginHorizontal: 35, flexDirection: 'row', marginBottom: 10 }}>
                        {data.anniversaire_partnership == true ?
                            <>
                                {/* <Switch value={auxpartnership.anniversaire_partnership} color={maincolor} onValueChange={onToggleSwitchanniv} /> */}
                                < FontAwesome name='birthday-cake' size={25} color={textcoler} style={{ marginEnd: 14 }} />
                                <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.anniversaire}</Text>
                            </>
                            : null}
                    </View>
                    <View style={{ marginHorizontal: 40, flexDirection: 'row', marginBottom: 10 }}>
                        {data.ville_partnership == true ?
                            <>
                                {/* <Switch value={auxpartnership.ville_partnership} color={maincolor} onValueChange={onToggleSwitchville} /> */}
                                <FontAwesome name='map-marker' size={25} color={textcoler} style={{ marginEnd: 20 }} />
                                <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.ville}</Text>
                            </>
                            : null}
                    </View>
                    <View style={{ marginHorizontal: 40, flexDirection: 'row', marginBottom: 10 }}>

                        <MaterialCommunityIcons name={data.genre == 'Male' ? 'gender-male' : 'gender-female'} size={25} color={textcoler} style={{ marginEnd: 14 }} />
                        <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15, marginBottom: 20, }}>{data.genre} </Text>

                    </View>
                </View>
                {/* ----------------------------------------------- */}
                {data.tele_partnership == true || data.email_partnership == true ?
                    <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                        <View style={{ flexDirection: row }}>
                            <Text style={{ marginTop: 15, marginHorizontal: 20, color: maincolor, fontSize: 19, }}>{language.contact}</Text>

                        </View>
                        {/* <View style={{ marginEnd: 30, borderRadius: 5, alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={() => handelchangecontactinfo()} >
                            <Text style={{ color: textcoler, fontSize: 19, }}>edit</Text>
                            <AntDesign name='edit' size={25} color={'#00A300'} />
                        </TouchableOpacity>
                    </View> */}
                        <View style={{ marginHorizontal: 35, flexDirection: 'row', marginBottom: 10 }}>
                            {data.tele_partnership == true ? <>
                                {/* <Switch value={auxpartnership.tele_partnership} color={maincolor} onValueChange={onToggleSwitchtele} /> */}
                                <FontAwesome name='phone' size={25} color={textcoler} style={{ marginEnd: 10 }} />
                                <Text style={{ color: textcoler, fontStyle: 'normal', fontSize: 15 }} >{data.tele}</Text>
                            </> : null}
                        </View>
                        <View style={{ marginHorizontal: 35, flexDirection: 'row', marginBottom: 10 }}>
                            {data.email_partnership == true ? <>
                                {/* <Switch value={auxpartnership.email_partnership} color={maincolor} onValueChange={onToggleSwitchemail} /> */}
                                <Ionicons name='mail' size={25} color={textcoler} style={{ marginEnd: 10 }} />
                                <Text style={{ marginBottom: 20, color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{data.email_contact}</Text>
                            </> : null}
                        </View>
                    </View>
                    : null}
                {/* --------------------------------------------- */}
                {universitys.length != 0 ?
                    <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                        <View style={{ flexDirection: row }}>
                            <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 20, color: maincolor, fontSize: 19 }}>University</Text>

                        </View>
                        {/* <TouchableOpacity onPress={() => handelAddUniversity()}>
                        <View style={{ width: 50, height: 47, alignSelf: 'flex-end', flexDirection: 'row' }}>

                            <FontAwesome name='plus-circle' size={25} color={'#00A300'} style={{ marginBottom: 20 }} />

                        </View>
                    </TouchableOpacity> */}


                        <View style={{ marginStart: 40 }}>
                            {universitys.map((university, index) => {
                                return (
                                    <View key={index}>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            {/* <TouchableOpacity onPress={() => handeldeleteuniv(university)}>
                                            <MaterialIcons name='cancel' size={22} color={'#A30000'} style={{ marginEnd: 10 }} />
                                        </TouchableOpacity> */}
                                            <FontAwesome name='graduation-cap' size={25} color={textcoler} style={{ marginBottom: 20, marginEnd: 10 }} />
                                            <Text style={{ marginBottom: 20, color: textcoler, fontStyle: 'normal', fontSize: 15 }}>{university.university}</Text>
                                        </View>
                                    </View>
                                )
                            }
                            )}
                        </View>

                    </View>
                    : null}
                {/* -------------------------------------- */}
                {works.length != 0 ?
                    <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                        <View style={{ flexDirection: row }}>

                            <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 15, color: maincolor, fontSize: 19 }}>Work</Text>

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

                            return (
                                <View style={{ flexDirection: 'row' }}>
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
                                    <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>{work.name_club}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>({work.role})</Text>
                                        <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>{work.date}</Text>
                                    </View>
                                </View>
                            )

                        })}
                    </View>
                    : null}
            </ScrollView>

            {/* <RBSheet
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
            </RBSheet> */}
        </View>
    )
}

export default InformationViewUser

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