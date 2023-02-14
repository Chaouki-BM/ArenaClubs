import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import store from '../components/Store';
const FollowingPage = () => {
    const [mode, setmode] = store.useState("mode");
    return (
        <View style={[styles.container, { backgroundColor: mode }]}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

            >
                <Text>FollowingPage</Text>
            </ScrollView>
        </View>
    )
}

export default FollowingPage

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