import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from '../components/Store';
import Client from '../api/Client';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Ip from '../api/Ip';
import { Avatar } from 'react-native-elements';

const RecherchePage = () => {
    const [mode, setmode] = store.useState("mode");
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocus, setisFocus] = useState();
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [language, setlanguage] = store.useState("language")
    const [search, setsearch] = useState({ nom: '' })
    const [users, setusers] = useState([])
    const initial = {}
    const handelsearsh = async () => {
        if (search.nom != "") {
            await Client.post("/recherche_club", search)
                .then(function (res) {
                    if (res.data.res != 'not found') {
                        setusers(res.data.res)
                        console.log(res.data.res)
                        search.nom = initial
                    }
                }).catch(function (e) {
                    console.log("error from handelshearsh", e)
                })
        }

    }
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 20, marginBottom: 30 }}>
                <TextInput
                    style={[{ borderColor: isFocus ? maincolor : inputS },
                    {
                        width: 300, alignSelf: 'flex-start', height: 40, borderRadius: 15
                        , backgroundColor: inputS, color: textcoler
                    },]}
                    onFocus={() => {
                        setisFocus(true)
                    }}
                    onBlur={() => {
                        setisFocus(false)
                    }}
                    placeholder={language.recherche}
                    onChangeText={val => {
                        setsearch({ ...search, nom: val });
                    }}
                    value={search.nom}
                />
                <TouchableOpacity onPress={() => handelsearsh()}>
                    <Ionicons name='search' size={30} color={maincolor} style={{ marginStart: 15 }} />
                </TouchableOpacity>
            </View>
            {users.map((user, index) => {

                return (
                    <TouchableOpacity>
                        <View key={index} style={{ flexDirection: "row", marginBottom: 10, backgroundColor: inputS, borderRadius: 10, width: 350, marginHorizontal: 20 }}>
                            <Avatar
                                rounded
                                size={50}
                                //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                                overlayContainerStyle={{ backgroundColor: 'gray' }}
                                //onPress={() => console.log("Works!")}
                                containerStyle={{ marginLeft: 20, marginBottom: 10, marginTop: 10 }}
                                //source={image}
                                source={{ uri: `${Ip}${user.image}` }}
                            />
                            <Text style={{ marginStart: 20, marginVertical: 20, fontStyle: "italic", fontSize: 18, color: textcoler }}>{user.nom}</Text>
                        </View>
                    </TouchableOpacity>
                )

            })
            }
        </View>
    )
}

export default RecherchePage

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