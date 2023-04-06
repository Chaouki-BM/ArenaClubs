import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from '../../components/Store';
import Client from '../../api/Client';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ip from '../../api/Ip';
import { Avatar } from 'react-native-elements';

const UserFriend = () => {
    const [mode, setmode] = store.useState("mode");
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [albumS, setalbumS] = store.useState("albumS")
    const [email, setemail] = store.useState("email");
    const [search, setsearch] = useState({ search: '' })
    let show = true
    const [Friends, setFriends] = store.useState("Friends")
    useEffect(() => {
        loadFriend()
    }, [])
    const loadFriend = async () => {
        await Client.post("/get__friend", email).then(function (res) {
            setFriends(res.data);
        }).catch(function (e) {
            console.log("error from load friend ", e);
        })
    }
    const [datafriend, setdatafriend] = useState({
        email_user_1: '',
        email_user_2: '',
    })
    const handeldeleteFriend = async (friend) => {
        datafriend.email_user_1 = friend.email_user_1
        datafriend.email_user_2 = friend.email_user_2
        await Client.post("/delete_friend", datafriend).then(function (res) {
            if (res.data.s = "s") {
                loadFriend()
            }
        }).catch(function (e) {
            console.log("error from load friend ", e);
        })
    }
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

            >
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 30 }}>
                    <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                        <View style={{ flexDirection: row }}>
                            <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 15, color: maincolor, fontSize: 19 }}>Friend</Text>
                        </View>
                        <TextInput
                            style={[{ width: 250, alignSelf: 'center', height: 40, borderRadius: 15, marginBottom: 30 }, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
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
                        />
                        {Friends.map((Friend, index) => {

                            if (Friend.name_user_2.indexOf(search.search) != -1) { show = true }
                            else { show = false }

                            if (show) {
                                return (
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => handeldeleteFriend(Friend)}>
                                            <MaterialIcons name='cancel' size={22} color={'#A30000'} style={{ marginVertical: 15, marginLeft: 20, }} />
                                        </TouchableOpacity>
                                        <Avatar
                                            rounded
                                            size={50}
                                            //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                                            overlayContainerStyle={{ backgroundColor: 'gray' }}
                                            //onPress={() => console.log("Works!")}
                                            containerStyle={{ marginLeft: 20, marginBottom: 20 }}
                                            //source={image}
                                            source={{ uri: `${Ip}${Friend.image_user_2}` }}
                                        />
                                        <Text style={{ marginVertical: 15, marginLeft: 20, color: textcoler, fontStyle: 'italic', fontSize: 17 }}>{Friend.name_user_2}</Text>
                                        <View style={{ flexDirection: 'row' }}>


                                        </View>
                                    </View>)
                            }
                        })}
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default UserFriend

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