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
const Acc = () => {
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
        loadposts()

    }, [])
    const [posts, setposts] = useState([])
    const loadposts = async () => {
        await Client.post("getallimages_following", email).
            then(function (res) {
                setposts(res.data[0]);

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
    });
    console.log("sortedPosts", sortedPosts);
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <Text>Acc</Text>
        </View>
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