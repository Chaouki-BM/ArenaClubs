import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import store from '../components/Store';
function HomePage({ navigation }) {
    const [img, setimg] = store.useState("img");
    console.log('home', img)
    return (
        <View >
            <Text>Home</Text>
        </View>
    )
}
const styles = StyleSheet.create({


});
export default HomePage