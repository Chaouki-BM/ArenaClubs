import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import store from '../components/Store';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements';
const Informations = () => {
    const [mode, setmode] = store.useState("mode");
    const [maincolor, setmaincolor] = store.useState("maincolor");
    const [inputS, setinputS] = store.useState("inputS");
    const [isFocusM, setisFocusM] = useState(false);
    const [textcoler, settextcoler] = store.useState("textcoler");
    const [language, setlanguage] = store.useState("language")
    const [row, setrow] = store.useState("dir")
    const [loginInfo, setloginInfo] = useState({ email: '' })
    const [albumS, setalbumS] = store.useState("albumS")

    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 30 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20 }}>fac</Text>
                    </View>
                    <View style={{ marginHorizontal: 80, flexDirection: 'row' }}>
                        <FontAwesome name='graduation-cap' size={25} color={maincolor} style={{ marginEnd: 10 }} />
                        <Text >na9ra fi zok 3abla </Text>

                    </View>
                    <View style={{ marginHorizontal: 88, flexDirection: 'row' }}>
                        <FontAwesome name='map-marker' size={25} color={maincolor} style={{ marginEnd: 20 }} />
                        <Text style={{ marginBottom: 20 }}>noskon fi zokk 3abla </Text>
                    </View>
                </View>
                {/* ----------------------------------------------- */}
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20 }}>fac</Text>
                    </View>
                    <View style={{ marginHorizontal: 80, flexDirection: 'row' }}>
                        <FontAwesome name='phone' size={25} color={maincolor} style={{ marginEnd: 10 }} />
                        <Text >na9ra fi zok 3abla </Text>

                    </View>
                    <View style={{ marginHorizontal: 76, flexDirection: 'row' }}>
                        <Ionicons name='mail' size={25} color={maincolor} style={{ marginEnd: 10 }} />
                        <Text style={{ marginBottom: 20 }}>noskon fi zokk 3abla </Text>
                    </View>
                </View>
                {/* -------------------------------------- */}
                <View style={{ borderRadius: 7, backgroundColor: albumS, width: 350, alignSelf: "center", marginTop: 20 }}>
                    <View style={{ flexDirection: row }}>
                        <Text style={{ marginTop: 15, marginHorizontal: 20, marginBottom: 10 }}>fac</Text>
                    </View>
                    <TextInput
                        style={[{ width: 250, alignSelf: 'center', height: 40, borderRadius: 15, marginBottom: 20 }, { borderColor: isFocusM ? maincolor : inputS }, { backgroundColor: inputS }, { color: textcoler }]}
                        onFocus={() => {
                            setisFocusM(true)
                        }}
                        onBlur={() => {
                            setisFocusM(false)
                        }}
                        placeholder={language.recherche}
                        onChangeText={val => {
                            setLoginInfo({ ...loginInfo, email: val });
                        }}
                        value={loginInfo.email}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Avatar
                            rounded
                            size={50}
                            //icon={{ name: 'user', color: 'black', type: 'font-awesome' }}
                            overlayContainerStyle={{ backgroundColor: 'gray' }}
                            //onPress={() => console.log("Works!")}
                            containerStyle={{ marginLeft: 20, marginBottom: 20 }}
                        //source={image}
                        />
                        <Text style={{ marginVertical: 15, marginLeft: 20 }}>bla bla bla</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <MaterialIcons name='cancel' size={22} color={maincolor} style={{ marginVertical: 15, marginLeft: 20, }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialIcons name='edit' size={22} color={maincolor} style={{ marginVertical: 15, marginLeft: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
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
export default Informations